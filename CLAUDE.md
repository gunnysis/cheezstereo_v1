# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CheezStereo (치즈스테레오) is a React Native mobile app for the disbanded Korean indie band CheezStereo. It lets users browse the full static catalog (albums, tracks, music videos) and play them via YouTube. Built with Expo SDK 54, TypeScript (strict mode), and NativeWind v4.

**Primary platform**: Android (iOS config exists but Android is the focus)

## Common Commands

```bash
# Development
npx expo start --clear          # Start dev server (cache cleared)
npx expo run:android            # Run on Android device/emulator

# Install dependencies (--legacy-peer-deps required)
npm install --legacy-peer-deps

# Clean reinstall
rm -rf node_modules package-lock.json && npm cache clean --force && npm install

# EAS builds
eas build --platform android --profile development
eas build --platform android --profile production --auto-submit
eas build --platform all --profile production --auto-submit
```

No test runner or linter is configured.

## Architecture

### Routing (Expo Router v6, file-based)

- `/` → redirects to `/(tabs)/music`
- `/(tabs)/music` — Music tab: album list
- `/(tabs)/videos` — Videos tab: MV / 라이브 / 인터뷰 category tabs
- `/(tabs)/saved` — Saved tab: bookmarked videos (AsyncStorage)
- `/(tabs)/about` — About tab: band info, members, stats
- `/album/[id]` — Album detail: track list for a given album
- `/player/[id]` — YouTube video player (receives id, title, description, publishedAt as params)
- Deep link: `cheezstereo://player/<videoId>` (handled in `app/_layout.tsx`)

### Data Sources

The app uses a **fully static catalog** — no API quota dependency for browsing.

```
constants/catalog.ts  →  Music tab (albums)  →  /album/[id]  →  /player/[id]
                      →  Videos tab (MV/Live/Interview)       →  /player/[id]
```

- **`constants/catalog.ts`**: All data — 7 albums (24 tracks), 19 videos. YouTube IDs are hardcoded. `youtubeId?: string` on tracks means `undefined` = not available on YouTube (shown grayed-out with lock icon).
- **`types/catalog.ts`**: `Track`, `Album`, `VideoCategory`, `CatalogVideo` type definitions.
- **`services/youtube.ts`**: Retained for `getRelativeTime` utility and Saved tab compatibility. YouTube Data API calls are no longer used by main tabs.
- **`hooks/useChannelVideos.ts`**: Retained but not used by main tabs. May be used in future.

### Global State

- **`contexts/PlayerContext.tsx`**: Holds `currentVideo` (id, title, publishedAt, description). Set whenever a video is opened. Consumed by `MiniPlayer` and player screen.
- **`hooks/useSavedVideos.ts`**: AsyncStorage CRUD for bookmarked videos. Used by Saved tab and save buttons on cards.

### Component Hierarchy

```
app/_layout.tsx
  └─ PlayerProvider
       ├─ Stack (screens)
       │    ├─ (tabs)/_layout.tsx
       │    │    ├─ music.tsx      → AlbumCard list
       │    │    ├─ videos.tsx     → VideoCard list (category tabs)
       │    │    ├─ saved.tsx      → SavedCard list
       │    │    └─ about.tsx      → Band info
       │    ├─ album/[id].tsx      → TrackItem list
       │    └─ player/[id].tsx     → YoutubePlayer
       └─ MiniPlayer (floating, above tab bar)
```

### Key Components

| Component | Role |
|-----------|------|
| `AlbumCard` | Album list item — colored cover placeholder, title, year, type badge, track count |
| `TrackItem` | Track row — number, title, bookmark save button, play/lock icon |
| `VideoCard` | Video list item — thumbnail, title, time, bookmark save button |
| `MusicCard` | Music search result card (retained for potential future use) |
| `VideoThumbnail` | Shared thumbnail with gradient + play icon overlay, onError fallback |
| `MiniPlayer` | Fixed bottom bar — shows current video, navigates to player, slides in/out |
| `Header` | Shared header: `variant="tabs"` (yellow) or `variant="player"` (dark) |

### Environment

- `YOUTUBE_API_KEY` is injected via `app.config.js` → `Constants.expoConfig.extra.YOUTUBE_API_KEY`. Locally from `.env`, in CI from EAS Secrets. Used only by `services/youtube.ts` (retained for Saved tab compatibility).
- Channel ID (`UC8JozAPzI7Tbiivvv5icIFA`) defined in `constants/youtube.ts` — no longer used by main tabs.

### Styling

- NativeWind v4 with Tailwind classes in `className` props
- Custom theme in `tailwind.config.js`: brand colors (`brand.primary` = `#ef4444`), `touch` spacing (44px min tap target), custom shadows
- Brand palette: yellow header (`#FEF08A`), red accents (`#ef4444`), dark player header (`#111827`)
- Album cover colors: hardcoded per album in `constants/catalog.ts` (no artwork images)

### Key Patterns

- **Haptic feedback**: Card presses → medium, sub-actions (save, category switch) → light, video completion → success notification
- **Accessibility**: All interactive elements have Korean `accessibilityRole` / `accessibilityLabel` / `accessibilityHint`
- **State management**: Local React state + PlayerContext (global player) + useSavedVideos (AsyncStorage). No Redux/Zustand.
- **Animations**: Reanimated v4 — cards use `FadeInDown` with staggered delays; MiniPlayer uses `SlideInDown.springify()` / `SlideOutDown`
- **Performance**: `React.memo` on all card components; `useMemo` for filtered video lists in Videos tab
- **MiniPlayer visibility**: Hidden when `pathname.startsWith('/player')` (already on player). Bottom offset adjusts based on tab vs stack screen.

### Build & Signing

- EAS Build with profiles: `development`, `preview`, `production`
- Android production uses local credentials (`credentials/` dir, gitignored)
- Version managed remotely by EAS (`appVersionSource: "remote"`)
- New Architecture enabled (`newArchEnabled: true`)
- Current version: **1.2.0** (versionCode 9)
