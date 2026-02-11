import React, { memo } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { YouTubeVideo } from '../types/youtube';
import { getRelativeTime } from '../services/youtube';

interface MusicCardProps {
  video: YouTubeVideo;
  onPress: () => void;
  index: number;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

function MusicCard({ video, onPress, index }: MusicCardProps) {
  const relativeTime = getRelativeTime(video.publishedAt);

  return (
    <AnimatedTouchable
      entering={FadeInDown.delay(index * 100).duration(400)}
      onPress={onPress}
      className="bg-white rounded-2xl shadow-lg mb-4 mx-4 overflow-hidden"
      activeOpacity={0.9}
      accessibilityRole="button"
      accessibilityLabel={`${video.title}, ${relativeTime}`}
      accessibilityHint="두 번 탭하면 재생 옵션을 엽니다"
    >
      {/* 썸네일 */}
      <View className="w-full aspect-video bg-gray-200 relative">
        <Image
          source={{ uri: video.thumbnail }}
          className="w-full h-full"
          resizeMode="cover"
        />
        
        {/* 그라디언트 오버레이 */}
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          className="absolute bottom-0 left-0 right-0 h-20"
        />
        
        {/* 재생 아이콘 */}
        <View className="absolute inset-0 items-center justify-center">
          <View className="bg-red-500/90 p-4 rounded-full">
            <Ionicons name="play" size={28} color="#ffffff" />
          </View>
        </View>
      </View>

      {/* 정보 영역 */}
      <View className="p-4">
        {/* 제목 (2줄 말줄임) */}
        <Text
          className="text-gray-900 text-lg font-bold mb-2 leading-tight"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {video.title}
        </Text>

        {/* 게시일 */}
        <View className="flex-row items-center">
          <Ionicons name="time-outline" size={14} color="#9ca3af" />
          <Text className="text-gray-500 text-base ml-1">
            {relativeTime}
          </Text>
        </View>
      </View>
    </AnimatedTouchable>
  );
}

export default memo(MusicCard);
