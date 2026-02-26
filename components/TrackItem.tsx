import React, { memo } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Track } from '../types/catalog';
import { addSavedVideo } from '../utils/savedVideos';

interface TrackItemProps {
  track: Track;
  trackNumber: number;
  onPress: () => void;
  index: number;
  albumYear?: number;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

function TrackItem({ track, trackNumber, onPress, index, albumYear }: TrackItemProps) {
  const isPlayable = !!track.youtubeId;

  const handleSave = async () => {
    if (!track.youtubeId) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await addSavedVideo({
      id: track.youtubeId,
      title: track.title,
      thumbnail: `https://img.youtube.com/vi/${track.youtubeId}/hqdefault.jpg`,
      publishedAt: albumYear ? `${albumYear}-01-01T00:00:00Z` : new Date().toISOString(),
      description: '',
    });
    Alert.alert('저장됨', `"${track.title}"이(가) 나중에 보기에 추가되었습니다.`);
  };

  return (
    <AnimatedTouchable
      entering={FadeInDown.delay(index * 60).duration(350)}
      onPress={onPress}
      disabled={!isPlayable}
      className="flex-row items-center px-4 py-3 border-b border-gray-100 dark:border-gray-800"
      style={{ opacity: isPlayable ? 1 : 0.45 }}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel={`${trackNumber}번 트랙, ${track.title}${isPlayable ? '' : ', 재생 불가'}`}
      accessibilityHint={isPlayable ? '두 번 탭하면 재생합니다' : 'YouTube에서 제공되지 않는 곡입니다'}
    >
      <Text className="text-gray-400 dark:text-gray-500 text-sm w-8 text-center">
        {trackNumber}
      </Text>

      <Text className="flex-1 text-gray-900 dark:text-gray-100 text-base ml-2" numberOfLines={1}>
        {track.title}
      </Text>

      {isPlayable && (
        <TouchableOpacity
          onPress={(e) => { e.stopPropagation(); handleSave(); }}
          activeOpacity={0.7}
          className="p-2 ml-1"
          accessibilityRole="button"
          accessibilityLabel="나중에 보기에 저장"
        >
          <Ionicons name="bookmark-outline" size={18} color="#9ca3af" />
        </TouchableOpacity>
      )}

      <View className="ml-1">
        {isPlayable ? (
          <Ionicons name="chevron-forward" size={18} color="#9ca3af" />
        ) : (
          <Ionicons name="lock-closed-outline" size={16} color="#9ca3af" />
        )}
      </View>
    </AnimatedTouchable>
  );
}

export default memo(TrackItem);
