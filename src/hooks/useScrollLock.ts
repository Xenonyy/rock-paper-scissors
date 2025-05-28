import { useEffect } from 'react';

export const useScrollLock = (enabled: boolean) => {
  useEffect(() => {
    if (!enabled) return;

    const scrollY = window.scrollY;
    const body = document.body;

    body.style.setProperty('--st', `-${scrollY}px`);
    body.classList.add('noscroll');

    return () => {
      body.classList.remove('noscroll');
      body.style.removeProperty('--st');

      window.scrollTo(0, scrollY);
    };
  }, [enabled]);
};
