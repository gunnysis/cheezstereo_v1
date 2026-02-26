# 변경 이력 (Changelog)

---

## v1.2.0 (2026-02-26) — 정적 카탈로그 + 미니 플레이어

### 새 기능
- **정적 카탈로그**: YouTube Search API 의존성 완전 제거. 앨범 7개·트랙 24개·영상 19개를 `constants/catalog.ts`에 하드코딩.
- **Music 탭 개편**: 앨범 리스트 → 앨범 상세(트랙 리스트) → 플레이어 내비게이션 흐름.
- **Videos 탭 개편**: 뮤직비디오 / 라이브 / 인터뷰 카테고리 탭 필터.
- **MiniPlayer**: 플레이어를 벗어나도 하단에 현재 재생 곡을 표시. 탭 이동 중에도 유지.
- **About 탭**: 밴드 소개 화면 — 멤버, 활동 기간, 장르, 레이블, 통계(앨범·트랙·영상 수), 공식 YouTube 링크.
- **저장 버튼**: VideoCard·MusicCard·TrackItem 모두에 북마크(나중에 보기) 저장 기능 추가.
- **PlayerContext**: 전역 현재 재생 곡 상태 관리 (`contexts/PlayerContext.tsx`).

### 개선
- **VideoThumbnail 컴포넌트** 신규 추출: MusicCard·VideoCard 썸네일 코드 중복 제거. 로드 실패 시 fallback 처리 포함.
- **성능**: Videos 탭 필터에 `useMemo` 적용. 모든 카드 컴포넌트 `React.memo` 적용.
- **접근성**: 모든 신규 인터랙티브 요소에 한국어 `accessibilityLabel` / `accessibilityHint` 추가.
- **TrackItem**: `albumYear` prop 추가 — 저장 시 발매 연도 기반 `publishedAt` 자동 설정.

### 파일 변경 요약
| 구분 | 파일 |
|------|------|
| 신규 | `types/catalog.ts`, `constants/catalog.ts`, `constants/about.ts` |
| 신규 | `contexts/PlayerContext.tsx` |
| 신규 | `components/AlbumCard.tsx`, `components/TrackItem.tsx`, `components/VideoThumbnail.tsx`, `components/MiniPlayer.tsx` |
| 신규 | `app/album/[id].tsx`, `app/(tabs)/about.tsx` |
| 수정 | `app/_layout.tsx` (PlayerProvider + MiniPlayer 추가) |
| 수정 | `app/(tabs)/_layout.tsx` (About 탭 추가) |
| 수정 | `app/(tabs)/music.tsx` (정적 카탈로그 기반으로 재작성) |
| 수정 | `app/(tabs)/videos.tsx` (정적 카탈로그 + 카테고리 탭으로 재작성) |
| 수정 | `app/(tabs)/saved.tsx` (PlayerContext 연동) |
| 수정 | `app/player/[id].tsx` (PlayerContext setCurrentVideo 추가) |
| 수정 | `components/VideoCard.tsx` (VideoThumbnail 사용 + 저장 버튼) |
| 수정 | `components/MusicCard.tsx` (VideoThumbnail 사용) |

---

## v1.1.1 (이전)

- EAS 빌드 설정 개선, keystore 관련 문서화
- `.gitignore`에 `credentials` 추가

## v1.1.0 (이전)

- 공유하기 기능 (플레이어 화면)
- 채널 바로가기 버튼 (탭 헤더)
- 딥링크: `cheezstereo://player/<videoId>`
- Saved 탭 (나중에 보기) 초기 구현
- 다크 모드: `userInterfaceStyle: 'automatic'`
- 플레이어 `id` 배열 처리 정규화

## v1.0.2 (이전)

- 버전 관리 원격 EAS로 전환
- 앱 아이콘·스플래시 추가

## v1.0.0 (초기)

- Music / Videos 탭 (YouTube API 기반)
- YouTube 플레이어 화면
- Expo Router 기반 파일 라우팅
