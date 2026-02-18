import React from 'react';
import { Alert, Share } from 'react-native';
import * as Linking from 'expo-linking';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import type { YouTubeVideo } from '../../types/youtube';
import { YOUTUBE_CHANNELS, YOUTUBE_URLS } from '../../constants/youtube';
import { useChannelVideos } from '../../hooks/useChannelVideos';
import { addSavedVideo } from '../../utils/savedVideos';
import MusicCard from '../../components/MusicCard';
import { ChannelVideoList, type EmptyConfig } from '../../components/ChannelVideoList';

const EMPTY_CONFIG: EmptyConfig = {
  searchIcon: 'search-outline',
  listIcon: 'musical-notes-outline',
  emptyTitle: '음악이 없습니다',
  emptyDesc: '치즈스테레오의 음악을 불러올 수 없습니다.',
  searchEmptyTitle: '검색 결과 없음',
  searchEmptyDesc: (q) => `"${q}"에 대한 검색 결과를 찾을 수 없습니다.`,
  searchPlaceholder: '음악 검색...',
};

export default function MusicScreen() {
  const router = useRouter();
  const channel = useChannelVideos({ channelId: YOUTUBE_CHANNELS.music });

  const handleVideoPress = (video: YouTubeVideo) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const openInApp = () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
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
    const openExternal = async () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      const url = YOUTUBE_URLS.music(video.id);
      try {
        const canOpen = await Linking.canOpenURL(url);
        if (canOpen) await Linking.openURL(url);
        else {
          Alert.alert(
            '알림',
            'YouTube Music 앱이 설치되어 있지 않습니다. 웹 브라우저로 열까요?',
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
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      try {
        await Share.share({
          title: video.title,
          url: YOUTUBE_URLS.music(video.id),
          message: `${video.title}\n${YOUTUBE_URLS.music(video.id)}`,
        });
      } catch {
        Alert.alert('오류', '공유할 수 없습니다.');
      }
    };
    const addToSaved = async () => {
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

    Alert.alert(
      video.title,
      '어떻게 재생하시겠습니까?',
      [
        { text: '앱 내에서 재생', onPress: openInApp },
        { text: 'YouTube Music에서 열기', onPress: openExternal },
        { text: '공유하기', onPress: share },
        { text: '나중에 보기', onPress: addToSaved },
        { text: '취소', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  return (
    <ChannelVideoList
      videos={channel.videos}
      loading={channel.loading}
      refreshing={channel.refreshing}
      error={channel.error}
      searchQuery={channel.searchQuery}
      setSearchQuery={channel.setSearchQuery}
      sortOrder={channel.sortOrder}
      onSortChange={channel.setSortOrder}
      onRefresh={channel.handleRefresh}
      onSearchClear={channel.handleSearchClear}
      onRetry={channel.handleRetry}
      emptyConfig={EMPTY_CONFIG}
      renderCard={(item, index) => (
        <MusicCard
          video={item}
          onPress={() => handleVideoPress(item)}
          index={index}
        />
      )}
    />
  );
}
