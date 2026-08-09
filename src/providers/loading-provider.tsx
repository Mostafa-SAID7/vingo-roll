import React, { createContext, useContext, useState, useEffect } from "react";

interface LoadingContextType {
  isInitialLoading: boolean;
  isStylesLoaded: boolean;
  setStylesLoaded: (loaded: boolean) => void;
}

const LoadingContext = createContext<LoadingContextType>({
  isInitialLoading: true,
  isStylesLoaded: false,
  setStylesLoaded: () => {},
});

export function useLoadingState() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoadingState must be used within LoadingProvider");
  }
  return context;
}

/** Minimum time the shimmer overlay stays visible so it never flashes. */
const MIN_DURATION = 900;
/** Hard cap so the overlay can never get stuck. */
const MAX_DURATION = 4000;

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isStylesLoaded, setStylesLoaded] = useState(false);

  useEffect(() => {
    const start = performance.now();
    let done = false;

    const finish = () => {
      if (done) return;
      done = true;
      const elapsed = performance.now() - start;
      const wait = Math.max(0, MIN_DURATION - elapsed);
      window.setTimeout(() => {
        setIsInitialLoading(false);
        setStylesLoaded(true);
      }, wait);
    };

    // Wait for fonts + window load (styles, hero imagery), whichever resolves.
    const ready: Promise<unknown>[] = [];
    if (typeof document !== "undefined" && "fonts" in document) {
      ready.push(document.fonts.ready.catch(() => undefined));
    }
    ready.push(
      document.readyState === "complete"
        ? Promise.resolve()
        : new Promise<void>((resolve) => window.addEventListener("load", () => resolve(), { once: true })),
    );

    void Promise.all(ready).then(finish);

    const failsafe = window.setTimeout(finish, MAX_DURATION);
    return () => window.clearTimeout(failsafe);
  }, []);

  return (
    <LoadingContext.Provider value={{ isInitialLoading, isStylesLoaded, setStylesLoaded }}>
      {children}
    </LoadingContext.Provider>
  );
}
