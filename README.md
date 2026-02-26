# 치즈스테레오 (CheezStereo)

한국 인디 밴드 **치즈스테레오**의 음악과 영상을 한곳에서 감상할 수 있는 Android 앱입니다.

> 치즈스테레오는 2008년 서울에서 결성, 2019년까지 활동한 인디 팝·록 밴드입니다.
> 7장의 음반, 24곡, 19개의 영상(뮤직비디오·라이브·인터뷰)을 남겼습니다.

---

## 주요 기능

| 탭 | 설명 |
|----|------|
| **음악** | 앨범 목록 → 앨범 상세(트랙 리스트) → YouTube 재생 |
| **영상** | 뮤직비디오 / 라이브 / 인터뷰 카테고리 탭 |
| **저장** | 북마크한 곡·영상 목록 (로컬 저장, 오프라인 유지) |
| **소개** | 밴드 정보, 멤버, 활동 이력, YouTube 채널 링크 |

- **미니 플레이어** — 다른 탭으로 이동해도 하단에 현재 재생 곡 유지
- **저장 버튼** — 앨범 트랙·영상 카드에서 북마크로 바로 저장
- **공유하기** — 플레이어 화면에서 YouTube 링크 공유
- **딥링크** — `cheezstereo://player/<videoId>` 형식으로 직접 재생
- **다크 모드** — 시스템 설정 자동 반영
- **햅틱 피드백** — 주요 액션마다 진동 피드백

---

## 디스코그래피

### 앨범

| 년도 | 제목 | 구분 | 트랙 수 |
|------|------|------|---------|
| 2009 | Don't Work Be Happy! | 정규 1집 | 11곡 |
| 2011 | 화성로맨스 | 싱글 | 1곡 |
| 2012 | TWO NIGHTs | 싱글 | 2곡 |
| 2013 | Lonely Man | EP | 2곡 |
| 2015 | 왜 그래 | EP | 4곡 |
| 2017 | 여행의 시간 / Brink | EP | 2곡 |
| 2019 | Cosmic Comics Alarm | 싱글 | 1곡 |

### 영상 (총 19개)

- **뮤직비디오 (11)** — Hello, 화성로맨스, 패션피플, 오늘밤, 불타는 내마음, Dance Now, 왜 그래, 유유히 흐르네, 여행의 시간, Dance Now (Official Audio), Cosmic Comics Alarm
- **라이브 (6)** — 오예 LIVE, 한밤의 에스프레소, 청춘파도, 화성로맨스, Eve, 유유히 흐르네
- **인터뷰 (2)** — Mirrorball Interview 2013, 오여홍 늬우-스

---

## 기술 스택

| 항목 | 기술 |
|------|------|
| 프레임워크 | React Native 0.81.5 + Expo SDK 54 |
| 언어 | TypeScript (strict mode) |
| 라우팅 | Expo Router v6 (파일 기반) |
| 스타일 | NativeWind v4 (Tailwind CSS) |
| 애니메이션 | React Native Reanimated v4 |
| 로컬 저장소 | AsyncStorage |
| YouTube 재생 | react-native-youtube-iframe |
| 빌드/배포 | EAS Build + EAS Submit |
| 주요 플랫폼 | Android |

---

## 시작하기

### 사전 요구 사항

- Node.js 18+
- Android Studio (에뮬레이터 또는 실기기)

### 설치

```bash
git clone <저장소 URL>
cd CheezStereo
npm install --legacy-peer-deps
```

> `--legacy-peer-deps` 필수 — React 19와 일부 패키지의 peer dependency 충돌 우회

### 환경 변수 (선택)

메인 Music·Videos 탭은 **정적 카탈로그**를 사용하므로 API 키 없이도 정상 동작합니다.
YouTube API를 직접 사용하는 기능(예: 커스텀 검색)이 필요할 경우만 아래를 설정합니다.

```bash
# 프로젝트 루트에 .env 파일 생성
YOUTUBE_API_KEY=발급받은_키
```

