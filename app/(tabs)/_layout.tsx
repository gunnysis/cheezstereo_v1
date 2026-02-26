import { Alert, useColorScheme } from 'react-native';
import * as Linking from 'expo-linking';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Header } from '../../components/Header';
import { YOUTUBE_URLS } from '../../constants/youtube';

function useChannelMenu() {
  return () => {
    Alert.alert(
      '채널 열기',
      '어디로 이동할까요?',
      [
        { text: 'YouTube 채널', onPress: () => Linking.openURL(YOUTUBE_URLS.videoChannel) },
        { text: 'YouTube Music 채널', onPress: () => Linking.openURL(YOUTUBE_URLS.musicChannel) },
        { text: '취소', style: 'cancel' },
      ]
    );
  };
}

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const isDark = useColorScheme() === 'dark';
  const onChannelPress = useChannelMenu();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ef4444',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: {
          backgroundColor: isDark ? '#1f2937' : '#ffffff',
          borderTopWidth: 1,
          borderTopColor: isDark ? '#374151' : '#e5e7eb',
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom + 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        header: ({ options }) => {
          const title =
            typeof options.headerTitle === 'string'
              ? options.headerTitle
              : (options.title ?? '');
          const isAbout = title === '정보';
          return (
            <Header
              title={title}
              variant="tabs"
              rightButton={
                isAbout
                  ? undefined
                  : {
                      icon: 'link',
                      onPress: onChannelPress,
                      accessibilityLabel: '채널 링크',
                    }
              }
            />
          );
        },
        headerShown: true,
      }}
    >
      <Tabs.Screen
        name="music"
        options={{
          title: '음악',
          headerTitle: '치즈스테레오 음악',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="musical-notes" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="videos"
        options={{
          title: '영상',
          headerTitle: '치즈스테레오 영상',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="play-circle" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          title: '저장',
          headerTitle: '나중에 보기',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bookmark" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: '정보',
          headerTitle: '정보',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="information-circle" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
