import { useLoadingState } from "@/providers/loading-provider";
import { cn } from "@/lib/utils";

export function LoadingOverlay() {
  const { isInitialLoading } = useLoadingState();

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center",
        "bg-gradient-to-br from-background via-background to-accent/10",
        "transition-opacity duration-500 pointer-events-none",
        isInitialLoading ? "opacity-100" : "opacity-0"
      )}
      aria-hidden={!isInitialLoading}
    >
      {/* Shimmer background */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
      
      {/* Loading spinner */}
      <div className="relative z-10 flex flex-col items-center gap-4">
        {/* Animated logo or icon */}
        <div className="relative w-16 h-16">
          <div
            className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary animate-spin"
            style={{ animationDuration: "2s" }}
          />
          <div
            className="absolute inset-2 rounded-full border-2 border-transparent border-t-accent animate-spin"
            style={{ animationDuration: "3s", animationDirection: "reverse" }}
          />
          
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent animate-pulse" />
          </div>
        </div>

        {/* Loading text */}
        <div className="text-center">
          <p className="text-sm font-medium text-foreground/80">
            Loading your experience...
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Preparing styles and content
          </p>
        </div>

        {/* Loading progress bar */}
        <div className="w-32 h-1 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary via-accent to-primary animate-shimmer"
            style={{ width: "30%" }}
          />
        </div>
      </div>
    </div>
  );
}

