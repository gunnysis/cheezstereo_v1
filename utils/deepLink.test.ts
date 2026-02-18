import { getVideoIdFromDeepLink, DEEP_LINK_SCHEME } from './deepLink';

describe('getVideoIdFromDeepLink', () => {
  it('returns video id for valid cheezstereo://player/VIDEO_ID', () => {
    expect(getVideoIdFromDeepLink('cheezstereo://player/abc123')).toBe('abc123');
    expect(getVideoIdFromDeepLink('cheezstereo://player/dQw4w9WgXcQ')).toBe('dQw4w9WgXcQ');
  });

  it('returns first path segment when multiple segments', () => {
    expect(getVideoIdFromDeepLink('cheezstereo://player/abc123/extra')).toBe('abc123');
  });

  it('trims whitespace from id', () => {
    expect(getVideoIdFromDeepLink('cheezstereo://player/  abc  ')).toBe('abc');
  });

  it('returns null for wrong scheme', () => {
    expect(getVideoIdFromDeepLink('https://example.com/player/abc')).toBeNull();
    expect(getVideoIdFromDeepLink('other://player/abc')).toBeNull();
  });

  it('returns null for cheezstereo://player/ with no id', () => {
    expect(getVideoIdFromDeepLink('cheezstereo://player/')).toBeNull();
    expect(getVideoIdFromDeepLink('cheezstereo://player')).toBeNull();
  });

  it('uses DEEP_LINK_SCHEME constant', () => {
    expect(DEEP_LINK_SCHEME).toBe('cheezstereo');
  });
});
