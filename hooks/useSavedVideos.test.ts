/**
 * @jest-environment jsdom
 */
import { renderHook, act, waitFor } from '@testing-library/react';
import { useSavedVideos } from './useSavedVideos';
import * as savedVideos from '../utils/savedVideos';
import type { SavedVideoItem } from '../utils/savedVideos';

jest.mock('expo-router', () => {
  return {
    useFocusEffect: (cb: () => void) => {
      const id = setTimeout(() => cb(), 0);
      return () => clearTimeout(id);
    },
  };
});

jest.mock('../utils/savedVideos', () => ({
  getSavedVideos: jest.fn(),
  addSavedVideo: jest.fn(),
  removeSavedVideo: jest.fn(),
}));

const mockGetSavedVideos = savedVideos.getSavedVideos as jest.MockedFunction<typeof savedVideos.getSavedVideos>;
const mockAddSavedVideo = savedVideos.addSavedVideo as jest.MockedFunction<typeof savedVideos.addSavedVideo>;
const mockRemoveSavedVideo = savedVideos.removeSavedVideo as jest.MockedFunction<typeof savedVideos.removeSavedVideo>;

const mockItem: SavedVideoItem = {
  id: 'v1',
  title: 'Title',
  thumbnail: 'https://t.jpg',
  publishedAt: '2025-01-01T00:00:00Z',
  description: 'Desc',
};

beforeEach(() => {
  jest.clearAllMocks();
  mockGetSavedVideos.mockResolvedValue([]);
  mockAddSavedVideo.mockResolvedValue([mockItem]);
  mockRemoveSavedVideo.mockResolvedValue([]);
});

describe('useSavedVideos', () => {
  it('loads list on mount via useFocusEffect', async () => {
    mockGetSavedVideos.mockResolvedValue([mockItem]);
    const { result } = renderHook(() => useSavedVideos());
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    expect(result.current.list).toEqual([mockItem]);
    expect(mockGetSavedVideos).toHaveBeenCalled();
  });

  it('add updates list', async () => {
    const { result } = renderHook(() => useSavedVideos());
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    await act(async () => {
      await result.current.add(mockItem);
    });
    expect(result.current.list).toEqual([mockItem]);
  });

  it('remove updates list', async () => {
    mockGetSavedVideos.mockResolvedValue([mockItem]);
    const { result } = renderHook(() => useSavedVideos());
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
    mockRemoveSavedVideo.mockResolvedValue([]);
    await act(async () => {
      await result.current.remove('v1');
    });
    expect(result.current.list).toEqual([]);
  });
});
