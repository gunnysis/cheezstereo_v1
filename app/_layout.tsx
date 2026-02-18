import React, { useEffect } from 'react';
import { View, useColorScheme } from 'react-native';
import * as Linking from 'expo-linking';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getVideoIdFromDeepLink } from '../utils/deepLink';
import '../global.css';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  useEffect(() => {
    const handleUrl = (url: string) => {
      const videoId = getVideoIdFromDeepLink(url);
      if (videoId) router.replace({ pathname: '/player/[id]', params: { id: videoId } });
    };

    Linking.getInitialURL().then((url) => {
      if (url) handleUrl(url);
    });

    const sub = Linking.addEventListener('url', (e) => handleUrl(e.url));
    return () => sub.remove();
  }, [router]);

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1 }} className={colorScheme === 'dark' ? 'dark' : ''}>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </View>
    </SafeAreaProvider>
  );
}
