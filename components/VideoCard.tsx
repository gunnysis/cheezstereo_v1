import React, { memo } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { YouTubeVideo } from '../types/youtube';
import { getRelativeTime } from '../services/youtube';
import VideoThumbnail from './VideoThumbnail';
import { addSavedVideo } from '../utils/savedVideos';

interface VideoCardProps {
  video: YouTubeVideo;
  onPress: () => void;
  onLongPress?: () => void;
  index: number;
}

function VideoCard({ video, onPress, onLongPress, index }: VideoCardProps) {
  const relativeTime = getRelativeTime(video.publishedAt);

  const handleSave = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await addSavedVideo({
      id: video.id,
      title: video.title,
      thumbnail: video.thumbnail,
      publishedAt: video.publishedAt,
      description: video.description,
    });
    Alert.alert('저장됨', '나중에 보기 목록에 추가되었습니다.');
  };

  return (
    <Animated.View entering={FadeInDown.delay(index * 100).duration(400)}>
      <TouchableOpacity
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
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Ionicons name="time-outline" size={14} color="#9ca3af" />
            <Text className="text-gray-500 dark:text-gray-400 text-sm ml-1">{relativeTime}</Text>
            {video.viewCount && (
              <>
                <Text className="text-gray-400 text-sm mx-2">•</Text>
                <Ionicons name="eye-outline" size={14} color="#9ca3af" />
                <Text className="text-gray-500 dark:text-gray-400 text-sm ml-1">
                  {video.viewCount}
                </Text>
              </>
            )}
          </View>
          <TouchableOpacity
            onPress={(e) => { e.stopPropagation(); handleSave(); }}
            activeOpacity={0.7}
            className="p-1.5"
            accessibilityRole="button"
            accessibilityLabel="나중에 보기에 저장"
          >
            <Ionicons name="bookmark-outline" size={20} color="#9ca3af" />
          </TouchableOpacity>
        </View>
      </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default memo(VideoCard);
