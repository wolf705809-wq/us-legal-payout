'use client';

import { useState, useEffect, useRef } from 'react';

const SESSION_FLAG = 'exit_intent_shown';

interface UseExitIntentOptions {
  /** Minimum time (ms) on page before the popup can fire. Default: 15000 */
  minTimeMs?: number;
  /** Disable the hook entirely (e.g. on /calculator). Default: false */
  disabled?: boolean;
}

interface UseExitIntentReturn {
  shouldShow: boolean;
  dismiss: () => void;
}

export function useExitIntent({
  minTimeMs = 15_000,
  disabled = false,
}: UseExitIntentOptions = {}): UseExitIntentReturn {
  const [shouldShow, setShouldShow] = useState(false);
  const readyRef = useRef(false);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(0);

  const dismiss = () => {
    setShouldShow(false);
    if (typeof window !== 'undefined') {
      try { sessionStorage.setItem(SESSION_FLAG, '1'); } catch { /* noop */ }
    }
  };

  useEffect(() => {
    if (disabled) return;
    if (typeof window === 'undefined') return;

    // Already shown this session
    try {
      if (sessionStorage.getItem(SESSION_FLAG)) return;
    } catch { /* noop */ }

    // Arm after minTimeMs
    const timer = setTimeout(() => { readyRef.current = true; }, minTimeMs);

    const trigger = () => {
      if (!readyRef.current) return;
      try { if (sessionStorage.getItem(SESSION_FLAG)) return; } catch { /* noop */ }
      setShouldShow(true);
      try { sessionStorage.setItem(SESSION_FLAG, '1'); } catch { /* noop */ }
    };

    // ── Desktop: mouse leaves viewport through the top ──
    const onMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 20) trigger();
    };

    // ── Mobile: tab becomes hidden ──
    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') trigger();
    };

    // ── Mobile: fast scroll-up (150px in 300ms) ──
    const onScroll = () => {
      const now = Date.now();
      const currentY = window.scrollY;
      const delta = lastScrollY.current - currentY; // positive = scrolled up
      if (delta > 150 && now - lastScrollTime.current < 300) {
        trigger();
      }
      lastScrollY.current = currentY;
      lastScrollTime.current = now;
    };

    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('scroll', onScroll);
    };
  }, [disabled, minTimeMs]);

  return { shouldShow, dismiss };
}
