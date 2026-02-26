import type { Album, CatalogVideo } from '../types/catalog';

export const ALBUMS: Album[] = [
  {
    id: 'dwbh',
    title: "Don't Work Be Happy!",
    year: 2009,
    type: 'album',
    coverColor: '#1a1a2e',
    tracks: [
      { id: 'dwbh-1',  title: 'Hello',                              youtubeId: 'SZGYCDFhLRE' }, // TODO: 가사 추가
      { id: 'dwbh-2',  title: 'The Good, The Bad and The President', youtubeId: 'QarvLnUlqW0' }, // TODO: 가사 추가
      { id: 'dwbh-3',  title: '난 어떡하라고',                       youtubeId: 'eeDwfm1GSfY' }, // TODO: 가사 추가
      { id: 'dwbh-4',  title: '동물해방전선',                         youtubeId: 'xIzXlo04SxE' }, // TODO: 가사 추가
      { id: 'dwbh-5',  title: '순서에 상관없이',                      youtubeId: 'mmxn7A47alI' }, // TODO: 가사 추가
      { id: 'dwbh-6',  title: 'Oh Yeah!',                           youtubeId: 'FnuTzUBh83U' }, // TODO: 가사 추가
      { id: 'dwbh-7',  title: '탁월한 선택',                          youtubeId: 'LZUuZLsp4yI' }, // TODO: 가사 추가
      { id: 'dwbh-8',  title: '산울림처럼 렛츠록',                    youtubeId: 'ZAoo1yv0124' }, // TODO: 가사 추가
      { id: 'dwbh-9',  title: '한밤의 에스프레소',                    youtubeId: '5EPS1rNAoeU' }, // TODO: 가사 추가
      { id: 'dwbh-10', title: 'Last Century Boys',                  youtubeId: 'x_Wn0__QIVI' }, // TODO: 가사 추가
      { id: 'dwbh-11', title: '파티엔 언제나 마지막 음악이 필요하다',  youtubeId: 'FfpWn-gEYVw' }, // TODO: 가사 추가
    ],
  },
  {
    id: 'rfm',
    title: '화성로맨스',
    year: 2011,
    type: 'single',
    coverColor: '#c1121f',
    tracks: [
      { id: 'rfm-1', title: '화성로맨스', youtubeId: '9ZmwKDr61ko' }, // TODO: 가사 추가
    ],
  },
  {
    id: 'twonights',
    title: 'TWO NIGHTs',
    year: 2012,
    type: 'single',
    coverColor: '#264653',
    tracks: [
      { id: 'twonights-1', title: '패션피플', youtubeId: 'OUz-lLRTDrE' }, // TODO: 가사 추가
      { id: 'twonights-2', title: '오늘밤',   youtubeId: 'Bq6VmqrBQoU' }, // TODO: 가사 추가
    ],
  },
  {
    id: 'lm',
    title: 'Lonely Man',
    year: 2013,
    type: 'ep',
    coverColor: '#7209b7',
    tracks: [
      { id: 'lm-1', title: '불타는 내마음', youtubeId: '2NsUz4EIa00' }, // TODO: 가사 추가
      { id: 'lm-2', title: 'Dance Now',    youtubeId: 'Cll0IODwrTE' }, // TODO: 가사 추가
    ],
  },
  {
    id: 'wg',
    title: '왜 그래',
    year: 2015,
    type: 'ep',
    coverColor: '#e63946',
    tracks: [
      { id: 'wg-1', title: '왜 그래',      youtubeId: '26r3Gq7UC8Q' }, // TODO: 가사 추가
      { id: 'wg-2', title: '유유히 흐르네', youtubeId: 'sAk-5vFhky4' }, // TODO: 가사 추가
      { id: 'wg-3', title: 'New',          youtubeId: '9WfDC5-oB2M' }, // TODO: 가사 추가
      { id: 'wg-4', title: '선샤인데이',    youtubeId: 'LIWBsM9Pw3s' }, // TODO: 가사 추가
    ],
  },
  {
    id: 'tj',
    title: '여행의 시간 / Brink',
    year: 2017,
    type: 'ep',
    coverColor: '#2a9d8f',
    tracks: [
      { id: 'tj-1', title: '여행의 시간', youtubeId: 'XDAXAqfrrAE' }, // TODO: 가사 추가
      { id: 'tj-2', title: 'Brink',       youtubeId: 'hxlM2_e3og8' }, // TODO: 가사 추가
    ],
  },
  {
    id: 'cca',
    title: 'Cosmic Comics Alarm',
    year: 2019,
    type: 'single',
    coverColor: '#4361ee',
    tracks: [
      { id: 'cca-1', title: 'Cosmic Comics Alarm', youtubeId: 'q9WZECfceCc' }, // TODO: 가사 추가
    ],
  },
];

