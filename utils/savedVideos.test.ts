import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getSavedVideos,
  addSavedVideo,
  removeSavedVideo,
  isSaved,
  type SavedVideoItem,
} from './savedVideos';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

const mockedStorage = AsyncStorage as jest.Mocked<typeof AsyncStorage>;

const mockVideo: SavedVideoItem = {
  id: 'vid1',
  title: 'Test Video',
  thumbnail: 'https://thumb.jpg',
  publishedAt: '2025-01-01T00:00:00Z',
  description: 'Desc',
};

beforeEach(() => {
  jest.clearAllMocks();
  mockedStorage.getItem.mockResolvedValue(null);
  mockedStorage.setItem.mockResolvedValue(undefined as any);
});

describe('getSavedVideos', () => {
  it('returns empty array when key has no value', async () => {
    mockedStorage.getItem.mockResolvedValue(null);
    const result = await getSavedVideos();
    expect(result).toEqual([]);
  });

  it('returns empty array when stored value is invalid JSON', async () => {
    mockedStorage.getItem.mockResolvedValue('not json');
    const result = await getSavedVideos();
    expect(result).toEqual([]);
  });

  it('returns empty array when stored value is not an array', async () => {
    mockedStorage.getItem.mockResolvedValue('{"id":"x"}');
    const result = await getSavedVideos();
    expect(result).toEqual([]);
  });

  it('returns parsed array when valid JSON array is stored', async () => {
    const stored = JSON.stringify([mockVideo]);
    mockedStorage.getItem.mockResolvedValue(stored);
    const result = await getSavedVideos();
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(mockVideo);
  });
});

describe('addSavedVideo', () => {
  it('stores and returns new list when storage was empty', async () => {
    mockedStorage.getItem.mockResolvedValue(null);
    const result = await addSavedVideo(mockVideo);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual(mockVideo);
    expect(mockedStorage.setItem).toHaveBeenCalledWith(
      '@cheezstereo/saved_videos',
      JSON.stringify([mockVideo])
    );
  });

  it('does not duplicate when video id already exists', async () => {
    const existing = JSON.stringify([mockVideo]);
    mockedStorage.getItem.mockResolvedValue(existing);
    const result = await addSavedVideo(mockVideo);
    expect(result).toHaveLength(1);
    expect(mockedStorage.setItem).not.toHaveBeenCalled();
  });

  it('prepends new video to existing list', async () => {
    const existing = JSON.stringify([mockVideo]);
    mockedStorage.getItem
      .mockResolvedValueOnce(existing)
      .mockResolvedValueOnce(existing);
    const newVideo: SavedVideoItem = { ...mockVideo, id: 'vid2', title: 'Second' };
    const result = await addSavedVideo(newVideo);
    expect(result).toHaveLength(2);
    expect(result[0].id).toBe('vid2');
    expect(result[1].id).toBe('vid1');
  });
});

describe('removeSavedVideo', () => {
  it('removes video by id and returns updated list', async () => {
    const list = [mockVideo, { ...mockVideo, id: 'vid2', title: 'Two' }];
    mockedStorage.getItem.mockReset();
    mockedStorage.getItem.mockResolvedValue(JSON.stringify(list));
    const result = await removeSavedVideo('vid1');
    expect(mockedStorage.getItem).toHaveBeenCalledWith('@cheezstereo/saved_videos');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('vid2');
    expect(mockedStorage.setItem).toHaveBeenCalledWith(
      '@cheezstereo/saved_videos',
      JSON.stringify(result)
    );
  });

  it('returns same list when video id not found', async () => {
    const list = [mockVideo];
    mockedStorage.getItem.mockResolvedValue(JSON.stringify(list));
    const result = await removeSavedVideo('nonexistent');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe('vid1');
  });
});

describe('isSaved', () => {
  it('returns true when video id is in list', async () => {
    mockedStorage.getItem.mockResolvedValue(JSON.stringify([mockVideo]));
    const result = await isSaved('vid1');
    expect(result).toBe(true);
  });

  it('returns false when storage is empty', async () => {
    mockedStorage.getItem.mockResolvedValue(null);
    const result = await isSaved('vid1');
    expect(result).toBe(false);
  });

  it('returns false when video id is not in list', async () => {
    mockedStorage.getItem.mockResolvedValue(JSON.stringify([mockVideo]));
    const result = await isSaved('other');
    expect(result).toBe(false);
  });
});
