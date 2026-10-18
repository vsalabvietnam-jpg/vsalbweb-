import { useEffect, useRef, useState } from 'react';

export interface ParallaxOptions {
  speed?: number; // movement factor relative to scroll; default ~0.12
  maxOffset?: number; // max pixel shift; default ~25px
  scale?: number; // slight scale to prevent revealing edges during translation; default ~1.08
  disabled?: boolean;
}

export function useParallax<T extends HTMLElement = HTMLDivElement>(options: ParallaxOptions = {}) {
  const { speed = 0.12, maxOffset = 25, scale = 1.08, disabled = false } = options;
  const ref = useRef<T>(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    if (disabled) return;

    // Respect prefers-reduced-motion for accessibility
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let ticking = false;

    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight || 800;

      // Only calculate if visible on screen or near viewport
      if (rect.bottom >= -150 && rect.top <= windowHeight + 150) {
        const elementCenter = rect.top + rect.height / 2;
        const screenCenter = windowHeight / 2;
        // Range roughly from -1 (at top) to +1 (at bottom of screen)
        const progress = (elementCenter - screenCenter) / (windowHeight / 2);
        
        // Gentle translation: moves slightly opposite to scroll direction
        const rawOffset = progress * speed * -60;
        const clampedOffset = Math.max(-maxOffset, Math.min(maxOffset, rawOffset));
        setOffsetY(clampedOffset);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    // Initial calculation on mount
    handleScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [speed, maxOffset, disabled]);

  return {
    ref,
    offsetY,
    style: {
      transform: `translate3d(0, ${offsetY.toFixed(2)}px, 0) scale(${scale})`,
      willChange: 'transform',
    },
  };
}
