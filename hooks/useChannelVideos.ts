import { useEffect, useState, useCallback } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { getChannelVideos, searchChannelVideos } from '../services/youtube';
import type { YouTubeVideo } from '../types/youtube';

const OFFLINE_MESSAGE = '인터넷 연결을 확인해 주세요.';

export type UseChannelVideosConfig = {
  channelId: string;
};

export function useChannelVideos({ channelId }: UseChannelVideosConfig) {
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('date');
  const [isConnected, setIsConnected] = useState<boolean | null>(true);

  useEffect(() => {
    const sub = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected ?? null);
    });
    return () => sub();
  }, []);

  const fetchVideos = useCallback(
    async (query: string = '', order: string = 'date') => {
      try {
        setError(null);
        const netState = await NetInfo.fetch();
        if (!netState.isConnected) {
          setError(OFFLINE_MESSAGE);
          setVideos([]);
          return;
        }
        const data = query
          ? await searchChannelVideos(channelId, query, 50, order)
          : await getChannelVideos(channelId, 50, order);
        setVideos(data);
      } catch (err) {
        const msg = err instanceof Error ? err.message : '비디오를 불러오는데 실패했습니다.';
        setError(msg);
        if (msg !== OFFLINE_MESSAGE) {
          setVideos([]);
        }
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [channelId]
  );

  useEffect(() => {
    fetchVideos();
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      if (searchQuery.trim()) {
        setLoading(true);
        fetchVideos(searchQuery, sortOrder);
      } else if (videos.length === 0 || searchQuery === '') {
        setLoading(true);
        fetchVideos('', sortOrder);
      }
    }, 500);
    return () => clearTimeout(t);
  }, [searchQuery]);

  useEffect(() => {
    if (videos.length > 0) {
      setLoading(true);
      fetchVideos(searchQuery, sortOrder);
    }
  }, [sortOrder]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchVideos(searchQuery, sortOrder);
  }, [fetchVideos, searchQuery, sortOrder]);

  const handleSearchClear = useCallback(() => {
    setSearchQuery('');
    setLoading(true);
    fetchVideos('', sortOrder);
  }, [fetchVideos, sortOrder]);

  const handleRetry = useCallback(() => {
    setLoading(true);
    fetchVideos(searchQuery, sortOrder);
  }, [fetchVideos, searchQuery, sortOrder]);

  return {
    videos,
    loading,
    refreshing,
    error,
    searchQuery,
    setSearchQuery,
    sortOrder,
    setSortOrder: (order: string) => {
      setSortOrder(order);
      if (videos.length > 0) setLoading(true);
    },
    handleRefresh,
    handleSearchClear,
    handleRetry,
    refetch: fetchVideos,
  };
}
