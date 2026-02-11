import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as Linking from 'expo-linking';
import * as Haptics from 'expo-haptics';
import { useRouter } from 'expo-router';
import { YouTubeVideo } from '../../types/youtube';
import { getChannelVideos, searchChannelVideos } from '../../services/youtube';
import { YOUTUBE_CHANNELS, YOUTUBE_URLS, SORT_OPTIONS } from '../../constants/youtube';
import MusicCard from '../../components/MusicCard';
import SkeletonCard from '../../components/SkeletonCard';
import EmptyState from '../../components/EmptyState';
import SearchBar from '../../components/SearchBar';
import SortFilterButton from '../../components/SortFilterButton';

export default function MusicScreen() {
  const router = useRouter();
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('date');

  const fetchVideos = async (query: string = '', order: string = 'date') => {
    try {
      setError(null);
      const data = query
        ? await searchChannelVideos(YOUTUBE_CHANNELS.music, query, 50, order)
        : await getChannelVideos(YOUTUBE_CHANNELS.music, 50, order);
      setVideos(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : '비디오를 불러오는데 실패했습니다.';
      setError(errorMessage);
      console.error('음악 목록 로드 에러:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // 검색어 디바운스 처리
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        setLoading(true);
        fetchVideos(searchQuery, sortOrder);
      } else if (videos.length === 0 || searchQuery === '') {
        setLoading(true);
        fetchVideos('', sortOrder);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // 정렬 변경 시 재로드
  useEffect(() => {
    if (videos.length > 0) {
      setLoading(true);
      fetchVideos(searchQuery, sortOrder);
    }
  }, [sortOrder]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchVideos(searchQuery, sortOrder);
  };

  const handleSearchClear = () => {
    setSearchQuery('');
    setLoading(true);
    fetchVideos('', sortOrder);
  };

  const handleSortChange = (newSort: string) => {
    setSortOrder(newSort);
  };

  const handleVideoPress = (video: YouTubeVideo) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    Alert.alert(
      video.title,
      '어떻게 재생하시겠습니까?',
      [
        {
          text: '앱 내에서 재생',
          onPress: () => {
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
          },
        },
        {
          text: 'YouTube Music에서 열기',
          onPress: async () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            const url = YOUTUBE_URLS.music(video.id);
            try {
              const canOpen = await Linking.canOpenURL(url);
              if (canOpen) {
                await Linking.openURL(url);
              } else {
                Alert.alert(
                  '알림',
                  'YouTube Music 앱이 설치되어 있지 않습니다. 웹 브라우저로 열까요?',
                  [
                    { text: '취소', style: 'cancel' },
                    {
                      text: '열기',
                      onPress: async () => {
                        await Linking.openURL(url);
                      },
                    },
                  ]
                );
              }
            } catch (err) {
              console.error('링크 열기 에러:', err);
              Alert.alert('오류', '링크를 열 수 없습니다.');
            }
          },
        },
        { text: '취소', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const handleRetry = () => {
    setLoading(true);
    fetchVideos();
  };

  if (loading) {
    return (
      <KeyboardAvoidingView
        className="flex-1 bg-gray-50"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <View className="flex-row items-center px-4 mt-3 mb-2 gap-2">
          <View className="flex-1 h-12 bg-gray-200 rounded-xl" />
          <View className="h-12 w-24 bg-gray-200 rounded-xl" />
        </View>
        <FlatList
          data={[1, 2, 3, 4, 5]}
          keyExtractor={(item) => item.toString()}
          renderItem={() => <SkeletonCard />}
          contentContainerStyle={{ paddingTop: 8, paddingBottom: 16 }}
        />
      </KeyboardAvoidingView>
    );
  }

  if (error) {
    return (
      <EmptyState
        icon="alert-circle-outline"
        title="오류 발생"
        description={error}
        actionLabel="다시 시도"
        onAction={handleRetry}
      />
    );
  }

  if (videos.length === 0) {
    const isSearching = searchQuery.length > 0;
    return (
      <KeyboardAvoidingView
        className="flex-1 bg-gray-50"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <View className="flex-row items-center px-4 mt-3 mb-2 gap-2">
          <View className="flex-1">
            <SearchBar
              value={searchQuery}
              onChangeText={setSearchQuery}
              onClear={handleSearchClear}
              placeholder="음악 검색..."
            />
          </View>
          <SortFilterButton
            currentSort={sortOrder}
            onSortChange={handleSortChange}
            options={SORT_OPTIONS}
          />
        </View>
        <EmptyState
          icon={isSearching ? "search-outline" : "musical-notes-outline"}
          title={isSearching ? "검색 결과 없음" : "음악이 없습니다"}
          description={
            isSearching
              ? `"${searchQuery}"에 대한 검색 결과를 찾을 수 없습니다.`
              : "치즈스테레오의 음악을 불러올 수 없습니다."
          }
          actionLabel={isSearching ? "검색 초기화" : "새로고침"}
          onAction={isSearching ? handleSearchClear : handleRetry}
        />
      </KeyboardAvoidingView>
    );
  }

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-gray-50"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >
      <View className="flex-row items-center px-4 mt-3 mb-2 gap-2">
        <View className="flex-1">
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            onClear={handleSearchClear}
            placeholder="음악 검색..."
          />
        </View>
        <SortFilterButton
          currentSort={sortOrder}
          onSortChange={handleSortChange}
          options={SORT_OPTIONS}
        />
      </View>
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <MusicCard
            video={item}
            onPress={() => handleVideoPress(item)}
            index={index}
          />
        )}
        contentContainerStyle={{ paddingTop: 8, paddingBottom: 16 }}
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={5}
        removeClippedSubviews={true}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#ef4444']}
            tintColor="#ef4444"
          />
        }
      />
    </KeyboardAvoidingView>
  );
}
