import { useState, useEffect } from 'react';

export const useVideoPlayer = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isFloating, setIsFloating] = useState(false);

  useEffect(() => {
    return () => {
      const orientation = screen.orientation as any;
      if (orientation && orientation.unlock) {
        try { orientation.unlock(); } catch (e) {}
      }
    };
  }, []);

  const toggleFullScreen = async () => {
    if (isFloating) setIsFloating(false);
    const nextState = !isFullScreen;
    setIsFullScreen(nextState);
    
    // Attempt to lock orientation on mobile
    if (nextState && typeof window !== 'undefined' && window.innerWidth < 1024) {
      try {
        const orientation = screen.orientation as any;
        if (orientation && orientation.lock) {
          await orientation.lock('landscape');
        }
      } catch (e) {
        console.warn('Orientation lock failed:', e);
      }
    } else {
      try {
        const orientation = screen.orientation as any;
        if (orientation && orientation.unlock) {
          orientation.unlock();
        }
      } catch (e) {}
    }
  };

  const toggleFloating = () => {
    if (isFullScreen) setIsFullScreen(false);
    setIsFloating(!isFloating);
  };

  return {
    isFullScreen,
    setIsFullScreen,
    isFloating,
    setIsFloating,
    toggleFullScreen,
    toggleFloating
  };
};
