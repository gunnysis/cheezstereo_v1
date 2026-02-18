import { useState, useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import { getSavedVideos, addSavedVideo, removeSavedVideo, type SavedVideoItem } from '../utils/savedVideos';

export function useSavedVideos() {
  const [list, setList] = useState<SavedVideoItem[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const data = await getSavedVideos();
    setList(data);
    setLoading(false);
  }, []);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  const add = useCallback(async (video: SavedVideoItem) => {
    const next = await addSavedVideo(video);
    setList(next);
  }, []);

  const remove = useCallback(async (videoId: string) => {
    const next = await removeSavedVideo(videoId);
    setList(next);
  }, []);

  return { list, loading, add, remove, refresh: load };
}
