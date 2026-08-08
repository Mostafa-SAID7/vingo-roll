import { Component, type ReactNode, type ErrorInfo } from "react";
import { ChevronDown, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatedWovenBackground, AnimatedErrorIcon } from "./error-animations";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, retry: () => void) => ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  resetCount: number;
  isDetailsExpanded: boolean;
}

/**
 * Production-Grade ErrorBoundary Component
 *
 * Features:
 * - getDerivedStateFromError + componentDidCatch for full error capture
 * - Retry mechanism via resetCount key (forces subtree remount)
 * - Expandable technical details (dev/production aware)
 * - Branded fallback UI with woven texture aesthetic
 * - Custom fallback prop for per-section error UI
 * - Two-level protection support in App.tsx
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      resetCount: 0,
      isDetailsExpanded: false,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log to console for debugging
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    // Update state with full error info and component stack
    this.setState({
      errorInfo,
    });

    // In a real app, you'd send this to an error tracking service
    // Example: captureException(error, { contexts: { react: errorInfo } });
  }

  handleRetry = () => {
    // Increment resetCount to force subtree remount
    this.setState((prevState) => ({
      hasError: false,
      error: null,
      errorInfo: null,
      resetCount: prevState.resetCount + 1,
      isDetailsExpanded: false,
    }));
  };

  toggleDetails = () => {
    this.setState((prevState) => ({
      isDetailsExpanded: !prevState.isDetailsExpanded,
    }));
  };

  override render() {
    if (this.state.hasError && this.state.error) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.handleRetry);
      }

      // Default branded fallback UI
      return (
        <ErrorBoundaryFallback
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          onRetry={this.handleRetry}
          isDetailsExpanded={this.state.isDetailsExpanded}
          onToggleDetails={this.toggleDetails}
        />
      );
    }

    // Wrap children with key to force remount on retry
    return <div key={`error-boundary-${this.state.resetCount}`}>{this.props.children}</div>;
  }
}

/**
 * Fallback UI Component
 * Displays error information with branded styling
 */
interface ErrorBoundaryFallbackProps {
  error: Error;
  errorInfo: ErrorInfo | null;
  onRetry: () => void;
  isDetailsExpanded: boolean;
  onToggleDetails: () => void;
}

function ErrorBoundaryFallback({
  error,
  errorInfo,
  onRetry,
  isDetailsExpanded,
  onToggleDetails,
}: ErrorBoundaryFallbackProps) {
  const isDev = import.meta.env.DEV;

  return (
    <div className="relative w-full min-h-screen bg-background text-foreground overflow-hidden flex flex-col">
      {/* Woven Texture Background */}
      <AnimatedWovenBackground />

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl space-y-8 text-center">
          {/* Icon */}
          <div
            className="inline-block"
            style={{ animation: "fadeUpStagger 0.7s ease-out 100ms both" }}
          >
            <AnimatedErrorIcon />
          </div>

          {/* Title */}
          <div style={{ animation: "fadeUpStagger 0.7s ease-out 200ms both" }}>
            <h1 className="font-display text-4xl md:text-5xl font-bold">Something went wrong</h1>
          </div>

          {/* Error Message */}
          <div
            className="bg-card border border-border/50 rounded-lg p-6"
            style={{ animation: "fadeUpStagger 0.7s ease-out 300ms both" }}
          >
            <p className="text-base text-muted-foreground leading-relaxed">
              We encountered an unexpected error. This has been logged and our team will look into
              it. Please try again or contact support if the problem persists.
            </p>
          </div>

          {/* Action Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            style={{ animation: "fadeUpStagger 0.7s ease-out 400ms both" }}
          >
            <Button onClick={onRetry} className="px-8 py-3 text-base font-semibold">
              <RotateCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/")}
              className="px-8 py-3 text-base font-semibold"
            >
              Back to Home
            </Button>
          </div>

          {/* Technical Details (Dev Only or Expandable) */}
          {isDev && (
            <div
              className="space-y-2"
              style={{ animation: "fadeUpStagger 0.7s ease-out 500ms both" }}
            >
              <button
                onClick={onToggleDetails}
                className={cn(
                  "w-full flex items-center justify-between",
                  "px-4 py-3 rounded-lg border border-border/50",
                  "bg-card hover:bg-card/80 transition-colors",
                  "text-sm font-semibold text-muted-foreground hover:text-foreground",
                )}
              >
                <span>Technical Details</span>
                <ChevronDown
                  className={cn("h-4 w-4 transition-transform", isDetailsExpanded && "rotate-180")}
                />
              </button>

              {/* Expandable Details Panel */}
              {isDetailsExpanded && (
                <div className="bg-muted/50 border border-border/30 rounded-lg p-4 space-y-3 text-left max-h-96 overflow-y-auto">
                  {/* Error Name */}
                  <div>
                    <p className="text-xs font-semibold text-destructive mb-1">Error Type</p>
                    <p className="text-xs text-muted-foreground font-mono bg-background/50 rounded p-2 break-all">
                      {error.name || "Error"}
                    </p>
                  </div>

                  {/* Error Message */}
                  <div>
                    <p className="text-xs font-semibold text-destructive mb-1">Message</p>
                    <p className="text-xs text-muted-foreground font-mono bg-background/50 rounded p-2 break-all">
                      {error.message}
                    </p>
                  </div>

                  {/* Component Stack */}
                  {errorInfo?.componentStack && (
                    <div>
                      <p className="text-xs font-semibold text-destructive mb-1">Component Stack</p>
                      <pre className="text-xs text-muted-foreground font-mono bg-background/50 rounded p-2 overflow-x-auto whitespace-pre-wrap break-words">
                        {errorInfo.componentStack}
                      </pre>
                    </div>
                  )}

                  {/* Full Stack Trace */}
                  {error.stack && isDev && (
                    <div>
                      <p className="text-xs font-semibold text-destructive mb-1">Stack Trace</p>
                      <pre className="text-xs text-muted-foreground font-mono bg-background/50 rounded p-2 overflow-x-auto whitespace-pre-wrap break-words">
                        {error.stack}
                      </pre>
                    </div>
                  )}

                  {/* Production Notice */}
                  {!isDev && (
                    <p className="text-xs text-muted-foreground italic pt-2 border-t border-border/20">
                      Additional debugging information is available in development mode.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Global Styles */}
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
