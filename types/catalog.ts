export interface Track {
  id: string;
  title: string;
  youtubeId?: string; // undefined = not available on YouTube
  lyrics?: string;    // undefined = lyrics section hidden in player
}

export interface Album {
  id: string;
  title: string;
  year: number;
  type: 'album' | 'ep' | 'single';
  coverColor: string; // placeholder color (no artwork files)
  tracks: Track[];
}

export type VideoCategory = 'mv' | 'live' | 'interview';

export interface CatalogVideo {
  id: string;         // YouTube video ID
  title: string;
  category: VideoCategory;
  year: number;
}
