import React, { memo } from 'react';
import { View, Text, TouchableOpacity, useColorScheme } from 'react-native';
import Animated, { SlideInDown, SlideOutDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { usePlayer } from '../contexts/PlayerContext';

const TAB_BAR_HEIGHT = 64;

function MiniPlayer() {
  const { currentVideo, clearCurrentVideo } = usePlayer();
  const pathname = usePathname();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const isDark = useColorScheme() === 'dark';

  const visible = !!(currentVideo && !pathname.startsWith('/player'));
  const isOnTabScreen = ['/', '/music', '/videos', '/saved', '/about'].some(
    (p) => pathname === p || pathname.endsWith(p)
  );

  const bottomOffset = isOnTabScreen
    ? TAB_BAR_HEIGHT + insets.bottom
    : insets.bottom + 16;

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push({
      pathname: '/player/[id]',
      params: {
        id: currentVideo.id,
        title: currentVideo.title,
        description: currentVideo.description ?? '',
        publishedAt: currentVideo.publishedAt ?? '',
      },
    });
  };

  const handleClose = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    clearCurrentVideo();
  };

  if (!visible) {
    return <View style={{ height: 0, opacity: 0 }} pointerEvents="none" collapsable={false} />;
  }

  return (
    <Animated.View
      entering={SlideInDown.springify().damping(18)}
      exiting={SlideOutDown.duration(200)}
      style={{
        position: 'absolute',
        bottom: bottomOffset,
        left: 0,
        right: 0,
        zIndex: 200,
        paddingHorizontal: 12,
      }}
      collapsable={false}
    >
      <View
        style={{
          backgroundColor: isDark ? '#1f2937' : '#ffffff',
          borderRadius: 16,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 14,
          paddingVertical: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.15,
          shadowRadius: 8,
          elevation: 8,
          borderWidth: 1,
          borderColor: isDark ? '#374151' : '#e5e7eb',
        }}
      >
        <View className="bg-red-500 rounded-full p-2 mr-3">
          <Ionicons name="musical-note" size={16} color="#ffffff" />
        </View>

        <TouchableOpacity
          onPress={handlePress}
          activeOpacity={0.7}
          style={{ flex: 1 }}
          accessibilityRole="button"
          accessibilityLabel={`${currentVideo.title} 재생`}
        >
          <Text
            style={{ color: isDark ? '#f3f4f6' : '#111827', fontWeight: '600', fontSize: 14 }}
            numberOfLines={1}
          >
            {currentVideo.title}
          </Text>
          <Text style={{ color: isDark ? '#9ca3af' : '#6b7280', fontSize: 12, marginTop: 1 }}>
            탭하여 재생
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handlePress}
          activeOpacity={0.7}
          className="p-2 ml-1"
          accessibilityRole="button"
          accessibilityLabel="재생"
        >
          <Ionicons name="play-circle" size={28} color="#ef4444" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleClose}
          activeOpacity={0.7}
          className="p-2"
          accessibilityRole="button"
          accessibilityLabel="미니 플레이어 닫기"
        >
          <Ionicons name="close" size={22} color={isDark ? '#9ca3af' : '#6b7280'} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

export default memo(MiniPlayer);
