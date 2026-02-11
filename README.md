# CheezStereo - 치즈스테레오 밴드 앱

치즈스테레오 밴드의 음악과 영상을 감상할 수 있는 React Native 기반 모바일 앱입니다.

## 주요 기능

### 핵심 기능
- 🎵 **음악 목록**: YouTube Music 채널의 음악 목록 표시 및 재생
- 🎬 **영상 목록**: YouTube 채널의 영상 목록 표시 및 재생
- 🔍 **실시간 검색**: 음악과 영상을 키워드로 검색 (500ms 디바운스)
- 🔄 **정렬 옵션**: 최신순, 조회수순, 관련도순, 제목순
- 📱 **앱 내 재생**: YouTube 비디오를 앱 내에서 직접 재생
- 🔗 **외부 앱 연결**: YouTube/YouTube Music 앱으로 직접 연결
- ↻ **Pull-to-Refresh**: 목록을 당겨서 새로고침

### UI/UX
- ✨ **부드러운 애니메이션**: 카드 진입, 화면 전환 애니메이션
- 💀 **스켈레톤 로딩**: 로딩 중 콘텐츠 구조 미리 표시
- 📳 **햅틱 피드백**: 터치 인터랙션 시 진동 피드백
- 🎨 **모던 디자인**: 그라디언트, 그림자, 라운드 코너
- 📝 **개선된 타이포그래피**: 명확한 텍스트 계층 구조
- 🎯 **직관적인 빈 상태**: 상황별 안내 메시지 및 액션

## 기술 스택

- **Framework**: Expo (React Native)
- **Language**: TypeScript
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Navigation**: Expo Router
- **API**: YouTube Data API v3
- **Platform**: Android (온라인 전용)

## 시작하기

### 필수 요구사항

- Node.js 16 이상
- npm 또는 yarn
- Expo Go 앱 (개발 테스트용)
- YouTube Data API v3 키

### 설치

1. 저장소 클론

```bash
cd CheezStereo
```

2. 의존성 설치

```bash
npm install --legacy-peer-deps
```

3. YouTube API 키 설정

API 키는 **환경 변수**로만 주입되며, 저장소에 키를 넣지 않습니다.

- **로컬 개발**: `.env.example`을 복사해 `.env` 또는 `.env.local`로 저장한 뒤 `YOUTUBE_API_KEY=실제키` 입력
- **EAS 빌드**: [EAS Secrets](https://docs.expo.dev/build-reference/variables/#using-secrets-in-environment-variables)에 `YOUTUBE_API_KEY` 추가

```bash
cp .env.example .env
# .env 파일을 열어 YOUTUBE_API_KEY= 발급받은키 입력
```

**YouTube API 키 발급 방법:**
1. [Google Cloud Console](https://console.cloud.google.com/)에 접속
2. 새 프로젝트 생성 또는 기존 프로젝트 선택
3. "API 및 서비스" > "라이브러리"에서 "YouTube Data API v3" 검색 후 활성화
4. "사용자 인증 정보" > "사용자 인증 정보 만들기" > "API 키"로 생성
5. 생성된 키를 `.env` / `.env.local`의 `YOUTUBE_API_KEY=` 에 입력

### 개발 서버 실행

```bash
npm start
```

또는 안드로이드 직접 실행:

```bash
npm run android
```

## 프로젝트 구조

```
CheezStereo/
├── app/                      # Expo Router 라우팅
│   ├── (tabs)/              # 탭 네비게이션
│   │   ├── _layout.tsx      # 탭 레이아웃
│   │   ├── music.tsx        # 음악 목록 화면 (검색/정렬 포함)
│   │   └── videos.tsx       # 영상 목록 화면 (검색/정렬 포함)
│   ├── player/
│   │   └── [id].tsx         # 비디오 플레이어 화면
│   ├── _layout.tsx          # 루트 레이아웃
│   └── index.tsx            # 앱 진입점
├── components/              # 재사용 가능한 컴포넌트
│   ├── LoadingSpinner.tsx   # 로딩 인디케이터 (애니메이션)
│   ├── SkeletonCard.tsx     # 스켈레톤 로딩 카드
│   ├── EmptyState.tsx       # 빈 상태 UI
│   ├── MusicCard.tsx        # 음악 카드 (애니메이션, 그라디언트)
│   ├── VideoCard.tsx        # 영상 카드 (애니메이션, 그라디언트)
│   ├── SearchBar.tsx        # 검색바 (애니메이션, 햅틱)
│   └── SortFilterButton.tsx # 정렬 버튼 (애니메이션, 햅틱)
├── constants/               # 상수 정의
│   └── youtube.ts           # YouTube 채널 ID, 정렬 옵션 등
├── services/                # API 서비스
│   └── youtube.ts           # YouTube Data API 통합
├── types/                   # TypeScript 타입 정의
│   └── youtube.ts           # YouTube 데이터 타입
├── app.json                 # Expo 설정
├── tailwind.config.js       # Tailwind CSS 설정
├── global.css               # 전역 스타일
└── package.json             # 프로젝트 의존성
```

## 채널 정보

- **YouTube Music**: [치즈스테레오 뮤직](https://music.youtube.com/channel/UC8JozAPzI7Tbiivvv5icIFA)
- **YouTube**: [@cheezstereo](https://www.youtube.com/@cheezstereo)

## 빌드

### 안드로이드 APK 빌드

```bash
eas build --platform android
```

EAS Build 사용 전에 [Expo Application Services](https://expo.dev/eas)에 계정을 만들고 로그인해야 합니다.

```bash
npm install -g eas-cli
eas login
eas build:configure
```

## 패키지 정보

- **앱 이름**: CheezStereo
- **패키지 이름**: com.book.helloworld
- **버전**: 1.0.0

## 주요 라이브러리

- `expo` - Expo SDK
- `expo-router` - 파일 기반 네비게이션
- `nativewind` - Tailwind CSS for React Native
- `axios` - HTTP 클라이언트
- `expo-linking` - 외부 앱 링크
- `react-native-reanimated` - 애니메이션

## 문제 해결

### API 키 오류

API 키가 설정되지 않았다는 오류가 발생하면:
1. `.env.local` 파일이 프로젝트 루트에 있는지 확인
2. API 키가 올바르게 입력되었는지 확인
3. 앱을 재시작 (개발 서버 종료 후 다시 시작)

### 패키지 설치 오류

의존성 충돌 오류가 발생하면 `--legacy-peer-deps` 플래그를 사용하세요:

```bash
npm install --legacy-peer-deps
```

### 캐시 문제

Metro bundler 캐시를 지우려면:

```bash
npm start -- -c
# 또는
npx expo start -c
```

## 라이선스

이 프로젝트는 치즈스테레오 밴드의 콘텐츠를 사용합니다.

## 참고 자료

- [Expo 문서](https://docs.expo.dev/)
- [React Native 문서](https://reactnative.dev/)
- [NativeWind 문서](https://www.nativewind.dev/)
- [YouTube Data API 문서](https://developers.google.com/youtube/v3)
