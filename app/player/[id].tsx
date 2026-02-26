import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { View, Text, ScrollView, Dimensions, Share, Alert } from 'react-native';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import YoutubePlayer from 'react-native-youtube-iframe';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { getRelativeTime } from '../../services/youtube';
import { Header } from '../../components/Header';
import { YOUTUBE_URLS } from '../../constants/youtube';
import { usePlayer } from '../../contexts/PlayerContext';
import { ALBUMS } from '../../constants/catalog';

const { width } = Dimensions.get('window');

export default function PlayerScreen() {
  const { id, title, description, publishedAt } = useLocalSearchParams<{
    id: string;
    title: string | string[];
    description?: string;
    publishedAt?: string;
  }>();
  const router = useRouter();
  const { setCurrentVideo } = usePlayer();
  const [playing, setPlaying] = useState(true);

  const resolvedId = typeof id === 'string' ? id : Array.isArray(id) ? id[0] : '';
  const resolvedTitle =
    typeof title === 'string' ? title : Array.isArray(title) ? title[0] : '비디오 재생';

  useEffect(() => {
    if (resolvedId) {
      setCurrentVideo({
        id: resolvedId,
        title: resolvedTitle,
        publishedAt: typeof publishedAt === 'string' ? publishedAt : undefined,
        description: typeof description === 'string' ? description : undefined,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedId]);

  const lyrics = useMemo(() => {
    if (!resolvedId) return undefined;
    for (const album of ALBUMS) {
      const track = album.tracks.find((t) => t.youtubeId === resolvedId);
      if (track?.lyrics) return track.lyrics;
    }
    return undefined;
  }, [resolvedId]);

  const onStateChange = useCallback((state: string) => {
    setPlaying(state === 'playing' || state === 'buffering');
    if (state === 'ended') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }, []);

  const handleClose = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  const handleShare = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    try {
      await Share.share({
        title: resolvedTitle,
        url: YOUTUBE_URLS.video(resolvedId),
        message: `${resolvedTitle}\n${YOUTUBE_URLS.video(resolvedId)}`,
      });
    } catch {
      Alert.alert('오류', '공유할 수 없습니다.');
    }
  };

  return (
    <View className="flex-1 bg-gray-900">
      <SafeAreaView edges={['top', 'bottom']} className="flex-1 bg-gray-900">
        <Header
          title={resolvedTitle}
          variant="player"
          safeAreaTop={false}
          leftButton={{ icon: 'close', onPress: handleClose, accessibilityLabel: '닫기' }}
          rightButton={{
            icon: 'share-outline',
            onPress: handleShare,
            accessibilityLabel: '공유하기',
          }}
        />

        <View
          className="bg-black"
          accessible
          accessibilityLabel={playing ? '동영상 재생 중' : '동영상 일시 정지'}
          accessibilityRole="none"
        >
          <YoutubePlayer
            height={(width * 9) / 16}
            play={playing}
            videoId={resolvedId}
            onChangeState={onStateChange}
            webViewProps={{
              allowsFullscreenVideo: true,
            }}
          />
        </View>

        <ScrollView className="flex-1 bg-white dark:bg-gray-900">
          <Animated.View entering={SlideInDown.delay(200).springify()} className="p-6">
            <Text className="text-gray-900 dark:text-gray-100 text-2xl font-bold mb-3 leading-tight">
              {resolvedTitle}
            </Text>
            {publishedAt && (
              <View className="flex-row items-center mb-6">
                <View className="bg-red-50 dark:bg-red-900/30 p-2 rounded-lg mr-2">
                  <Ionicons name="calendar-outline" size={16} color="#ef4444" />
                </View>
                <Text className="text-gray-600 dark:text-gray-400 text-base">
                  {getRelativeTime(typeof publishedAt === 'string' ? publishedAt : '')}
                </Text>
              </View>
            )}
            {description ? (
              <View className="mt-2 bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
                <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                  {description}
                </Text>
              </View>
            ) : null}
            {lyrics ? (
              <View className="mt-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
                <View className="flex-row items-center mb-3">
                  <Ionicons name="musical-note-outline" size={16} color="#ef4444" />
                  <Text className="text-red-500 font-bold text-sm ml-2">가사</Text>
                </View>
                <Text className="text-gray-700 dark:text-gray-300 text-base leading-loose">
                  {lyrics}
                </Text>
              </View>
            ) : null}
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
