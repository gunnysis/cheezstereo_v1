import React, { useEffect } from 'react';
import { View, useColorScheme } from 'react-native';
import * as Linking from 'expo-linking';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { getVideoIdFromDeepLink } from '../utils/deepLink';
import { PlayerProvider } from '../contexts/PlayerContext';
import MiniPlayer from '../components/MiniPlayer';
import { ErrorBoundary } from '../components/ErrorBoundary';
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
    <ErrorBoundary>
      <SafeAreaProvider>
        <PlayerProvider>
          <View style={{ flex: 1 }} className={colorScheme === 'dark' ? 'dark' : ''} collapsable={false}>
            <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
            <Stack screenOptions={{ headerShown: false }} />
            <View style={{ position: 'absolute', left: 0, right: 0, bottom: 0, zIndex: 200 }} pointerEvents="box-none" collapsable={false}>
              <MiniPlayer />
            </View>
          </View>
        </PlayerProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}
