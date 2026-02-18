import AsyncStorage from '@react-native-async-storage/async-storage';
import type { YouTubeVideo } from '../types/youtube';

const STORAGE_KEY = '@cheezstereo/saved_videos';

export type SavedVideoItem = Pick<YouTubeVideo, 'id' | 'title' | 'thumbnail' | 'publishedAt' | 'description'>;

export async function getSavedVideos(): Promise<SavedVideoItem[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as SavedVideoItem[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export async function addSavedVideo(video: SavedVideoItem): Promise<SavedVideoItem[]> {
  const list = await getSavedVideos();
  if (list.some((v) => v.id === video.id)) return list;
  const next = [video, ...list];
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

export async function removeSavedVideo(videoId: string): Promise<SavedVideoItem[]> {
  const list = await getSavedVideos().then((arr) => arr.filter((v) => v.id !== videoId));
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  return list;
}

export async function isSaved(videoId: string): Promise<boolean> {
  const list = await getSavedVideos();
  return list.some((v) => v.id === videoId);
}
