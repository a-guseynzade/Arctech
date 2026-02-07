import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Minimum display time (ms) for preloader.
 * Matches progress bar animation (2s) + buffer for visual polish.
 */
const MIN_DISPLAY_TIME_MS = 2400;

/**
 * Maximum wait time (ms) before forcing completion.
 * Safety net for hung assets.
 */
const MAX_WAIT_TIME_MS = 6000;

/**
 * Headless preloader state management hook.
 *
 * Features:
 * - Waits for window.load OR fallback timeout
 * - Guarantees minimum display time for UX consistency
 * - Includes scroll lock management
 * - Self-cleaning timers
 *
 * @returns {{ isLoading: boolean }}
 */
export function usePreloader() {
  const [isLoading, setIsLoading] = useState(true);
  const hasCompletedRef = useRef(false);
  const timerRef = useRef(null);
  const mountTimeRef = useRef(performance.now());

  const completeLoading = useCallback(() => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;

    const elapsed = performance.now() - mountTimeRef.current;
    const remainingTime = Math.max(0, MIN_DISPLAY_TIME_MS - elapsed);

    timerRef.current = setTimeout(() => {
      setIsLoading(false);
    }, remainingTime);
  }, []);

  // Page load detection
  useEffect(() => {
    if (document.readyState === 'complete') {
      completeLoading();
      return;
    }

    window.addEventListener('load', completeLoading);
    const fallbackTimer = setTimeout(completeLoading, MAX_WAIT_TIME_MS);

    return () => {
      window.removeEventListener('load', completeLoading);
      clearTimeout(fallbackTimer);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [completeLoading]);

  // Scroll lock during loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  return { isLoading };
}
