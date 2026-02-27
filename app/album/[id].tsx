import React, { useEffect } from 'react';
import { View, Text, FlatList, Alert, BackHandler } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { Header } from '../../components/Header';
import TrackItem from '../../components/TrackItem';
import { ALBUMS } from '../../constants/catalog';
import type { Track } from '../../types/catalog';
import { usePlayer } from '../../contexts/PlayerContext';

const TYPE_LABELS = {
  album: '정규앨범',
  ep: 'EP',
  single: '싱글',
} as const;

const MINI_PLAYER_HEIGHT = 80;

export default function AlbumScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { setCurrentVideo } = usePlayer();

  const album = ALBUMS.find((a) => a.id === id);

  if (!album) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900 items-center justify-center">
        <Text className="text-gray-500 dark:text-gray-400">앨범을 찾을 수 없습니다.</Text>
      </SafeAreaView>
    );
  }

  const handleTrackPress = (track: Track) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (!track.youtubeId) {
      Alert.alert('재생 불가', 'YouTube에서 제공되지 않는 곡입니다.');
      return;
    }
    const publishedAt = `${album.year}-01-01T00:00:00Z`;
    setCurrentVideo({ id: track.youtubeId, title: track.title, publishedAt });
    router.push({
      pathname: '/player/[id]',
      params: {
        id: track.youtubeId,
        title: track.title,
        description: '',
        publishedAt,
      },
    });
  };

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  useEffect(() => {
    const handler = BackHandler.addEventListener('hardwareBackPress', () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      router.back();
      return true;
    });
    return () => handler.remove();
  }, [router]);

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      <SafeAreaView edges={['top']} style={{ backgroundColor: album.coverColor }}>
        <Header
          title={album.title}
          subtitle={`${album.year} · ${TYPE_LABELS[album.type]}`}
          variant="tabs"
          safeAreaTop={false}
          backgroundColor={album.coverColor}
          leftButton={{
            icon: 'arrow-back',
            onPress: handleBack,
            accessibilityLabel: '뒤로 가기',
          }}
        />
      </SafeAreaView>

      <FlatList
        data={album.tracks}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View
            className="items-center justify-center py-10 px-6"
            style={{ backgroundColor: album.coverColor }}
          >
            <View className="w-32 h-32 rounded-2xl items-center justify-center mb-4 bg-black/20">
              <Text className="text-white text-sm font-bold text-center px-2" numberOfLines={3}>
                {album.title}
              </Text>
              <Text className="text-white/70 text-xs mt-1">{album.year}</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Text className="text-white font-bold text-xl">{album.title}</Text>
            </View>
            <View className="flex-row items-center gap-2 mt-2">
              <Text className="text-white/80 text-sm">{album.year}</Text>
              <View className="bg-white/20 rounded-full px-3 py-0.5">
                <Text className="text-white text-xs font-semibold">
                  {TYPE_LABELS[album.type]}
                </Text>
              </View>
            </View>
          </View>
        }
        renderItem={({ item, index }) => (
          <TrackItem
            track={item}
            trackNumber={index + 1}
            onPress={() => handleTrackPress(item)}
            index={index}
            albumYear={album.year}
          />
        )}
        contentContainerStyle={{ paddingBottom: MINI_PLAYER_HEIGHT + insets.bottom + 24 }}
        className="bg-white dark:bg-gray-900"
      />
    </View>
  );
}
