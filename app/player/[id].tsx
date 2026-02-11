import React, { useState } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import YoutubePlayer from 'react-native-youtube-iframe';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { getRelativeTime } from '../../services/youtube';
import { Header } from '../../components/Header';

const { width } = Dimensions.get('window');

export default function PlayerScreen() {
  const { id, title, description, publishedAt } = useLocalSearchParams<{
    id: string;
    title: string;
    description?: string;
    publishedAt?: string;
  }>();
  const router = useRouter();
  const [playing, setPlaying] = useState(true);

  const onStateChange = (state: string) => {
    if (state === 'ended') {
      setPlaying(false);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  };

  const handleClose = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  return (
    <View className="flex-1 bg-gray-900">
      <SafeAreaView edges={['top', 'bottom']} className="flex-1 bg-gray-900">
        <Header
          title={
            typeof title === 'string' ? title : Array.isArray(title) ? title[0] : '비디오 재생'
          }
          variant="player"
          safeAreaTop={false}
          leftButton={{
            icon: 'close',
            onPress: handleClose,
            accessibilityLabel: '닫기',
          }}
        />

        {/* 플레이어 */}
      <View className="bg-black">
        <YoutubePlayer
          height={(width * 9) / 16}
          play={playing}
          videoId={id}
          onChangeState={onStateChange}
        />
      </View>

      {/* 비디오 정보 */}
      <ScrollView className="flex-1 bg-white">
        <Animated.View entering={SlideInDown.delay(200).springify()} className="p-6">
          {/* 제목 */}
          <Text className="text-gray-900 text-2xl font-bold mb-3 leading-tight">
            {title}
          </Text>
          
          {/* 게시일 */}
          {publishedAt && (
            <View className="flex-row items-center mb-6">
              <View className="bg-red-50 p-2 rounded-lg mr-2">
                <Ionicons name="calendar-outline" size={16} color="#ef4444" />
              </View>
              <Text className="text-gray-600 text-base">
                {getRelativeTime(publishedAt)}
              </Text>
            </View>
          )}

          {/* 설명 */}
          {description && (
            <View className="mt-2 bg-gray-50 p-4 rounded-xl">
              <Text className="text-gray-700 text-base leading-relaxed">
                {description}
              </Text>
            </View>
          )}
        </Animated.View>
      </ScrollView>
      </SafeAreaView>
    </View>
  );
}
