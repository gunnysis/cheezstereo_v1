import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

export interface CurrentVideo {
  id: string;
  title: string;
  publishedAt?: string;
  description?: string;
}

interface PlayerContextValue {
  currentVideo: CurrentVideo | null;
  setCurrentVideo: (video: CurrentVideo | null) => void;
  clearCurrentVideo: () => void;
}

const PlayerContext = createContext<PlayerContextValue>({
  currentVideo: null,
  setCurrentVideo: () => {},
  clearCurrentVideo: () => {},
});

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [currentVideo, setCurrentVideoState] = useState<CurrentVideo | null>(null);

  const setCurrentVideo = useCallback((video: CurrentVideo | null) => {
    setCurrentVideoState(video);
  }, []);
  const clearCurrentVideo = useCallback(() => {
    setCurrentVideoState(null);
  }, []);

  const value = useMemo(
    () => ({ currentVideo, setCurrentVideo, clearCurrentVideo }),
    [currentVideo, setCurrentVideo, clearCurrentVideo],
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer() {
  return useContext(PlayerContext);
}
