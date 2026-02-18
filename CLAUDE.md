# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CheezStereo (치즈스테레오) is a React Native mobile app for the CheezStereo band. It lets users browse and play the band's music and videos from YouTube. Built with Expo SDK 54, TypeScript (strict mode), and NativeWind v4.

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
- `/(tabs)/music` — Music tab
- `/(tabs)/videos` — Videos tab
- `/player/[id]` — YouTube video player (receives id, title, description, publishedAt as params)
- Deep link: `cheezstereo://player/<videoId>` (handled in `app/_layout.tsx`)

### Data Flow

```
YouTube Data API v3 → services/youtube.ts → hooks/useChannelVideos.ts → Screen → ChannelVideoList → Card
```

- **`services/youtube.ts`**: API calls (`getChannelVideos`, `searchChannelVideos`), error normalization to Korean messages, relative time formatting
- **`hooks/useChannelVideos.ts`**: Manages fetch, debounced search (500ms), sort, pull-to-refresh, offline detection via NetInfo
- **`components/ChannelVideoList.tsx`**: Shared generic list UI used by both tabs — handles loading/error/empty states. Screens only provide `renderCard` and `emptyConfig`
- **`MusicCard` / `VideoCard`**: `React.memo` wrapped, animated with staggered `FadeInDown`

### Environment

- `YOUTUBE_API_KEY` is injected via `app.config.js` → `Constants.expoConfig.extra.YOUTUBE_API_KEY`. Locally from `.env`, in CI from EAS Secrets. Never committed.
- Both tabs currently use the same YouTube channel ID (`UC8JozAPzI7Tbiivvv5icIFA`) defined in `constants/youtube.ts`

### Styling

- NativeWind v4 with Tailwind classes in `className` props
- Custom theme in `tailwind.config.js`: brand colors (`brand.primary` = `#ef4444`), `touch` spacing (44px min tap target), custom shadows
- Brand palette: yellow header (`#FEF08A`), red accents (`#ef4444`), dark player header (`#111827`)

### Key Patterns

- **Haptic feedback**: Used on card presses (medium), sub-actions (light), video completion (success)
- **Accessibility**: All interactive elements have Korean `accessibilityRole`/`accessibilityLabel`/`accessibilityHint`
- **State management**: Local React state only (no Redux/Zustand). `useSavedVideos` hook exists with AsyncStorage CRUD but no UI tab yet
- **Animations**: Reanimated v4 — cards use `FadeInDown` with staggered delays, search/sort buttons use shared values for scale
- **Error handling**: All API errors pass through `normalizeYouTubeError` → Korean user-facing messages

### Build & Signing

- EAS Build with profiles: `development`, `preview`, `production`
- Android production uses local credentials (`credentials/` dir, gitignored)
- Version managed remotely by EAS (`appVersionSource: "remote"`)
- New Architecture enabled (`newArchEnabled: true`)
