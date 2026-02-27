import React, { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Album } from '../types/catalog';

interface AlbumCardProps {
  album: Album;
  onPress: () => void;
  index: number;
}

const TYPE_LABELS: Record<Album['type'], string> = {
  album: '정규',
  ep: 'EP',
  single: '싱글',
};

function AlbumCard({ album, onPress, index }: AlbumCardProps) {
  return (
    <Animated.View entering={FadeInDown.delay(index * 100).duration(400)}>
      <TouchableOpacity
        onPress={onPress}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg mb-4 mx-4 overflow-hidden flex-row"
        activeOpacity={0.85}
        accessibilityRole="button"
        accessibilityLabel={`${album.title}, ${album.year}년 ${TYPE_LABELS[album.type]}`}
        accessibilityHint="두 번 탭하면 트랙 목록을 엽니다"
      >
      {/* 앨범 커버 (색상 플레이스홀더) */}
      <View
        className="w-24 h-24 items-center justify-center p-2"
        style={{ backgroundColor: album.coverColor }}
      >
        <Text
          className="text-white text-xs font-bold text-center leading-tight"
          numberOfLines={3}
        >
          {album.title}
        </Text>
        <Text className="text-white/70 text-xs mt-1">{album.year}</Text>
      </View>

      {/* 앨범 정보 */}
      <View className="flex-1 p-4 justify-center">
        <Text
          className="text-gray-900 dark:text-gray-100 text-base font-bold mb-1 leading-tight"
          numberOfLines={2}
        >
          {album.title}
        </Text>
        <View className="flex-row items-center gap-2 mb-1">
          <Text className="text-gray-500 dark:text-gray-400 text-sm">{album.year}</Text>
          <View className="bg-red-500 rounded-full px-2 py-0.5">
            <Text className="text-white text-xs font-semibold">
              {TYPE_LABELS[album.type]}
            </Text>
          </View>
        </View>
        <Text className="text-gray-400 dark:text-gray-500 text-sm">
          {album.tracks.length}곡
        </Text>
      </View>

      {/* 화살표 */}
      <View className="items-center justify-center pr-4">
        <Text className="text-gray-400 dark:text-gray-500 text-lg">›</Text>
      </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default memo(AlbumCard);
