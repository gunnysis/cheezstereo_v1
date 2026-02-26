import axios from 'axios';
import Constants from 'expo-constants';
import {
  YouTubeVideo,
  YouTubeSearchResponse,
  YouTubeAPIError,
  YouTubeVideosListResponse,
} from '../types/youtube';
import { YOUTUBE_API_BASE_URL, API_CONFIG } from '../constants/youtube';

/**
 * YouTube Data API 서비스
 * 
 * 사용 전 app.json의 extra 섹션에 YOUTUBE_API_KEY를 설정해야 합니다.
 */

// 환경 변수에서 API 키 가져오기
const getApiKey = (): string => {
  // Expo Constants를 통해 API 키 가져오기
  const apiKey = Constants.expoConfig?.extra?.YOUTUBE_API_KEY || '';
  return apiKey;
};

/**
 * 채널의 비디오 목록 가져오기
 * @param channelId YouTube 채널 ID
 * @param maxResults 가져올 최대 결과 수 (기본값: 50)
 * @param order 정렬 순서 (기본값: date)
 * @returns YouTubeVideo 배열
 */
export const getChannelVideos = async (
  channelId: string,
  maxResults: number = API_CONFIG.maxResults,
  order: string = API_CONFIG.order
): Promise<YouTubeVideo[]> => {
  try {
    const apiKey = getApiKey();
    
    if (!apiKey) {
      throw new Error('YouTube API 키가 설정되지 않았습니다. .env 파일을 확인해주세요.');
    }

    const response = await axios.get<YouTubeSearchResponse>(
      `${YOUTUBE_API_BASE_URL}/search`,
      {
        params: {
          part: 'snippet',
          channelId: channelId,
          maxResults: maxResults,
          order: order,
          type: 'video',
          key: apiKey,
        },
      }
    );

    return response.data.items.map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail:
        item.snippet.thumbnails.maxres?.url ||
        item.snippet.thumbnails.high.url ||
        item.snippet.thumbnails.medium.url,
      publishedAt: item.snippet.publishedAt,
      channelTitle: item.snippet.channelTitle,
      description: item.snippet.description,
    }));
  } catch (error) {
    throw normalizeYouTubeError(error);
  }
};

/**
 * API 에러 메시지를 사용자 친화적으로 변환
 */
function normalizeYouTubeError(error: unknown): Error {
  if (!axios.isAxiosError(error) || !error.response) throw error instanceof Error ? error : new Error(String(error));
  const apiError = error.response.data as YouTubeAPIError | undefined;
  const msg = apiError?.error?.message ?? '';
  console.error('YouTube API 에러:', msg);
  if (msg.includes('Android client application') && msg.includes('blocked')) {
    return new Error(
      'YouTube API 키가 이 앱에서 차단되어 있습니다. Google Cloud Console → 사용자 인증 정보 → API 키 → 해당 키 → 애플리케이션 제한사항에서 "제한 없음"으로 두거나, Android 앱으로 제한한 경우 패키지명과 SHA-1을 추가해 주세요. (Expo Go 사용 시 패키지: host.exp.exponent)'
    );
  }
  if (msg.toLowerCase().includes('quota') || msg.toLowerCase().includes('daily limit') || msg.toLowerCase().includes('rate limit')) {
    return new Error('잠시 후 다시 시도해 주세요. (API 사용량 제한)');
  }
  return new Error(msg || '비디오를 불러오는데 실패했습니다.');
}

/**
 * 채널 내 비디오 검색
 * @param channelId YouTube 채널 ID
 * @param query 검색 쿼리
 * @param maxResults 가져올 최대 결과 수 (기본값: 50)
 * @param order 정렬 순서 (기본값: date)
 * @returns YouTubeVideo 배열
 */
export const searchChannelVideos = async (
  channelId: string,
  query: string,
  maxResults: number = API_CONFIG.maxResults,
  order: string = API_CONFIG.order
): Promise<YouTubeVideo[]> => {
  try {
    const apiKey = getApiKey();
    
    if (!apiKey) {
      throw new Error('YouTube API 키가 설정되지 않았습니다. .env 파일을 확인해주세요.');
    }

    const response = await axios.get<YouTubeSearchResponse>(
      `${YOUTUBE_API_BASE_URL}/search`,
      {
        params: {
          part: 'snippet',
          channelId: channelId,
          q: query,
          maxResults: maxResults,
          order: order,
          type: 'video',
          key: apiKey,
        },
      }
    );

    return response.data.items.map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail:
        item.snippet.thumbnails.maxres?.url ||
        item.snippet.thumbnails.high.url ||
        item.snippet.thumbnails.medium.url,
      publishedAt: item.snippet.publishedAt,
      channelTitle: item.snippet.channelTitle,
      description: item.snippet.description,
    }));
  } catch (error) {
    throw normalizeYouTubeError(error);
  }
};

/**
 * 비디오 ID로 단건 정보 조회 (videos.list)
 * @param videoId YouTube 비디오 ID
 * @returns title, description, publishedAt 또는 null
 */
export const getVideoById = async (
  videoId: string
): Promise<{ title: string; description: string; publishedAt: string } | null> => {
  try {
    const apiKey = getApiKey();
    if (!apiKey) {
      throw new Error('YouTube API 키가 설정되지 않았습니다. .env 파일을 확인해주세요.');
    }
    const response = await axios.get<YouTubeVideosListResponse>(
      `${YOUTUBE_API_BASE_URL}/videos`,
      {
        params: {
          part: 'snippet',
          id: videoId,
          key: apiKey,
        },
      }
    );
    const item = response.data.items?.[0];
    if (!item?.snippet) return null;
    const { title, description, publishedAt } = item.snippet;
    return { title, description: description ?? '', publishedAt: publishedAt ?? '' };
  } catch (error) {
    console.error('getVideoById:', error instanceof Error ? error.message : error);
    return null;
  }
};

/**
 * 날짜를 상대적 시간으로 변환
 * @param dateString ISO 8601 날짜 문자열
 * @returns 상대적 시간 문자열 (예: "2일 전", "1개월 전")
 */
export const getRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInYears > 0) {
    return `${diffInYears}년 전`;
  } else if (diffInMonths > 0) {
    return `${diffInMonths}개월 전`;
  } else if (diffInDays > 0) {
    return `${diffInDays}일 전`;
  } else if (diffInHours > 0) {
    return `${diffInHours}시간 전`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes}분 전`;
  } else {
    return '방금 전';
  }
};