export const VIDEOS: CatalogVideo[] = [
  // 뮤직비디오
  { id: 'Rc587Kr3gBs', title: '치즈스테레오 - Hello',                                      category: 'mv',        year: 2011 },
  { id: 'Z9NtXBWlcGU', title: '치즈스테레오 - 화성로맨스 M/V',                              category: 'mv',        year: 2011 },
  { id: 'OUz-lLRTDrE', title: '치즈스테레오 - 패션피플 M/V',                                category: 'mv',        year: 2012 },
  { id: 'Bq6VmqrBQoU', title: '치즈스테레오 - 오늘밤 M/V',                                  category: 'mv',        year: 2012 },
  { id: '2NsUz4EIa00', title: 'Cheezstereo - 불타는 내마음 (My Burning Heart)',             category: 'mv',        year: 2013 },
  { id: 'Cll0IODwrTE', title: 'Cheezstereo - Dance Now',                                  category: 'mv',        year: 2013 },
  { id: '26r3Gq7UC8Q', title: '[M/V] Cheezstereo - 왜 그래 (Why)',                        category: 'mv',        year: 2015 },
  { id: 'sAk-5vFhky4', title: '[M/V] 치즈스테레오 - 유유히 흐르네 (Like A Lazy River)',    category: 'mv',        year: 2015 },
  { id: 'XDAXAqfrrAE', title: '치즈스테레오 - 여행의 시간 [Lyric Video]',                   category: 'mv',        year: 2017 },
  { id: 'QVrCmYjP1y0', title: '치즈스테레오 - Dance Now [Official Audio]',                 category: 'mv',        year: 2019 },
  { id: 'q9WZECfceCc', title: 'Cosmic Comics Alarm',                                      category: 'mv',        year: 2019 },

  // 라이브
  { id: 'p1cXDEqlb-E', title: '치즈스테레오 - Yeah! 오예 [LIVE]',                          category: 'live',      year: 2014 },
  { id: 'cn0YIQPa49k', title: 'Sugar LIVE #5 : 치즈스테레오 - 한밤의 에스프레소',           category: 'live',      year: 2015 },
  { id: 'XbuJl4XV40c', title: '치즈스테레오 - 청춘파도 (클럽FF 라이브)',                     category: 'live',      year: 2015 },
  { id: '9fueW_KDFts', title: '치즈스테레오 - 화성로맨스 (클럽FF 라이브)',                   category: 'live',      year: 2015 },
  { id: '3CAoqazaig8', title: '치즈스테레오 - Eve (라이브)',                                category: 'live',      year: 2015 },
  { id: '71GmHx5x6Xo', title: '유유히 흐르네',                                             category: 'live',      year: 2015 },

  // 인터뷰
  { id: 'QTJXj9GCC2k', title: 'Cheezstereo (치즈스테레오) Interview @ Mirrorball',         category: 'interview', year: 2013 },
  { id: 'jt013pIODHE', title: '[오여홍2] 오여홍 늬우-스 ft. 치즈스테레오',                  category: 'interview', year: 2017 },
];
