# 치즈스테레오 (CheezStereo)

치즈스테레오 밴드의 음악과 영상을 한곳에서 감상할 수 있는 모바일 앱입니다.  
Expo(React Native) + TypeScript + YouTube Data API v3 기반입니다.

---

## 주요 기능

| 구분 | 기능 |
|------|------|
| **음악** | YouTube Music 채널 목록 표시, 앱 내 재생, YouTube Music 앱으로 연결 |
| **영상** | YouTube 채널 목록 표시, 앱 내 재생, YouTube 앱으로 연결 |
| **검색** | 음악/영상 키워드 검색 (디바운스 적용) |
| **정렬** | 최신순, 조회수순, 관련도순, 제목순 |
| **UX** | Pull-to-Refresh, 스켈레톤 로딩, 햅틱 피드백, 빈 상태 안내 |

---

## 기술 스택

- **프레임워크**: Expo SDK 54 (React Native)
- **언어**: TypeScript
- **스타일**: NativeWind (Tailwind for RN)
- **라우팅**: Expo Router (파일 기반)
- **API**: YouTube Data API v3
- **플랫폼**: Android (온라인 전용)

---

## 시작하기

### 요구 사항

- Node.js 18+
- npm
- YouTube Data API v3 키

### 1. 저장소 클론 및 의존성 설치

```bash
git clone <저장소 URL>
cd CheezStereo
npm install
```

### 2. 환경 변수 (YouTube API 키)

API 키는 **환경 변수**로만 넣으며, 코드/저장소에는 포함하지 않습니다.

```bash
cp .env.example .env
# .env 파일을 열어 YOUTUBE_API_KEY= 발급받은키 입력
```

