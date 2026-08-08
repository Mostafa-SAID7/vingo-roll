import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, Link, createRootRouteWithContext, useRouter } from "@tanstack/react-router";
import { useEffect, type ReactNode, Component, type ErrorInfo } from "react";

import { ThemeProvider } from "@/providers/theme-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import "../styles.css";

// Error Boundary Component
interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = "/";
  };

  override render() {
    if (this.state.hasError) {
      return (
        <ErrorPageContent
          error={this.state.error}
          onReset={this.handleReset}
          isDev={import.meta.env.DEV}
        />
      );
    }

    return this.props.children;
  }
}

function NotFoundComponent() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .error-404 {
          animation: slideUp 0.6s ease-out;
        }
        .error-code {
          font-size: 5rem;
          font-weight: 900;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: slideUp 0.6s ease-out 0.1s both;
          letter-spacing: -2px;
        }
        .error-icon {
          font-size: 4rem;
          animation: float 3s ease-in-out infinite, slideUp 0.6s ease-out 0.2s both;
          display: inline-block;
        }
        .error-title {
          animation: slideUp 0.6s ease-out 0.3s both;
        }
        .error-description {
          animation: slideUp 0.6s ease-out 0.4s both;
        }
        .error-actions {
          animation: slideUp 0.6s ease-out 0.5s both;
        }
      `}</style>
      <div className="error-404 max-w-md w-full text-center">
        <div className="error-icon mb-6">🪟</div>
        <div className="error-code mb-2">404</div>
        <h1 className="error-title text-4xl md:text-5xl font-bold mb-4">
          This page has been drawn closed
        </h1>
        <p className="error-description text-muted-foreground text-sm leading-relaxed mb-8">
          The page you're looking for doesn't exist or has moved. Try browsing our collection or
          discover your perfect style.
        </p>
        <div className="error-actions flex flex-wrap justify-center gap-3">
          <Button asChild className="px-6">
            <Link to="/shop">Browse collection</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/style-finder">Find your style</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function ErrorPageContent({
  error,
  onReset,
  isDev,
}: {
  error: Error | null;
  onReset: () => void;
  isDev: boolean;
}) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .error-content {
          animation: slideUp 0.6s ease-out;
        }
        .error-icon-error {
          font-size: 3rem;
          animation: shake 0.5s ease-in-out;
          display: inline-block;
          margin-bottom: 1.5rem;
        }
        .error-title-error {
          animation: slideUp 0.6s ease-out 0.1s both;
        }
        .error-message {
          animation: slideUp 0.6s ease-out 0.2s both;
        }
        .error-actions-error {
          animation: slideUp 0.6s ease-out 0.3s both;
        }
        .error-details {
          animation: slideUp 0.6s ease-out 0.4s both;
          max-height: 200px;
          overflow-y-auto;
        }
      `}</style>
      <div className="error-content max-w-md w-full text-center">
        <div className="error-icon-error">⚠️</div>
        <h1 className="error-title-error text-4xl font-bold mb-4">Something went wrong</h1>
        <p className="error-message text-muted-foreground text-sm leading-relaxed mb-8">
          An unexpected error occurred while loading this page. Our team has been notified. Please
          try again or return to the homepage.
        </p>
        <div className="error-actions-error flex flex-wrap justify-center gap-3 mb-6">
          <Button onClick={onReset} className="px-6">
            Go to homepage
          </Button>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Reload page
          </Button>
        </div>
        {isDev && error && (
          <div className="error-details text-left bg-muted p-4 rounded-lg border border-border text-xs text-muted-foreground font-mono">
            <p className="font-semibold mb-2 text-foreground">Error Details (Dev Only)</p>
            <p className="break-all">{error.message}</p>
            {error.stack && (
              <pre className="mt-2 whitespace-pre-wrap break-words text-xs">{error.stack}</pre>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error("Route error:", error);
  const router = useRouter();
  useEffect(() => {
    // Error logged to console for debugging
  }, [error]);

  return (
    <ErrorPageContent
      error={error}
      onReset={() => (window.location.href = "/")}
      isDev={import.meta.env.DEV}
    />
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ErrorBoundary>
          <a
            href="#main"
            className="bg-primary text-primary-foreground sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main id="main">
            {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
            <Outlet />
          </main>
          <SiteFooter />
          <Toaster position="bottom-right" />
        </ErrorBoundary>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
