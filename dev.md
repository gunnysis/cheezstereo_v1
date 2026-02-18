# 개발 참고

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