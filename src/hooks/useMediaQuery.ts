import { useEffect, useState } from 'react';

export const SMALL_SCREEN_WIDTH = 700;

export const useMediaQuery = (query: string) => {
  const mediaMatch: MediaQueryList = window.matchMedia(query);
  const [matches, setMatches] = useState<boolean>(mediaMatch.matches);

  useEffect(() => {
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mediaMatch.addEventListener('change', handler);
    return () => mediaMatch.removeEventListener('change', handler);
  });

  return matches;
};
