import { Redirect } from 'expo-router';

export default function Index() {
  // 앱 시작 시 음악 탭으로 리디렉트
  return <Redirect href="/(tabs)/music" />;
}
