import {
  YOUTUBE_CHANNELS,
  YOUTUBE_URLS,
  API_CONFIG,
  SORT_OPTIONS,
} from './youtube';

describe('constants/youtube', () => {
  describe('YOUTUBE_CHANNELS', () => {
    it('has music and videos channel ids', () => {
      expect(YOUTUBE_CHANNELS.music).toBeDefined();
      expect(YOUTUBE_CHANNELS.videos).toBeDefined();
      expect(typeof YOUTUBE_CHANNELS.music).toBe('string');
      expect(YOUTUBE_CHANNELS.music.length).toBeGreaterThan(0);
    });
  });

  describe('YOUTUBE_URLS', () => {
    it('music() returns YouTube Music watch URL with video id', () => {
      const url = YOUTUBE_URLS.music('abc123');
      expect(url).toBe('https://music.youtube.com/watch?v=abc123');
    });

    it('video() returns YouTube watch URL with video id', () => {
      const url = YOUTUBE_URLS.video('xyz789');
      expect(url).toBe('https://www.youtube.com/watch?v=xyz789');
    });

    it('musicChannel is a string URL', () => {
      expect(YOUTUBE_URLS.musicChannel).toMatch(/^https:\/\//);
      expect(YOUTUBE_URLS.musicChannel).toContain('music.youtube.com');
    });

    it('videoChannel is a string URL', () => {
      expect(YOUTUBE_URLS.videoChannel).toMatch(/^https:\/\//);
      expect(YOUTUBE_URLS.videoChannel).toContain('youtube.com');
    });
  });

  describe('API_CONFIG', () => {
    it('has maxResults and order', () => {
      expect(API_CONFIG.maxResults).toBe(50);
      expect(['date', 'viewCount', 'relevance', 'title']).toContain(API_CONFIG.order);
    });
  });

  describe('SORT_OPTIONS', () => {
    it('has label and value for each option', () => {
      expect(SORT_OPTIONS.length).toBeGreaterThan(0);
      SORT_OPTIONS.forEach((opt) => {
        expect(opt.label).toBeDefined();
        expect(opt.value).toBeDefined();
      });
    });

    it('includes date, viewCount, relevance, title', () => {
      const values = SORT_OPTIONS.map((o) => o.value);
      expect(values).toContain('date');
      expect(values).toContain('viewCount');
      expect(values).toContain('relevance');
      expect(values).toContain('title');
    });
  });
});
