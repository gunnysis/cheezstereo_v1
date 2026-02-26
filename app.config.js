/**
 * Expo 설정 (app.json 병합)
 *
 * - YOUTUBE_API_KEY: .env 또는 EAS Secrets 사용 (repo에 키 미포함)
 * - usesCleartextTraffic: NODE_ENV !== 'production' 일 때만 true (프로덕션 빌드에서는 false)
 */
const isDev = process.env.NODE_ENV !== 'production';

const base = {
  name: '치즈스테레오',
  slug: 'CheezStereo',
  version: '1.3.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  description: '치즈스테레오 밴드의 음악과 영상을 한곳에서. YouTube 채널 연동.',
  scheme: 'cheezstereo',

  updates: {
    url: 'https://u.expo.dev/7ca2a398-9647-481d-b531-cc12d1a93e27',
  },
  runtimeVersion: {
    policy: 'fingerprint',
  },

  splash: {
    image: './assets/splash-icon.png',
    resizeMode: 'contain',
    backgroundColor: '#FEF08A',
  },

  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.cheez.projectcheezstereo',
  },

  android: {
    package: 'com.cheez.projectcheezstereo',
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FEF08A',
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: true,
  },

  web: {
    favicon: './assets/favicon.png',
  },

  plugins: [
    'expo-router',
    'expo-updates',
    'expo-dev-client',
    [
      'expo-build-properties',
      {
        android: {
          usesCleartextTraffic: isDev,
        },
      },
    ],
  ],

  extra: {
    router: {},
    eas: {
      projectId: '7ca2a398-9647-481d-b531-cc12d1a93e27',
    },
    YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY || '',
  },
};

module.exports = () => ({
  expo: base,
});
