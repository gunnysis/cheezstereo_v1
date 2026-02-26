/** 앨범 발매 형태 */
export type AlbumType = 'album' | 'ep' | 'single';

/** 앨범 수록곡 */
export interface Track {
  readonly id: string;
  readonly title: string;
  /** YouTube 영상 ID. undefined이면 YouTube에서 미제공 (잠금 표시). */
  readonly youtubeId?: string;
  /** 가사. undefined이면 플레이어에 가사 섹션 미표시. */
  readonly lyrics?: string;
}

/** 앨범 / EP / 싱글 */
export interface Album {
  readonly id: string;
  readonly title: string;
  readonly year: number;
  readonly type: AlbumType;
  /** 앨범 커버 플레이스홀더 색상 (실제 아트워크 파일 없음) */
  readonly coverColor: string;
  readonly tracks: readonly Track[];
}

/** 영상 카테고리 */
export type VideoCategory = 'mv' | 'live' | 'interview';

/** 정적 카탈로그 영상 항목 */
export interface CatalogVideo {
  /** YouTube 영상 ID */
  readonly id: string;
  readonly title: string;
  readonly category: VideoCategory;
  readonly year: number;
}
