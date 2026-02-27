# 개발 참고

## 레이아웃/크래시 방지
- **루트 직계 자식 unmount 금지**: `_layout.tsx` 루트 View의 직계 자식(Stack, MiniPlayer 래퍼 등)은 조건부로 제거하지 말 것. 숨기려면 해당 슬롯에 placeholder View 또는 `opacity: 0` + `pointerEvents="none"` 사용. (SafeAreaProvider null child 크래시 방지)

npx expo run:android
npx expo start --clear
==============================
- execute expo server
npx expo export -c
- clean cache and node_modules
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
- build 
   - develop app
eas build --platform android --profile development
eas build --platform ios --profile development
   - testing app for outdoor
eas build --platform ios --profile preview
   - production app for all stores (Must after changed version)
eas build --platform all --profile production --auto-submit
eas build --platform android --profile production --auto-submit
  - android install app (need before run app on android emulator)
- 설치 불가 시: docs/설치-가이드.md 및 docs/android-signing.md 참고
- git
  - create new branch
git checkout -b [name]