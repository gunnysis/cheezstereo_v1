# 플레이스토어 업로드용 Android 서명 keystore 생성
# 요구: JDK 설치 (keytool 포함). 실행 후 비밀번호·이름 등 입력 프롬프트에 응답.

$ErrorActionPreference = "Stop"
$ProjectRoot = Split-Path -Parent $PSScriptRoot
if (-not (Test-Path $ProjectRoot)) { $ProjectRoot = (Get-Location).Path }

$OutDir = Join-Path $ProjectRoot "credentials\android\keystores"
$KeystorePath = Join-Path $OutDir "play-upload.keystore"

if (-not (Test-Path $OutDir)) {
    New-Item -ItemType Directory -Path $OutDir -Force | Out-Null
}

$keytool = "keytool"
if ($env:JAVA_HOME) {
    $keytool = Join-Path $env:JAVA_HOME "bin\keytool.exe"
    if (-not (Test-Path $keytool)) { $keytool = "keytool" }
}

Write-Host "Android keystore will be created at: $KeystorePath"
Write-Host "You will be prompted for: keystore password, key password, and certificate name/org."
Write-Host ""

& $keytool -genkeypair -v `
    -storetype PKCS12 `
    -keystore $KeystorePath `
    -alias upload `
    -keyalg RSA `
    -keysize 2048 `
    -validity 10000

if ($LASTEXITCODE -ne 0) {
    Write-Error "keytool failed. Ensure JDK is installed and keytool is on PATH (or set JAVA_HOME)."
    exit 1
}

Write-Host ""
Write-Host "Done. Keystore: $KeystorePath"
Write-Host "Next: Update credentials.json with keystorePath, keystorePassword, keyAlias (upload), keyPassword."
Write-Host "Check SHA1: keytool -list -v -keystore `"$KeystorePath`""
