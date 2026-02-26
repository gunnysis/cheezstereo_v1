import React from 'react';
import { View, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import AlbumCard from '../../components/AlbumCard';
import { ALBUMS } from '../../constants/catalog';
import type { Album } from '../../types/catalog';

const MINI_PLAYER_HEIGHT = 80;

export default function MusicScreen() {
  const router = useRouter();

  const handleAlbumPress = (album: Album) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push({
      pathname: '/album/[id]',
      params: { id: album.id },
    });
  };

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      <FlatList
        data={ALBUMS}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <AlbumCard
            album={item}
            index={index}
            onPress={() => handleAlbumPress(item)}
          />
        )}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: MINI_PLAYER_HEIGHT + 8 }}
      />
    </View>
  );
}
