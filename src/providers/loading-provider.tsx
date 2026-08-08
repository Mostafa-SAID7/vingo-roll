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

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isStylesLoaded, setStylesLoaded] = useState(false);

  useEffect(() => {
    // Simulate styles loading or wait for actual style sheets
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
      setStylesLoaded(true);
    }, 800); // 800ms delay for styles to fully load

    // Also check for actual stylesheet loading
    const checkStylesLoaded = () => {
      const stylesheets = document.styleSheets;
      let allLoaded = true;

      for (let i = 0; i < stylesheets.length; i++) {
        try {
          if (!(stylesheets[i] as CSSStyleSheet).cssRules) {
            allLoaded = false;
            break;
          }
        } catch {
          allLoaded = false;
          break;
        }
      }

      if (allLoaded) {
        setIsInitialLoading(false);
        setStylesLoaded(true);
        clearTimeout(timer);
      }
    };

    const styleTimer = setInterval(checkStylesLoaded, 100);
    checkStylesLoaded();

    return () => {
      clearTimeout(timer);
      clearInterval(styleTimer);
    };
  }, []);

  return (
    <LoadingContext.Provider value={{ isInitialLoading, isStylesLoaded, setStylesLoaded }}>
      {children}
    </LoadingContext.Provider>
  );
}
