import { ReactNode } from "react";
import { ErrorBoundary } from "@/components/error-pages/error-boundary";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RouteErrorBoundaryProps {
  children: ReactNode;
  routeName?: string;
  onRetry?: () => void;
}

/**
 * Route-Level Error Boundary
 * Wraps individual page components to isolate errors
 * Prevents one broken page from crashing the entire app
 *
 * Usage in a route:
 * ```tsx
 * export function MyPage() {
 *   return (
 *     <RouteErrorBoundary routeName="My Page">
 *       <MyPageContent />
 *     </RouteErrorBoundary>
 *   );
 * }
 * ```
 */
export function RouteErrorBoundary({
  children,
  routeName = "Page",
  onRetry,
}: RouteErrorBoundaryProps) {
  // Custom fallback for route-level errors
  const customFallback = (error: Error, retry: () => void) => (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md text-center space-y-6">
        <div>
          <h2 className="font-display text-2xl font-bold mb-2">Error in {routeName}</h2>
          <p className="text-muted-foreground text-sm">
            We encountered an issue loading this page. Try refreshing or go back.
          </p>
        </div>

        <div className="bg-card border border-border/50 rounded-lg p-4 text-left">
          <p className="text-xs font-mono text-destructive break-all">{error.message}</p>
        </div>

        <div className="flex flex-col gap-3">
          <Button
            onClick={() => {
              onRetry?.();
              retry();
            }}
            className="w-full"
          >
            Retry
          </Button>
          <Button variant="outline" onClick={() => window.history.back()} className="w-full">
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );

  return <ErrorBoundary fallback={customFallback}>{children}</ErrorBoundary>;
}
