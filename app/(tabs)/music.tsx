import React from 'react';
import { View, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Header } from '../../components/Header';
import AlbumCard from '../../components/AlbumCard';
import { ALBUMS } from '../../constants/catalog';
import type { Album } from '../../types/catalog';

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
      <Header title="치즈스테레오" variant="tabs" />
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
        contentContainerStyle={{ paddingVertical: 16 }}
      />
    </View>
  );
}
