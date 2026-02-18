/**
 * @jest-environment jsdom
 */
import { renderHook, act, waitFor } from '@testing-library/react';
import { useChannelVideos } from './useChannelVideos';
import * as youtube from '../services/youtube';

jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(() => jest.fn()),
  fetch: jest.fn(() => Promise.resolve({ isConnected: true })),
}));

jest.mock('../services/youtube', () => ({
  getChannelVideos: jest.fn(),
  searchChannelVideos: jest.fn(),
}));

const mockGetChannelVideos = youtube.getChannelVideos as jest.MockedFunction<typeof youtube.getChannelVideos>;
const mockSearchChannelVideos = youtube.searchChannelVideos as jest.MockedFunction<typeof youtube.searchChannelVideos>;

beforeEach(() => {
  jest.clearAllMocks();
  mockGetChannelVideos.mockResolvedValue([]);
  mockSearchChannelVideos.mockResolvedValue([]);
});

describe('useChannelVideos', () => {
  it('starts with loading true and empty videos', () => {
    mockGetChannelVideos.mockImplementation(() => new Promise(() => {}));
    const { result } = renderHook(() => useChannelVideos({ channelId: 'ch1' }));
    expect(result.current.loading).toBe(true);
    expect(result.current.videos).toEqual([]);
  });

  it('loads videos on mount and sets loading false', async () => {
    const mockVideos = [
      {
        id: 'v1',
        title: 'T1',
        thumbnail: 'https://t1.jpg',
        publishedAt: '2025-01-01T00:00:00Z',
        channelTitle: 'Ch',
        description: 'D',
      },
    ];
    mockGetChannelVideos.mockResolvedValue(mockVideos);
    const { result } = renderHook(() => useChannelVideos({ channelId: 'ch1' }));
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.videos).toEqual(mockVideos);
    expect(mockGetChannelVideos).toHaveBeenCalledWith('ch1', 50, 'date');
  });

  it('sets error and clears videos when fetch fails', async () => {
    mockGetChannelVideos.mockRejectedValue(new Error('Network error'));
    const { result } = renderHook(() => useChannelVideos({ channelId: 'ch1' }));
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.error).toBe('Network error');
    expect(result.current.videos).toEqual([]);
  });

  it('handleRetry calls refetch', async () => {
    mockGetChannelVideos.mockResolvedValue([]);
    const { result } = renderHook(() => useChannelVideos({ channelId: 'ch1' }));
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    mockGetChannelVideos.mockClear();
    act(() => {
      result.current.handleRetry();
    });
    await waitFor(() => {
      expect(mockGetChannelVideos).toHaveBeenCalled();
    });
  });
});
