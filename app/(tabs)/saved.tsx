import React from 'react';
import {
  View, Text, FlatList, TouchableOpacity, Alert, useColorScheme, Image,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSavedVideos } from '../../hooks/useSavedVideos';
import type { SavedVideoItem } from '../../utils/savedVideos';
import { getRelativeTime } from '../../services/youtube';
import { usePlayer } from '../../contexts/PlayerContext';

function SavedCard({
  item, onPress, onRemove,
}: {
  item: SavedVideoItem;
  onPress: () => void;
  onRemove: () => void;
}) {
  const isDark = useColorScheme() === 'dark';

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg mb-4 mx-4 overflow-hidden flex-row"
      accessibilityRole="button"
      accessibilityLabel={`${item.title}, 재생`}
    >
      <View className="w-32 h-24 bg-gray-200 dark:bg-gray-700 rounded-l-2xl overflow-hidden">
        {item.thumbnail ? (
          <Image source={{ uri: item.thumbnail }} className="w-full h-full" resizeMode="cover" />
        ) : (
          <View className="w-full h-full items-center justify-center bg-gray-300 dark:bg-gray-600">
            <Ionicons name="musical-notes" size={28} color="#9ca3af" />
          </View>
        )}
      </View>
      <View className="flex-1 p-4 justify-center">
        <Text
          className="text-gray-900 dark:text-gray-100 font-bold text-base"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {item.title}
        </Text>
        <Text className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          {getRelativeTime(item.publishedAt)}
        </Text>
      </View>
      <TouchableOpacity
        onPress={(e) => { e.stopPropagation(); onRemove(); }}
        className="p-4 justify-center"
        accessibilityLabel="목록에서 제거"
        accessibilityRole="button"
      >
        <Ionicons name="trash-outline" size={22} color={isDark ? '#9ca3af' : '#6b7280'} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

export default function SavedScreen() {
  const router = useRouter();
  const { list, loading, remove } = useSavedVideos();
  const { setCurrentVideo } = usePlayer();

  const handlePlay = (item: SavedVideoItem) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setCurrentVideo({ id: item.id, title: item.title, publishedAt: item.publishedAt });
    router.push({
      pathname: '/player/[id]',
      params: {
        id: item.id,
        title: item.title,
        description: item.description,
        publishedAt: item.publishedAt,
      },
    });
  };

  const handleRemove = (item: SavedVideoItem) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert(
      '나중에 보기에서 제거',
      `"${item.title}"을(를) 목록에서 제거할까요?`,
      [
        { text: '취소', style: 'cancel' },
        { text: '제거', style: 'destructive', onPress: () => remove(item.id) },
      ]
    );
  };

  if (loading && list.length === 0) {
    return (
      <View className="flex-1 bg-gray-50 dark:bg-gray-900 items-center justify-center">
        <Text className="text-gray-500 dark:text-gray-400">불러오는 중...</Text>
      </View>
    );
  }

  if (list.length === 0) {
    return (
      <View className="flex-1 bg-gray-50 dark:bg-gray-900 items-center justify-center px-6">
        <View className="bg-red-50 dark:bg-red-900/20 p-6 rounded-full mb-6">
          <Ionicons name="bookmark-outline" size={64} color="#ef4444" />
        </View>
        <Text className="text-gray-900 dark:text-gray-100 text-2xl font-bold text-center mb-3">
          나중에 보기
        </Text>
        <Text className="text-gray-600 dark:text-gray-400 text-base text-center">
          음악이나 영상 카드에서 북마크 아이콘을 누르면 여기에 저장됩니다.
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      <FlatList
        data={list}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 24 }}
        renderItem={({ item }) => (
          <SavedCard
            item={item}
            onPress={() => handlePlay(item)}
            onRemove={() => handleRemove(item)}
          />
        )}
      />
    </View>
  );
}
