/**
 * Motion utilities for animations and transitions
 * Centralized animation configuration and helpers
 */

import { MOTION_DURATION, MOTION_EASING } from "./constants";

// ============================================================================
// ANIMATION TIMING PRESETS
// ============================================================================

export const ANIMATION_PRESETS = {
  FADE_IN: {
    duration: MOTION_DURATION.NORMAL,
    easing: MOTION_EASING.OUT,
    className: "fade-in",
  },
  FADE_OUT: {
    duration: MOTION_DURATION.NORMAL,
    easing: MOTION_EASING.IN,
    className: "fade-out",
  },
  SLIDE_IN_UP: {
    duration: MOTION_DURATION.NORMAL,
    easing: MOTION_EASING.OUT,
    className: "slide-in-up",
  },
  SLIDE_OUT_DOWN: {
    duration: MOTION_DURATION.NORMAL,
    easing: MOTION_EASING.IN,
    className: "slide-out-down",
  },
  SCALE_IN: {
    duration: MOTION_DURATION.NORMAL,
    easing: MOTION_EASING.OUT,
    className: "scale-in",
  },
  SCALE_OUT: {
    duration: MOTION_DURATION.NORMAL,
    easing: MOTION_EASING.IN,
    className: "scale-out",
  },
  BOUNCE_IN: {
    duration: MOTION_DURATION.SLOW,
    easing: MOTION_EASING.EASE_OUT_BACK,
    className: "bounce-in",
  },
} as const;

// ============================================================================
// TRANSITION UTILITIES
// ============================================================================

export function getTransitionStyle(
  properties: string | string[] = "all",
  duration: number = MOTION_DURATION.NORMAL,
  easing: string = MOTION_EASING.OUT,
  delay: number = 0,
): Record<string, string> {
  const propString = Array.isArray(properties) ? properties.join(", ") : properties;

  return {
    transition: `${propString} ${duration}ms ${easing}`,
    ...(delay > 0 && { transitionDelay: `${delay}ms` }),
  };
}

export function getAnimationStyle(
  animation: string,
  duration: number = MOTION_DURATION.NORMAL,
  easing: string = MOTION_EASING.OUT,
  delay: number = 0,
  iterationCount: number | string = 1,
): Record<string, string> {
  return {
    animation: `${animation} ${duration}ms ${easing} ${delay}ms ${iterationCount}`,
    animationFillMode: "forwards",
  };
}

// ============================================================================
// DURATION HELPERS
// ============================================================================

export const getDuration = {
  fast: () => MOTION_DURATION.FAST,
  normal: () => MOTION_DURATION.NORMAL,
  slow: () => MOTION_DURATION.SLOW,
  verySlow: () => MOTION_DURATION.VERY_SLOW,
  custom: (ms: number) => Math.max(0, Math.min(ms, 5000)), // Clamp between 0-5s
  scale: (factor: number = 1) => Math.round(MOTION_DURATION.NORMAL * factor),
} as const;

// ============================================================================
// EASING HELPERS
// ============================================================================

export const getEasing = {
  linear: () => MOTION_EASING.LINEAR,
  in: () => MOTION_EASING.IN,
  out: () => MOTION_EASING.OUT,
  inOut: () => MOTION_EASING.IN_OUT,
  outExpo: () => MOTION_EASING.EASE_OUT_EXPO,
  outBack: () => MOTION_EASING.EASE_OUT_BACK,
} as const;

// ============================================================================
// STAGGER & DELAY HELPERS
// ============================================================================

export function getStaggerDelay(
  index: number,
  baseDelay: number = 0,
  stepDelay: number = 50,
): number {
  return baseDelay + index * stepDelay;
}

export function getSequentialDelays(
  count: number,
  baseDelay: number = 0,
  stepDelay: number = 50,
): number[] {
  return Array.from({ length: count }, (_, i) => getStaggerDelay(i, baseDelay, stepDelay));
}

// ============================================================================
// REDUCED MOTION SUPPORT
// ============================================================================

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function getRespectfulDuration(duration: number): number {
  return prefersReducedMotion() ? 0 : duration;
}

export function getRespectfulTransitionStyle(
  properties: string | string[] = "all",
  duration: number = MOTION_DURATION.NORMAL,
  easing: string = MOTION_EASING.OUT,
  delay: number = 0,
): Record<string, string> {
  const actualDuration = getRespectfulDuration(duration);
  return getTransitionStyle(properties, actualDuration, easing, delay);
}

// ============================================================================
// KEYFRAME GENERATORS
// ============================================================================

export function createFadeKeyframes(): string {
  return `
    @keyframes fade-in {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes fade-out {
      from { opacity: 1; }
      to { opacity: 0; }
    }
  `;
}

export function createSlideKeyframes(): string {
  return `
    @keyframes slide-in-up {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes slide-out-down {
      from { opacity: 1; transform: translateY(0); }
      to { opacity: 0; transform: translateY(20px); }
    }
  `;
}

export function createScaleKeyframes(): string {
  return `
    @keyframes scale-in {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
    @keyframes scale-out {
      from { opacity: 1; transform: scale(1); }
      to { opacity: 0; transform: scale(0.95); }
    }
  `;
}

export function createBounceKeyframes(): string {
  return `
    @keyframes bounce-in {
      0% { opacity: 0; transform: scale(0.3); }
      50% { opacity: 1; transform: scale(1.05); }
      70% { transform: scale(0.9); }
      100% { transform: scale(1); }
    }
  `;
}

// ============================================================================
// ANIMATION PROMISE (async animations)
// ============================================================================

export function animateElement(
  element: Element | null,
  animation: string,
  duration: number = MOTION_DURATION.NORMAL,
  easing: string = MOTION_EASING.OUT,
): Promise<void> {
  if (!element) return Promise.resolve();

  return new Promise((resolve) => {
    const cleanup = () => {
      element.removeEventListener("animationend", cleanup);
      element.removeEventListener("transitionend", cleanup);
    };

    element.addEventListener("animationend", cleanup);
    element.addEventListener("transitionend", cleanup);

    // Apply animation
    const style = element as HTMLElement;
    style.style.animation = `${animation} ${duration}ms ${easing}`;

    // Timeout fallback (in case events don't fire)
    const timeoutId = setTimeout(() => {
      cleanup();
      resolve();
    }, duration + 50);

    // Resolve on animation end
    const onEnd = () => {
      clearTimeout(timeoutId);
      cleanup();
      resolve();
    };

    element.addEventListener("animationend", onEnd, { once: true });
  });
}

// ============================================================================
// SPRING ANIMATION CONFIG (for libraries like Framer Motion)
// ============================================================================

export const SPRING_PRESETS = {
  GENTLE: {
    stiffness: 100,
    damping: 15,
    mass: 1,
  },
  BOUNCY: {
    stiffness: 300,
    damping: 10,
    mass: 0.5,
  },
  SNAPPY: {
    stiffness: 150,
    damping: 20,
    mass: 1,
  },
  SLOW: {
    stiffness: 50,
    damping: 20,
    mass: 1,
  },
} as const;

// ============================================================================
// PAGE TRANSITION HELPERS
// ============================================================================

export const PAGE_TRANSITIONS = {
  FADE: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: getDuration.normal() / 1000 },
  },
  SLIDE_UP: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: getDuration.normal() / 1000 },
  },
  SCALE: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: getDuration.normal() / 1000 },
  },
} as const;