- **로컬 / Expo Go**: `.env` 또는 `.env.local`에 `YOUTUBE_API_KEY=...` 설정  
- **APK·스토어 배포 (EAS Build)**: EAS 서버에서 빌드하므로 **반드시** EAS Secrets에 키를 넣어야 합니다. 아래처럼 추가한 뒤 **재빌드**하세요.
  ```bash
  eas secret:create --name YOUTUBE_API_KEY --value "발급받은_API_키" --scope project
  ```
  또는 [Expo Dashboard](https://expo.dev) → 프로젝트 선택 → Secrets에서 `YOUTUBE_API_KEY` 추가.  
  추가 후 `eas build --platform android --profile production` (또는 사용 중인 프로필)으로 다시 빌드해야 새 APK/AAB에 키가 포함됩니다.

**API 키 발급**: [Google Cloud Console](https://console.cloud.google.com/) → 프로젝트 선택 → API 및 서비스 → 라이브러리에서 **YouTube Data API v3** 활성화 → 사용자 인증 정보 → **API 키** 생성 → `.env`에 입력

### 3. 실행

```bash
# 개발 서버
npm start

# Android 기기/에뮬레이터
npm run android
```

---

## 프로젝트 구조

```
CheezStereo/
├── app/                    # Expo Router
│   ├── (tabs)/             # 탭: 음악, 영상
│   │   ├── _layout.tsx
│   │   ├── music.tsx
│   │   └── videos.tsx
│   ├── player/[id].tsx      # 비디오 재생
│   ├── _layout.tsx
│   └── index.tsx
├── components/
│   ├── Header.tsx          # 공통 헤더 (탭/플레이어)
│   ├── MusicCard.tsx
│   ├── VideoCard.tsx
│   ├── SearchBar.tsx
│   ├── SortFilterButton.tsx
│   ├── SkeletonCard.tsx
│   ├── EmptyState.tsx
│   └── LoadingSpinner.tsx
├── constants/youtube.ts     # 채널 ID, 정렬 옵션
├── services/youtube.ts      # YouTube API 호출
├── types/youtube.ts
├── docs/
│   ├── android-signing.md   # Android 업로드 키·PEM 등록
│   ├── 설치-가이드.md       # 설치 불가 시 점검 체크리스트
│   └── 개인정보처리방침.md
├── app.config.js           # Expo 설정 (환경변수·플러그인)
├── tailwind.config.js
├── global.css
└── package.json
```

---

## 앱 정보

| 항목 | 값 |
|------|-----|
| 앱 이름 | 치즈스테레오 |
| 패키지(Android) | com.cheez.projectcheezstereo |
| 버전 | 1.0.2 (app.config.js 기준) |

---

## 빌드 (EAS)

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build --platform android --profile production
```

상세 빌드/배포 명령은 `dev.md`를 참고하세요.

---

## 문제 해결

**사용자가 앱을 설치할 수 없을 때**  
- **스토어/업로드**: Play Console에 등록된 업로드 키와 빌드 시 사용한 keystore가 일치해야 합니다.  
- **해결 절차**: `docs/설치-가이드.md`와 `docs/android-signing.md`를 순서대로 확인하세요.  
- 요약: 현재 keystore(credentials/android/keystore.jks)의 PEM을 Play Console에 업로드 인증서로 등록한 뒤, 같은 keystore로 서명한 AAB만 업로드합니다.

**API 키 오류**  
- `.env` / `.env.local`이 프로젝트 루트에 있는지 확인  
- `.env`가 없다면 `cp .env.example .env` 후 `YOUTUBE_API_KEY=` 에 발급받은 키 입력  
- `YOUTUBE_API_KEY=` 뒤에 공백 없이 키만 입력  
- 변경 후 `npx expo start -c` 로 캐시 클리어 후 재실행  

**APK 배포 후 "API 키가 설정되지 않았습니다"**  
- APK는 EAS 서버에서 빌드되므로 로컬 `.env`는 사용되지 않습니다.  
- [EAS Secrets](https://docs.expo.dev/build-reference/variables/#using-secrets-in-environment-variables)에 `YOUTUBE_API_KEY`를 추가한 뒤, **반드시 다시 빌드**하세요. (`eas secret:create --name YOUTUBE_API_KEY --value "키값" --scope project` 후 `eas build ...` 재실행)

**"Requests from this Android client application &lt;empty&gt; are blocked"**  
- Google Cloud Console에서 API 키의 **애플리케이션 제한사항** 때문입니다.  
- [Google Cloud Console](https://console.cloud.google.com/) → API 및 서비스 → 사용자 인증 정보 → 해당 API 키 → **애플리케이션 제한사항**  
  - **제한 없음**으로 두면 모든 환경(Expo Go, 개발 빌드, 프로덕션)에서 동작합니다.  
  - **Android 앱**으로 제한했다면, 사용하는 앱을 추가해야 합니다.  
    - **Expo Go**로 실행 중이면: 패키지명 `host.exp.exponent` + Expo Go 앱의 SHA-1 지문 추가.  
    - **개발/프로덕션 빌드**면: 패키지명 `com.cheez.projectcheezstereo` + 해당 빌드 keystore의 SHA-1 추가.

**의존성 충돌**  
```bash
npm install --legacy-peer-deps
```

**캐시 초기화**  
```bash
npx expo start -c
```

---

## 채널 링크

- [YouTube Music - 치즈스테레오](https://music.youtube.com/channel/UC8JozAPzI7Tbiivvv5icIFA)
- [YouTube - @cheezstereo](https://www.youtube.com/@cheezstereo)

---

## 정책·문서

- **설치 불가 해결**: `docs/설치-가이드.md` (사용자 설치 불가 시 점검)
- **Android 서명**: `docs/android-signing.md` (Play Console 업로드 키 등록)
- **개선·기능 추천**: `docs/개선-및-기능-추천.md` (개선 제안 및 추천 기능 목록)
- 개인정보처리방침: `docs/개인정보처리방침.md` (플레이스토어 등 연동용)

---

## 참고 링크

- [Expo 문서](https://docs.expo.dev/)
- [NativeWind](https://www.nativewind.dev/)
- [YouTube Data API v3](https://developers.google.com/youtube/v3)
