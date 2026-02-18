export const DEEP_LINK_SCHEME = 'cheezstereo';

/**
 * Parse cheezstereo://player/VIDEO_ID and return VIDEO_ID, or null if invalid.
 */
export function getVideoIdFromDeepLink(url: string): string | null {
  const prefix = DEEP_LINK_SCHEME + '://player/';
  if (!url.startsWith(prefix)) return null;
  const id = url.slice(prefix.length).split('/')[0]?.trim();
  return id || null;
}
