// YouTube 채널 정보
export const YOUTUBE_CHANNELS = {
  // 유튜브 뮤직 채널 ID
  music: 'UC8JozAPzI7Tbiivvv5icIFA',
  // 유튜브 영상 채널 (handle 또는 ID)
  videos: 'UC8JozAPzI7Tbiivvv5icIFA', // 같은 채널 사용
};

// YouTube Data API v3 엔드포인트
export const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

// API 설정
export const API_CONFIG = {
  maxResults: 50, // 한 번에 가져올 최대 결과 수
  order: 'date', // 정렬: date (최신순), relevance (관련도), viewCount (조회수)
};

// YouTube 링크 URL
export const YOUTUBE_URLS = {
  music: (videoId: string) => `https://music.youtube.com/watch?v=${videoId}`,
  video: (videoId: string) => `https://www.youtube.com/watch?v=${videoId}`,
  musicChannel: `https://music.youtube.com/channel/${YOUTUBE_CHANNELS.music}`,
  videoChannel: `https://www.youtube.com/@cheezstereo`,
};

// 정렬 옵션
export const SORT_OPTIONS = [
  { label: '최신순', value: 'date' as const },
  { label: '조회수순', value: 'viewCount' as const },
  { label: '관련도순', value: 'relevance' as const },
  { label: '제목순', value: 'title' as const },
];
