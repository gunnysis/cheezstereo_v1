import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, Share } from 'react-native';
import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import VideoCard from '../../components/VideoCard';
import { VIDEOS } from '../../constants/catalog';
import type { VideoCategory } from '../../types/catalog';
import type { YouTubeVideo } from '../../types/youtube';
import { usePlayer } from '../../contexts/PlayerContext';
import { YOUTUBE_URLS } from '../../constants/youtube';
import { addSavedVideo } from '../../utils/savedVideos';

const CATEGORIES: { key: VideoCategory; label: string }[] = [
  { key: 'mv',        label: '뮤직비디오' },
  { key: 'live',      label: '라이브' },
  { key: 'interview', label: '인터뷰' },
];

function toYouTubeVideo(v: (typeof VIDEOS)[0]): YouTubeVideo {
  return {
    id: v.id,
    title: v.title,
    thumbnail: `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`,
    publishedAt: `${v.year}-01-01T00:00:00Z`,
    channelTitle: 'CheezStereo',
    description: '',
  };
}

export default function VideosScreen() {
  const router = useRouter();
  const { setCurrentVideo } = usePlayer();
  const [activeCategory, setActiveCategory] = useState<VideoCategory>('mv');

  const filtered = useMemo(
    () => VIDEOS.filter((v) => v.category === activeCategory).map(toYouTubeVideo),
    [activeCategory]
  );

  const handleVideoPress = (video: YouTubeVideo) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setCurrentVideo({ id: video.id, title: video.title, publishedAt: video.publishedAt });
    router.push({
      pathname: '/player/[id]',
      params: {
        id: video.id,
        title: video.title,
        description: video.description,
        publishedAt: video.publishedAt,
      },
    });
  };

  const handleCategoryPress = (key: VideoCategory) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setActiveCategory(key);
  };

  const handleLongPress = (video: YouTubeVideo) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const openExternal = async () => {
      const url = YOUTUBE_URLS.video(video.id);
      try {
        const canOpen = await Linking.canOpenURL(url);
        if (canOpen) await Linking.openURL(url);
        else {
          Alert.alert(
            '알림',
            'YouTube 앱이 설치되어 있지 않습니다. 웹 브라우저로 열까요?',
            [
              { text: '취소', style: 'cancel' },
              { text: '열기', onPress: () => Linking.openURL(url) },
            ]
          );
        }
      } catch {
        Alert.alert('오류', '링크를 열 수 없습니다.');
      }
    };
    const share = async () => {
      try {
        await Share.share({
          title: video.title,
          url: YOUTUBE_URLS.video(video.id),
          message: `${video.title}\n${YOUTUBE_URLS.video(video.id)}`,
        });
      } catch {
        Alert.alert('오류', '공유할 수 없습니다.');
      }
    };
    const addToSaved = async () => {
      await addSavedVideo({
        id: video.id,
        title: video.title,
        thumbnail: video.thumbnail,
        publishedAt: video.publishedAt,
        description: video.description,
      });
      Alert.alert('저장됨', '나중에 보기 목록에 추가되었습니다.');
    };
    Alert.alert(
      video.title,
      '더 보기',
      [
        { text: 'YouTube에서 열기', onPress: openExternal },
        { text: '공유하기', onPress: share },
        { text: '나중에 보기', onPress: addToSaved },
        { text: '취소', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="flex-row bg-white dark:bg-gray-800 px-4 py-2 border-b border-gray-100 dark:border-gray-700">
        {CATEGORIES.map(({ key, label }) => {
          const isActive = activeCategory === key;
          return (
            <TouchableOpacity
              key={key}
              onPress={() => handleCategoryPress(key)}
              className={`flex-1 items-center py-2 mx-1 rounded-full ${
                isActive ? 'bg-red-500' : 'bg-gray-100 dark:bg-gray-700'
              }`}
              activeOpacity={0.8}
              accessibilityRole="tab"
              accessibilityLabel={label}
              accessibilityState={{ selected: isActive }}
            >
              <Text
                className={`text-sm font-semibold ${
                  isActive ? 'text-white' : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <FlatList
        key={activeCategory}
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <VideoCard
            video={item}
            onPress={() => handleVideoPress(item)}
            onLongPress={() => handleLongPress(item)}
            index={index}
          />
        )}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 88 }}
      />
    </View>
  );
}