EAS 빌드 환경에서는 `.env` 대신 EAS Secrets를 사용합니다:

```bash
eas secret:create --name YOUTUBE_API_KEY --value "발급받은_키" --scope project
```

### 실행

```bash
# 개발 서버 (캐시 초기화)
npx expo start --clear

# Android 기기/에뮬레이터
npx expo run:android
```

---

## 빌드 및 배포

```bash
# 개발 빌드
eas build --platform android --profile development

# 프로덕션 빌드 + Google Play 자동 제출
eas build --platform android --profile production --auto-submit
```

프로덕션 빌드는 `credentials/` 디렉토리의 로컬 keystore를 사용합니다 (`.gitignore`에 포함, 저장소에 커밋되지 않음).
상세 내용은 `docs/설치-가이드.md`를 참고하세요.

---

## 프로젝트 구조

```
CheezStereo/
├── app/
│   ├── (tabs)/
│   │   ├── music.tsx         # 음악 탭 (앨범 목록)
│   │   ├── videos.tsx        # 영상 탭 (카테고리 탭)
│   │   ├── saved.tsx         # 저장 탭 (북마크 목록)
│   │   └── about.tsx         # 소개 탭 (밴드 정보)
│   ├── album/[id].tsx        # 앨범 상세 (트랙 리스트)
│   ├── player/[id].tsx       # YouTube 플레이어
│   └── _layout.tsx           # 루트 레이아웃 (PlayerProvider)
├── components/
│   ├── AlbumCard.tsx         # 앨범 목록 카드
│   ├── TrackItem.tsx         # 트랙 행 (번호·제목·저장)
│   ├── VideoCard.tsx         # 영상 카드
│   ├── MusicCard.tsx         # 음악 카드
│   ├── MiniPlayer.tsx        # 하단 고정 미니 플레이어
│   ├── VideoThumbnail.tsx    # 공유 썸네일 (그라디언트+오류처리)
│   └── Header.tsx            # 공유 헤더
├── contexts/
│   └── PlayerContext.tsx     # 전역 현재 재생 곡 상태
├── constants/
│   ├── catalog.ts            # 정적 디스코그래피 데이터
│   ├── about.ts              # 밴드 소개 데이터
│   └── youtube.ts            # YouTube URL 상수
├── types/
│   ├── catalog.ts            # 카탈로그 타입 정의
│   └── youtube.ts            # YouTube API 타입 정의
├── hooks/
│   ├── useSavedVideos.ts     # 북마크 CRUD (AsyncStorage)
│   └── useChannelVideos.ts   # YouTube API 훅 (보존)
├── services/
│   └── youtube.ts            # YouTube API + 유틸 함수
├── docs/                     # 문서
│   ├── changelog.md
│   ├── 개선-및-기능-추천.md
│   ├── 설치-가이드.md
│   └── 개인정보처리방침.md
├── app.config.js             # Expo 설정
├── tailwind.config.js
└── CLAUDE.md                 # AI 코드 에디터용 아키텍처 가이드
```

---

## 문서

| 파일 | 내용 |
|------|------|
| `docs/changelog.md` | 버전별 변경 이력 |
| `docs/개선-및-기능-추천.md` | 구현 완료 항목 및 향후 개선 제안 |
| `docs/설치-가이드.md` | 설치·빌드·배포 오류 해결 가이드 |
| `docs/개인정보처리방침.md` | 개인정보 처리방침 |
| `CLAUDE.md` | AI 코드 에디터용 아키텍처 가이드 |

---

## 앱 정보

| 항목 | 값 |
|------|-----|
| 앱 이름 | 치즈스테레오 |
| 패키지 (Android) | com.cheez.projectcheezstereo |
| 버전 | 1.2.0 (versionCode 9) |
| 최근 배포 | 2026-02-26 (Google Play) |

---

## 링크

- [YouTube 공식 채널](https://www.youtube.com/@cheezstereo)
- [YouTube Music 채널](https://music.youtube.com/channel/UC8JozAPzI7Tbiivvv5icIFA)
