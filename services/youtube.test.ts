import axios from 'axios';
import Constants from 'expo-constants';
import {
  getChannelVideos,
  searchChannelVideos,
  getRelativeTime,
} from './youtube';

jest.mock('expo-constants', () => ({
  expoConfig: { extra: {} },
}));

jest.mock('axios', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    isAxiosError: (err: unknown) => Boolean((err as { isAxiosError?: boolean })?.isAxiosError),
  },
}));
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockSearchItems = [
  {
    id: { kind: 'youtube#video', videoId: 'vid1' },
    snippet: {
      title: 'Title 1',
      description: 'Desc 1',
      publishedAt: '2025-01-01T00:00:00Z',
      channelId: 'ch1',
      channelTitle: 'Channel',
      thumbnails: { high: { url: 'https://thumb1.jpg' }, medium: { url: 'https://thumb1m.jpg' } },
      liveBroadcastContent: 'none',
      publishTime: '2025-01-01T00:00:00Z',
    },
  },
];

beforeEach(() => {
  jest.clearAllMocks();
  (Constants.expoConfig as any).extra.YOUTUBE_API_KEY = 'test-key';
});

describe('getRelativeTime', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2025-01-15T12:00:00Z'));
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('returns "방금 전" for same minute', () => {
    expect(getRelativeTime('2025-01-15T11:59:30Z')).toBe('방금 전');
  });

  it('returns "n분 전" for minutes ago', () => {
    expect(getRelativeTime('2025-01-15T11:58:00Z')).toBe('2분 전');
    expect(getRelativeTime('2025-01-15T11:59:00Z')).toBe('1분 전');
  });

  it('returns "n시간 전" for hours ago', () => {
    expect(getRelativeTime('2025-01-15T10:00:00Z')).toBe('2시간 전');
  });

  it('returns "n일 전" for days ago', () => {
    expect(getRelativeTime('2025-01-14T12:00:00Z')).toBe('1일 전');
    expect(getRelativeTime('2025-01-13T12:00:00Z')).toBe('2일 전');
  });

  it('returns "n개월 전" for months ago', () => {
    expect(getRelativeTime('2024-12-15T12:00:00Z')).toBe('1개월 전');
  });

  it('returns "n년 전" for years ago', () => {
    expect(getRelativeTime('2024-01-15T12:00:00Z')).toBe('1년 전');
  });
});

describe('getChannelVideos', () => {
  it('throws when API key is not set', async () => {
    (Constants.expoConfig as any).extra.YOUTUBE_API_KEY = '';
    await expect(getChannelVideos('channelId')).rejects.toThrow(
      'YouTube API 키가 설정되지 않았습니다'
    );
  });

  it('returns mapped videos on success', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: { items: mockSearchItems },
    });
    const result = await getChannelVideos('ch1', 50, 'date');
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      id: 'vid1',
      title: 'Title 1',
      thumbnail: 'https://thumb1.jpg',
      publishedAt: '2025-01-01T00:00:00Z',
      channelTitle: 'Channel',
      description: 'Desc 1',
    });
    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining('/search'),
      expect.objectContaining({
        params: expect.objectContaining({
          channelId: 'ch1',
          key: 'test-key',
          order: 'date',
        }),
      })
    );
  });

  it('throws user-friendly message on Android blocked error', async () => {
    const err = {
      isAxiosError: true,
      response: {
        data: {
          error: {
            message: 'Requests from this Android client application <empty> are blocked.',
          },
        },
      },
    };
    mockedAxios.get.mockRejectedValueOnce(err);
    await expect(getChannelVideos('ch1')).rejects.toThrow(
      'YouTube API 키가 이 앱에서 차단되어 있습니다'
    );
  });

  it('throws quota message on quota exceeded', async () => {
    mockedAxios.get.mockRejectedValueOnce({
      isAxiosError: true,
      response: {
        data: {
          error: { message: 'The request cannot be completed because you have exceeded your quota.' },
        },
      },
    } as any);
    await expect(getChannelVideos('ch1')).rejects.toThrow(
      '잠시 후 다시 시도해 주세요. (API 사용량 제한)'
    );
  });

  it('throws generic message on other API error', async () => {
    mockedAxios.get.mockRejectedValueOnce({
      isAxiosError: true,
      response: {
        data: { error: { message: 'Invalid channel' } },
      },
    } as any);
    await expect(getChannelVideos('ch1')).rejects.toThrow('Invalid channel');
  });
});

describe('searchChannelVideos', () => {
  it('throws when API key is not set', async () => {
    (Constants.expoConfig as any).extra.YOUTUBE_API_KEY = '';
    await expect(searchChannelVideos('ch1', 'query')).rejects.toThrow(
      'YouTube API 키가 설정되지 않았습니다'
    );
  });

  it('returns mapped videos and passes query', async () => {
    mockedAxios.get.mockResolvedValueOnce({
      data: { items: mockSearchItems },
    });
    const result = await searchChannelVideos('ch1', 'test query', 50, 'date');
    expect(result).toHaveLength(1);
    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        params: expect.objectContaining({
          channelId: 'ch1',
          q: 'test query',
          key: 'test-key',
        }),
      })
    );
  });

  it('throws quota message on rate limit', async () => {
    mockedAxios.get.mockRejectedValueOnce({
      isAxiosError: true,
      response: {
        data: { error: { message: 'Rate Limit Exceeded' } },
      },
    } as any);
    await expect(searchChannelVideos('ch1', 'q')).rejects.toThrow(
      '잠시 후 다시 시도해 주세요'
    );
  });
});
