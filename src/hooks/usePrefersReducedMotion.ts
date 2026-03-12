import { useEffect, useState } from 'react';

const mediaQuery = '(prefers-reduced-motion: reduce)';
type LegacyMediaQueryList = MediaQueryList & {
  addListener?: (listener: (event: MediaQueryListEvent) => void) => void;
  removeListener?: (listener: (event: MediaQueryListEvent) => void) => void;
};

export const usePrefersReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(mediaQuery) as LegacyMediaQueryList;
    const onChange = () => setPrefersReducedMotion(media.matches);

    onChange();
    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', onChange);
    } else if (typeof media.addListener === 'function') {
      media.addListener(onChange);
    }

    return () => {
      if (typeof media.removeEventListener === 'function') {
        media.removeEventListener('change', onChange);
      } else if (typeof media.removeListener === 'function') {
        media.removeListener(onChange);
      }
    };
  }, []);

  return prefersReducedMotion;
};
