import { useEffect, useState } from "react";

import { useLoadingState } from "@/providers/loading-provider";
import { cn } from "@/lib/utils";

export function LoadingOverlay() {
  const { isInitialLoading } = useLoadingState();
  const [mounted, setMounted] = useState(true);

  // Unmount after the fade-out so the overlay never blocks the page.
  useEffect(() => {
    if (isInitialLoading) {
      setMounted(true);
      return;
    }
    const t = window.setTimeout(() => setMounted(false), 600);
    return () => window.clearTimeout(t);
  }, [isInitialLoading]);

  if (!mounted) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-hidden={!isInitialLoading}
      className={cn(
        "fixed inset-0 z-[200] flex items-center justify-center px-6",
        "bg-background transition-opacity duration-500",
        isInitialLoading ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      {/* Ambient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="animate-shimmer-bg absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/10 to-primary/5" />
        <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-primary/10 to-accent/15 blur-3xl sm:h-96 sm:w-96" />
      </div>

      {/* Loading content */}
      <div className="relative z-10 flex w-full max-w-xs flex-col items-center gap-5 sm:max-w-sm sm:gap-6">
        {/* Triple-ring spinner */}
        <div className="relative h-14 w-14 sm:h-20 sm:w-20">
          <div
            className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-primary border-r-accent/50"
            style={{ animationDuration: "2.5s" }}
          />
          <div
            className="absolute inset-2 animate-spin rounded-full border-2 border-transparent border-b-accent border-l-primary/50 sm:inset-3"
            style={{ animationDuration: "3s", animationDirection: "reverse" }}
          />
          <div className="absolute inset-5 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 blur-sm sm:inset-6" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-primary to-accent sm:h-3 sm:w-3" />
          </div>
        </div>

        <div className="space-y-1.5 text-center">
          <p className="font-display text-base tracking-wide text-foreground sm:text-lg">
            Vingo Roll
          </p>
          <p className="text-xs text-muted-foreground sm:text-sm">Preparing your experience</p>
        </div>

        {/* Progress shimmer bar */}
        <div className="h-1.5 w-full max-w-[16rem] overflow-hidden rounded-full bg-muted">
          <div className="animate-shimmer-bg h-full w-full rounded-full bg-gradient-to-r from-transparent via-primary to-transparent" />
        </div>
      </div>
    </div>
  );
}
