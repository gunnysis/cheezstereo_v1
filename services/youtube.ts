import axios from 'axios';
import Constants from 'expo-constants';
import {
  YouTubeVideo,
  YouTubeSearchResponse,
  YouTubeAPIError,
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
    if (axios.isAxiosError(error) && error.response) {
      const apiError = error.response.data as YouTubeAPIError;
      console.error('YouTube API 에러:', apiError.error.message);
      throw new Error(apiError.error.message);
    }
    throw error;
  }
};

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
    if (axios.isAxiosError(error) && error.response) {
      const apiError = error.response.data as YouTubeAPIError;
      console.error('YouTube API 에러:', apiError.error.message);
      throw new Error(apiError.error.message);
    }
    throw error;
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
