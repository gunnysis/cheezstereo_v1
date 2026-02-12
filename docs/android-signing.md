# Android 업로드 키 (Play Console)

## credentials.json 기준

이 문서의 경로·alias는 **credentials.json** 설정과 동일합니다.

| 항목 | 값 |
|------|-----|
| keystorePath | `credentials/android/keystore.jks` |
| keyAlias | `2cb58c52eef072bf7f964bbea25386b3` |
| keystorePassword / keyPassword | credentials.json 참고 |

---

## 키 불일치 오류 (잘못된 키로 서명됨)

Play Console 오류:

- **필요한 키 (등록된 업로드 인증서)**:  
  `DC:C4:5D:E5:16:49:92:24:51:F1:71:06:3B:36:F1:6C:FD:D9:A6:3A`
- **현재 빌드에 사용된 키** (credentials/android/keystore.jks):  
  `BF:87:E8:63:25:66:C3:FF:7C:D3:2D:18:5A:ED:9F:8B:CE:40:8C:20`

2. **업로드 키 재설정 (지금 키로 통일)**  
   - Play Console → 해당 앱 → **앱 무결성** 또는 **앱 서명** → **업로드 키 재설정** 또는 **새 업로드 인증서 등록**.  
   - 현재 사용 중인 키(BF:87...)의 **인증서(PEM)**를 등록합니다.  
   - PEM 내보내기: 아래 "PEM 내보내기" 절의 keytool 명령으로 `upload_cert.pem` 생성 후 Play Console에 업로드.  
   - 재설정 후에는 **지금 keystore.jks**(BF:87...)로 서명한 AAB만 업로드하면 됩니다.

---

## Play Console에 등록된 업로드 키 (이 앱 기준)

- **SHA1**: `DC:C4:5D:E5:16:49:92:24:51:F1:71:06:3B:36:F1:6C:FD:D9:A6:3A`
- AAB는 **이 지문의 인증서**로 서명해야 Play Console 업로드가 통과합니다.

---

## keystore 지문 확인

`credentials.json`에 설정된 keystore의 SHA1을 확인할 때:

```powershell
cd credentials\android
keytool -list -v -keystore keystore.jks -storepass "credentials.json의 keystorePassword"
```

출력에서 **SHA1:** 이 Play Console에 등록된 값(`DC:C4:5D:E5:...`)과 일치하는지 확인하세요.

---

## JKS → PKCS12 변환

비밀번호를 옵션으로 넘기면 프롬프트·NullPointerException을 피할 수 있습니다.

`credentials\android` 에서 (비밀번호는 credentials.json 값 사용):

```powershell
cd credentials\android
keytool -importkeystore -srckeystore keystore.jks -destkeystore intermediate.p12 -deststoretype PKCS12 -srcstorepass "credentials.json의 keystorePassword" -deststorepass "새비밀번호6자이상" -srcalias "2cb58c52eef072bf7f964bbea25386b3" -destalias "2cb58c52eef072bf7f964bbea25386b3" -srckeypass "credentials.json의 keyPassword" -destkeypass "새비밀번호6자이상"
```

- **"Cannot recover key"** 가 나오면 `-srckeypass`에 **keystorePassword**를 그대로 넣어보세요 (키 비밀번호 = 키스토어 비밀번호인 경우).

---

## PEM 내보내기 (Play Console 업로드 인증서 등록)

OpenSSL 없이 **keytool**만 사용합니다. `credentials.json`의 keystore·alias·비밀번호를 사용합니다.

`credentials\android` 에서:

```powershell
keytool -export -rfc -alias "2cb58c52eef072bf7f964bbea25386b3" -file upload_cert.pem -keystore keystore.jks -storepass "credentials.json의 keystorePassword"
```

생성된 `upload_cert.pem`을 Play Console → 앱 서명 → 업로드 인증서로 등록하면 됩니다.

---

## EAS 빌드

- **eas.json** production에 `android.credentialsSource: "local"` 이 있으면, 빌드 시 **credentials.json**의 Android keystore를 사용합니다.
- keystore 경로는 프로젝트 루트 기준 **credentials/android/keystore.jks** 이어야 합니다.
