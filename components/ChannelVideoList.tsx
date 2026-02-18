import React from 'react';
import {
  View,
  FlatList,
  RefreshControl,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import type { YouTubeVideo } from '../types/youtube';
import SkeletonCard from './SkeletonCard';
import EmptyState from './EmptyState';
import SearchBar from './SearchBar';
import SortFilterButton from './SortFilterButton';
import { SORT_OPTIONS } from '../constants/youtube';

export type EmptyConfig = {
  searchIcon: 'search-outline' | 'musical-notes-outline' | 'videocam-outline';
  listIcon: 'musical-notes-outline' | 'videocam-outline';
  emptyTitle: string;
  emptyDesc: string;
  searchEmptyTitle: string;
  searchEmptyDesc: (query: string) => string;
  searchPlaceholder: string;
};

type ChannelVideoListProps = {
  videos: YouTubeVideo[];
  loading: boolean;
  refreshing: boolean;
  error: string | null;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  sortOrder: string;
  onSortChange: (order: string) => void;
  onRefresh: () => void;
  onSearchClear: () => void;
  onRetry: () => void;
  emptyConfig: EmptyConfig;
  renderCard: (item: YouTubeVideo, index: number) => React.ReactElement;
};

export function ChannelVideoList({
  videos,
  loading,
  refreshing,
  error,
  searchQuery,
  setSearchQuery,
  sortOrder,
  onSortChange,
  onRefresh,
  onSearchClear,
  onRetry,
  emptyConfig,
  renderCard,
}: ChannelVideoListProps) {
  const listContent = (
    <View className="flex-row items-center px-4 mt-3 mb-2 gap-2">
      <View className="flex-1">
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onClear={onSearchClear}
          placeholder={emptyConfig.searchPlaceholder}
        />
      </View>
      <SortFilterButton
        currentSort={sortOrder}
        onSortChange={onSortChange}
        options={SORT_OPTIONS}
      />
    </View>
  );

  if (loading && videos.length === 0) {
    return (
      <KeyboardAvoidingView
        className="flex-1 bg-gray-50 dark:bg-gray-900"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        <View className="flex-row items-center px-4 mt-3 mb-2 gap-2">
          <View className="flex-1 h-12 bg-gray-200 dark:bg-gray-700 rounded-xl" />
          <View className="h-12 w-24 bg-gray-200 dark:bg-gray-700 rounded-xl" />
        </View>
        <FlatList
          data={[1, 2, 3, 4, 5]}
          keyExtractor={(i) => i.toString()}
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
        onAction={onRetry}
      />
    );
  }

  if (videos.length === 0) {
    const isSearching = searchQuery.length > 0;
    return (
      <KeyboardAvoidingView
        className="flex-1 bg-gray-50 dark:bg-gray-900"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={0}
      >
        {listContent}
        <EmptyState
          icon={isSearching ? emptyConfig.searchIcon : emptyConfig.listIcon}
          title={isSearching ? emptyConfig.searchEmptyTitle : emptyConfig.emptyTitle}
          description={isSearching ? emptyConfig.searchEmptyDesc(searchQuery) : emptyConfig.emptyDesc}
          actionLabel={isSearching ? '검색 초기화' : '새로고침'}
          onAction={isSearching ? onSearchClear : onRetry}
        />
      </KeyboardAvoidingView>
    );
  }

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-gray-50 dark:bg-gray-900"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      {listContent}
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => renderCard(item, index)}
        contentContainerStyle={{ paddingTop: 8, paddingBottom: 16 }}
        initialNumToRender={8}
        maxToRenderPerBatch={8}
        windowSize={5}
        removeClippedSubviews={true}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#ef4444']}
            tintColor="#ef4444"
          />
        }
      />
    </KeyboardAvoidingView>
  );
}
