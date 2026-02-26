import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, ScrollView, Dimensions, Share, Alert, BackHandler, TouchableOpacity } from 'react-native';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import YoutubePlayer from 'react-native-youtube-iframe';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { getRelativeTime, getVideoById } from '../../services/youtube';
import { Header } from '../../components/Header';
import { YOUTUBE_URLS } from '../../constants/youtube';
import { usePlayer } from '../../contexts/PlayerContext';
import { TRACK_BY_YOUTUBE_ID } from '../../constants/catalog';

const { width } = Dimensions.get('window');

export default function PlayerScreen() {
  const { id, title, description, publishedAt } = useLocalSearchParams<{
    id: string;
    title: string | string[];
    description?: string;
    publishedAt?: string;
  }>();
  const router = useRouter();
  const { setCurrentVideo, clearCurrentVideo } = usePlayer();
  const [playing, setPlaying] = useState(true);
  const [fetchedMeta, setFetchedMeta] = useState<{
    title: string;
    description: string;
    publishedAt: string;
  } | null>(null);

  const resolvedId = typeof id === 'string' ? id : Array.isArray(id) ? id[0] : '';
  const resolvedTitle =
    typeof title === 'string' ? title : Array.isArray(title) ? title[0] : '비디오 재생';

  const displayTitle = fetchedMeta?.title ?? resolvedTitle;
  const displayDescription =
    fetchedMeta?.description ?? (typeof description === 'string' ? description : '');
  const displayPublishedAt =
    fetchedMeta?.publishedAt ?? (typeof publishedAt === 'string' ? publishedAt : '');

  useEffect(() => {
    if (resolvedId) {
      setCurrentVideo({
        id: resolvedId,
        title: resolvedTitle,
        publishedAt: typeof publishedAt === 'string' ? publishedAt : undefined,
        description: typeof description === 'string' ? description : undefined,
      });
    }
  }, [resolvedId, resolvedTitle, publishedAt, description, setCurrentVideo]);

  useEffect(() => {
    if (resolvedId && resolvedTitle === '비디오 재생') {
      setFetchedMeta(null);
      getVideoById(resolvedId).then((data) => {
        if (data) {
          setFetchedMeta(data);
          setCurrentVideo({
            id: resolvedId,
            title: data.title,
            publishedAt: data.publishedAt,
            description: data.description,
          });
        }
      });
    }
  }, [resolvedId, resolvedTitle, setCurrentVideo]);

  const lyrics = resolvedId ? TRACK_BY_YOUTUBE_ID[resolvedId]?.lyrics : undefined;

  const onStateChange = useCallback((state: string) => {
    setPlaying(state === 'playing' || state === 'buffering');
    if (state === 'ended') {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
  }, []);

  const handleClose = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    clearCurrentVideo();
    router.back();
  };

  useEffect(() => {
    const handler = BackHandler.addEventListener('hardwareBackPress', () => {
      clearCurrentVideo();
      router.back();
      return true;
    });
    return () => handler.remove();
  }, [clearCurrentVideo, router]);

  const handleShare = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    try {
      await Share.share({
        title: displayTitle,
        url: YOUTUBE_URLS.video(resolvedId),
        message: `${displayTitle}\n${YOUTUBE_URLS.video(resolvedId)}`,
      });
    } catch {
      Alert.alert('오류', '공유할 수 없습니다.');
    }
  };

  return (
    <View className="flex-1 bg-gray-900">
      <SafeAreaView edges={['top', 'bottom']} className="flex-1 bg-gray-900">
        <Header
          title={displayTitle}
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
          <View className="flex-row justify-center items-center py-3 bg-gray-900">
            <TouchableOpacity
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setPlaying((prev) => !prev);
              }}
              activeOpacity={0.7}
              className="p-3 rounded-full bg-white/10"
              accessibilityRole="button"
              accessibilityLabel={playing ? '일시 정지' : '재생'}
            >
              <Ionicons
                name={playing ? 'pause' : 'play'}
                size={28}
                color="#ffffff"
              />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView className="flex-1 bg-white dark:bg-gray-900">
          <Animated.View entering={SlideInDown.delay(200).springify()} className="p-6">
            <Text className="text-gray-900 dark:text-gray-100 text-2xl font-bold mb-3 leading-tight">
              {displayTitle}
            </Text>
            {displayPublishedAt ? (
              <View className="flex-row items-center mb-6">
                <View className="bg-red-50 dark:bg-red-900/30 p-2 rounded-lg mr-2">
                  <Ionicons name="calendar-outline" size={16} color="#ef4444" />
                </View>
                <Text className="text-gray-600 dark:text-gray-400 text-base">
                  {getRelativeTime(displayPublishedAt)}
                </Text>
              </View>
            ) : null}
            {displayDescription ? (
              <View className="mt-2 bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
                <Text className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
                  {displayDescription}
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
