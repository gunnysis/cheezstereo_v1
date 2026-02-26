import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { YouTubeVideo } from '../types/youtube';
import { getRelativeTime } from '../services/youtube';
import VideoThumbnail from './VideoThumbnail';

interface MusicCardProps {
  video: YouTubeVideo;
  onPress: () => void;
  onLongPress?: () => void;
  index: number;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

function MusicCard({ video, onPress, onLongPress, index }: MusicCardProps) {
  const relativeTime = getRelativeTime(video.publishedAt);

  return (
    <AnimatedTouchable
      entering={FadeInDown.delay(index * 100).duration(400)}
      onPress={onPress}
      onLongPress={onLongPress}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg mb-4 mx-4 overflow-hidden"
      activeOpacity={0.9}
      accessibilityRole="button"
      accessibilityLabel={`${video.title}, ${relativeTime}`}
      accessibilityHint="두 번 탭하면 재생합니다. 길게 누르면 더 보기"
    >
      <VideoThumbnail uri={video.thumbnail} />

      <View className="p-4">
        <Text
          className="text-gray-900 dark:text-gray-100 text-lg font-bold mb-2 leading-tight"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {video.title}
        </Text>
        <View className="flex-row items-center">
          <Ionicons name="time-outline" size={14} color="#9ca3af" />
          <Text className="text-gray-500 dark:text-gray-400 text-base ml-1">{relativeTime}</Text>
        </View>
      </View>
    </AnimatedTouchable>
  );
}

export default memo(MusicCard);
