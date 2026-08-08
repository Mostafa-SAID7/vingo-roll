import { useLoadingState } from "@/providers/loading-provider";
import { cn } from "@/lib/utils";

export function LoadingOverlay() {
  const { isInitialLoading } = useLoadingState();

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center",
        "bg-gradient-to-br from-background via-background to-accent/5",
        "transition-all duration-500 pointer-events-none",
        isInitialLoading ? "opacity-100 backdrop-blur-sm" : "opacity-0 backdrop-blur-0",
      )}
      aria-hidden={!isInitialLoading}
      style={{
        pointerEvents: isInitialLoading ? "auto" : "none",
      }}
    >
      {/* Animated gradient background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 animate-shimmer" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/10 to-accent/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Loading content */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Animated triple-ring spinner */}
        <div className="relative w-20 h-20">
          {/* Outer ring */}
          <div
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary border-r-accent/50 animate-spin"
            style={{ animationDuration: "2.5s" }}
          />
          {/* Middle ring */}
          <div
            className="absolute inset-3 rounded-full border-3 border-transparent border-b-accent border-l-primary/50 animate-spin"
            style={{ animationDuration: "3s", animationDirection: "reverse" }}
          />
          {/* Inner glow */}
          <div className="absolute inset-6 rounded-full bg-gradient-to-br from-primary/40 to-accent/40 blur-sm animate-pulse" />
          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-primary to-accent shadow-lg shadow-primary/50" />
          </div>
        </div>

        {/* Loading text with staggered animation */}
        <div className="text-center space-y-2">
          <p className="text-base font-semibold text-foreground tracking-wide">
            Loading your experience
          </p>
          <p className="text-sm text-muted-foreground/80">Preparing styles and content</p>
        </div>

        {/* Enhanced progress bar */}
        <div className="w-40 h-1.5 bg-border/40 rounded-full overflow-hidden backdrop-blur-sm border border-border/20">
          <div
            className="h-full bg-gradient-to-r from-primary via-accent to-primary rounded-full animate-shimmer"
            style={{
              width: "40%",
              backgroundSize: "200% 100%",
            }}
          />
        </div>

        {/* Loading dots animation */}
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-primary/60"
              style={{
                animation: `pulse 1.4s infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
