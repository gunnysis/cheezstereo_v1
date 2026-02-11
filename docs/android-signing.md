# Android App Bundle 서명 (Play Console 키 불일치 해결)

## 오류 메시지

- **필요한 키 지문**: `DC:C4:5D:E5:16:49:92:24:51:F1:71:06:3B:36:F1:6C:FD:D9:A6:3A`
- **현재 빌드에 사용된 키 지문**: `BF:87:E8:63:25:66:C3:FF:7C:D3:2D:18:5A:ED:9F:8B:CE:40:8C:20`

Play Console에 이미 등록된 앱은 **처음 업로드할 때 사용한 키**로만 서명해야 합니다.  
EAS가 새로 만든 키(BF:87...)로 서명했기 때문에 오류가 난 상태입니다.

---

## 해결: 기존 keystore로 서명하기

### 1. 원래 사용한 keystore 파일 확보

- 처음 Play Console에 업로드할 때 사용한 **.jks** 또는 **.keystore** 파일이 필요합니다.
- 다른 PC, 백업, 또는 처음 빌드한 환경에서 해당 파일을 찾으세요.
- 없다면 Play Console에서 키 초기화를 요청해야 하며, 기존 앱은 재설치/재다운로드가 필요할 수 있습니다.

### 2. keystore 지문 확인

아래 명령으로 SHA1이 `DC:C4:5D:E5:...` 인지 확인하세요.

```bash
keytool -list -v -keystore "경로/파일.jks"
```

출력에서 **SHA1:** 값이 `DC:C4:5D:E5:16:49:92:24:51:F1:71:06:3B:36:F1:6C:FD:D9:A6:3A` 이어야 합니다.

### 3. 프로젝트에 credentials 설정

1. keystore 파일을 프로젝트 안 안전한 위치에 복사합니다 (예: `.key/upload-keystore.jks`).  
   **주의**: `.key` 폴더와 keystore는 Git에 올리지 마세요 (이미 .gitignore에 `*.jks` 등이 있음).

2. 프로젝트 **루트**에 `credentials.json` 파일을 만들고 아래 형식으로 채웁니다.

```json
{
  "android": {
    "keystore": {
      "keystorePath": ".key/upload-keystore.jks",
      "keystorePassword": "키스토어 비밀번호",
      "keyAlias": "키 별칭",
      "keyPassword": "키 비밀번호"
    }
  }
}
```

- `keystorePath`: keystore 파일의 경로 (프로젝트 루트 기준 상대 경로 또는 절대 경로)
- `keystorePassword` / `keyPassword` / `keyAlias`: 해당 keystore 생성 시 사용한 값

3. `credentials.json`은 **절대 Git에 커밋하지 마세요** (이미 .gitignore에 추가됨).

### 4. EAS 빌드 설정 확인

`eas.json`의 production 프로필에 아래가 들어가 있어야 합니다 (이미 적용됨).

```json
"production": {
  "autoIncrement": true,
  "android": {
    "credentialsSource": "local"
  }
}
```

이렇게 하면 EAS가 **로컬 `credentials.json` + keystore**를 사용해 서명합니다.

### 5. 다시 빌드 후 업로드

```bash
eas build --platform android --profile production
```

빌드가 끝나면 생성된 AAB를 Play Console에 업로드합니다.  
이제 서명 지문이 `DC:C4:5D:E5:...` 로 나와야 합니다.

---

## 원격(EAS)에 credentials 올리기 (선택)

로컬에서 한 번 설정한 뒤, EAS 서버에 올려두고 싶다면:

```bash
eas credentials
```

→ Android 선택 → 해당 빌드 프로필(production) → **Update credentials on Expo servers with values from credentials.json** 선택하면, 이후에는 로컬 `credentials.json` 없이도 같은 키로 빌드됩니다.

---

## keystore를 찾을 수 없는 경우

- **처음 업로드한 사람/팀**에게 keystore와 비밀번호, alias를 요청하세요.
- 정말 없으면 [Google Play 앱 서명 도움말](https://support.google.com/googleplay/android-developer/answer/9842756)에서 “키 손실” 절차를 참고하고, 필요 시 지원팀에 문의해야 합니다.
