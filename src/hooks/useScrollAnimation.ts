import { useEffect, useRef, useState } from 'react';
import { useInView, type Variants } from 'framer-motion';

interface ScrollAnimationOptions {
  threshold?: number;
  triggerOnce?: boolean;
  rootMargin?: string;
}

export function useScrollAnimation<T extends HTMLElement = HTMLElement>(options: ScrollAnimationOptions = {}) {
  const {
    threshold = 0.1,
    triggerOnce = true,
  } = options;

  const ref = useRef<T>(null);
  const isInView = useInView(ref, {
    once: triggerOnce,
    amount: threshold,
  });

  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  return {
    ref,
    isInView,
    hasAnimated,
    shouldAnimate: triggerOnce ? hasAnimated : isInView,
  };
}

// Staggered children animation hook
export function useStaggeredAnimation<T extends HTMLElement = HTMLElement>(
  _childCount: number,
  options: ScrollAnimationOptions & { staggerDelay?: number } = {}
) {
  const { staggerDelay = 0.1, ...scrollOptions } = options;
  const { ref, shouldAnimate } = useScrollAnimation<T>(scrollOptions);

  const getChildVariants = (index: number): Variants => ({
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: shouldAnimate ? index * staggerDelay : 0,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  });

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  return {
    ref,
    shouldAnimate,
    containerVariants,
    getChildVariants,
    animate: shouldAnimate ? 'visible' : 'hidden',
  };
}

// Specialized hook for section entrance animations
export function useSectionAnimation<T extends HTMLElement = HTMLElement>(animationType: 'fade' | 'slide' | 'scale' | 'bounce' = 'fade') {
  const { ref, shouldAnimate } = useScrollAnimation<T>({
    threshold: 0.2,
    triggerOnce: true,
  });

  const variants: Record<string, Variants> = {
    fade: {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { duration: 0.8, ease: 'easeOut' as const }
      },
    },
    slide: {
      hidden: { opacity: 0, y: 50 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }
      },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { 
        opacity: 1, 
        scale: 1,
        transition: { duration: 0.6, ease: 'easeOut' as const }
      },
    },
    bounce: {
      hidden: { opacity: 0, y: 50, scale: 0.9 },
      visible: { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        transition: { 
          duration: 0.8, 
          ease: [0.25, 0.46, 0.45, 0.94] as const,
          type: 'spring' as const,
          stiffness: 100,
          damping: 15
        }
      },
    },
  };

  return {
    ref,
    shouldAnimate,
    variants: variants[animationType],
    animate: shouldAnimate ? 'visible' : 'hidden',
    initial: 'hidden',
  };
}