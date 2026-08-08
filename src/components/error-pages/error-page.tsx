import { RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Router-Level Error Page
 * Used by TanStack Router's errorComponent
 * Displays route errors without ErrorBoundary wrapper
 */
export function ErrorPage({
  error,
  isDev,
  onReset,
}: {
  error?: Error | null;
  isDev?: boolean;
  onReset?: () => void;
}) {
  return (
    <div className="relative w-full min-h-screen bg-background text-foreground overflow-hidden flex flex-col">
      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl space-y-8 text-center">
          {/* Title */}
          <div style={{ animation: "fadeUpStagger 0.7s ease-out 200ms both" }}>
            <h1 className="font-display text-4xl md:text-5xl font-bold">Route Error</h1>
          </div>

          {/* Description */}
          <p
            className="text-base text-muted-foreground max-w-md mx-auto leading-relaxed"
            style={{ animation: "fadeUpStagger 0.7s ease-out 300ms both" }}
          >
            An error occurred while navigating to this page. Please try again or return to the
            homepage.
          </p>

          {/* Action Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            style={{ animation: "fadeUpStagger 0.7s ease-out 400ms both" }}
          >
            <Button onClick={onReset} className="px-8 py-3 text-base font-semibold">
              <RotateCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
            <Button
              onClick={() => (window.location.href = "/")}
              variant="outline"
              className="px-8 py-3 text-base font-semibold"
            >
              Back to Home
            </Button>
          </div>

          {/* Error Details (Development Only) */}
          {isDev && error && (
            <div
              className="mt-8 text-left bg-muted/50 border border-destructive/30 rounded-lg p-4 space-y-2 max-w-xl"
              style={{ animation: "fadeUpStagger 0.7s ease-out 500ms both" }}
            >
              <p className="font-semibold text-sm text-destructive mb-3">Error Details</p>
              <div className="bg-background rounded p-3 border border-border/50">
                <p className="text-xs text-muted-foreground font-mono break-all">{error.message}</p>
              </div>
              {error.stack && (
                <div className="bg-background rounded p-3 border border-border/50 max-h-32 overflow-y-auto">
                  <pre className="text-xs text-muted-foreground font-mono whitespace-pre-wrap break-words">
                    {error.stack}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <style>{`
        @keyframes fadeUpStagger {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
