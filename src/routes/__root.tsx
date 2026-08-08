import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { useEffect } from "react";

import { ThemeProvider } from "@/providers/theme-provider";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ErrorBoundary } from "@/components/error-pages/error-boundary";
import { NotFoundPage } from "@/components/error-pages/not-found-page";
import { ErrorPage } from "@/components/error-pages/error-page";
import { Toaster } from "@/components/ui/sonner";
import "../styles.css";

function NotFoundComponent() {
  return <NotFoundPage />;
}

function ErrorComponent({ error }: { error: Error }) {
  console.error("Route error:", error);
  useEffect(() => {
    // Error logged to console for debugging
  }, [error]);

  return (
    <ErrorPage
      error={error}
      isDev={import.meta.env.DEV}
      onReset={() => (window.location.href = "/")}
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
        {/* Outer ErrorBoundary: Catches router/provider crashes */}
        <ErrorBoundary>
          <a
            href="#main"
            className="bg-primary text-primary-foreground sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main id="main">
            {/* Inner ErrorBoundary: Catches route/page-level errors per route
                Note: key={location.pathname} would be ideal but requires useLocation hook
                Alternative: Use route-specific boundaries in individual page components */}
            <Outlet />
          </main>
          <SiteFooter />
          <Toaster position="bottom-right" />
        </ErrorBoundary>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
