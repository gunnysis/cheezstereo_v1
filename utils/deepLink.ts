export const DEEP_LINK_SCHEME = 'cheezstereo';

/** YouTube video ID: 11 chars, alphanumeric + - _ only. */
const YOUTUBE_ID_REGEX = /^[A-Za-z0-9_-]{11}$/;

function isValidYouTubeId(id: string): boolean {
  return typeof id === 'string' && YOUTUBE_ID_REGEX.test(id) && id.length === 11;
}

/**
 * Parse cheezstereo://player/VIDEO_ID and return VIDEO_ID, or null if invalid.
 * Validates VIDEO_ID format (11 chars, safe charset) for security.
 */
export function getVideoIdFromDeepLink(url: string): string | null {
  if (typeof url !== 'string' || !url.startsWith(DEEP_LINK_SCHEME + '://player/')) {
    return null;
  }
  const raw = url.slice((DEEP_LINK_SCHEME + '://player/').length).split('/')[0]?.trim() ?? '';
  const id = raw.split('?')[0];
  return isValidYouTubeId(id) ? id : null;
}
