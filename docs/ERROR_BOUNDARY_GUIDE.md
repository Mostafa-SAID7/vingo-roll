# Production-Grade Error Boundary Guide

## Overview

The Vingo Roll error handling system uses a **two-level ErrorBoundary** architecture to catch and handle errors gracefully across the entire application.

## Architecture

### Level 1: App-Level ErrorBoundary

**Location:** `src/routes/__root.tsx`

The outer ErrorBoundary wraps the entire application and catches:

- Router crashes
- Provider initialization errors
- Layout component failures
- Any uncaught errors in child components

```tsx
<QueryClientProvider>
  <ThemeProvider>
    <ErrorBoundary>{/* All routes and providers here */}</ErrorBoundary>
  </ThemeProvider>
</QueryClientProvider>
```

### Level 2: Route-Level ErrorBoundary

**Location:** `src/components/error-pages/route-error-boundary.tsx`

Individual pages can be wrapped with `<RouteErrorBoundary>` to isolate page-specific errors:

```tsx
// src/routes/shop/$category.tsx
export function ShopCategoryPage() {
  return (
    <RouteErrorBoundary routeName="Shop Category">
      <ShopCategoryContent />
    </RouteErrorBoundary>
  );
}
```

## Features

### 1. Error Capture

- `getDerivedStateFromError`: Captures the error for rendering
- `componentDidCatch`: Captures error metadata and component stack
- Full stack trace available in development mode

### 2. Retry Mechanism

- **Retry via `resetCount` key**: Forces a full subtree remount without losing browser state
- Preserves form inputs, scroll position, and user data
- Users can retry without page reload

```tsx
// In ErrorBoundary:
const handleRetry = () => {
  this.setState((prevState) => ({
    hasError: false,
    resetCount: prevState.resetCount + 1, // Increments key
  }));
};

// Wraps children with key to force remount:
<div key={`error-boundary-${this.state.resetCount}`}>{this.props.children}</div>;
```

### 3. Technical Details Panel

- **Collapsed by default** in production
- **Expandable** to show:
  - Error name
  - Error message
  - Component stack
  - Full stack trace (development only)
- Toggle button clearly labeled "Technical Details"

### 4. Branded Fallback UI

- Matches 404 page aesthetic (woven texture background)
- Consistent typography and spacing
- Action buttons: "Try Again" and "Back to Home"
- Accessible and responsive design

### 5. Custom Fallback Support

Pass a custom fallback to ErrorBoundary for section-specific errors:

```tsx
const customFallback = (error: Error, retry: () => void) => (
  <div>
    <h2>Custom error UI</h2>
    <button onClick={retry}>Retry</button>
  </div>
);

<ErrorBoundary fallback={customFallback}>{children}</ErrorBoundary>;
```

## Implementation Examples

### Global App-Level Protection

Already configured in `__root.tsx`. The entire application is wrapped:

```tsx
// src/routes/__root.tsx
export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  return (
    <ErrorBoundary>
      <QueryClientProvider>
        <ThemeProvider>{/* App content */}</ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
```

### Page-Level Protection

Add to individual pages that might fail:

```tsx
// src/routes/shop/$category.tsx
import { RouteErrorBoundary } from "@/components/error-pages/route-error-boundary";

export function ShopCategoryPage() {
  return (
    <RouteErrorBoundary routeName="Shop Category">
      <div className="space-y-6">
        <h1>Shop Category</h1>
        {/* Page content */}
      </div>
    </RouteErrorBoundary>
  );
}
```

### Section-Level Protection

For critical UI sections:

```tsx
// In any component
import { ErrorBoundary } from "@/components/error-pages/error-boundary";

export function ProductGrid() {
  return (
    <ErrorBoundary
      fallback={(error, retry) => (
        <div className="p-6 border border-destructive rounded-lg text-center">
          <p>Could not load products</p>
          <button onClick={retry}>Try Again</button>
        </div>
      )}
    >
      {/* Grid content */}
    </ErrorBoundary>
  );
}
```

## Error Information Available

### In ErrorBoundary

```tsx
// Error object
error.name; // "TypeError", "ReferenceError", etc.
error.message; // "Cannot read property 'x' of undefined"
error.stack; // Full stack trace (dev only)

// ErrorInfo object (from componentDidCatch)
errorInfo.componentStack; // React component hierarchy where error occurred
```

### Example Component Stack

```
at ShopCategoryContent (src/routes/shop/$category.tsx:25:5)
  at RouteErrorBoundary (src/components/error-pages/route-error-boundary.tsx:60:5)
  at ErrorBoundary (src/components/error-pages/error-boundary.tsx:120:5)
  at Router (src/router.tsx:15:5)
```

## Development vs Production

### Development Mode

- All error details visible by default
- Full stack traces displayed
- Component stack shown
- Helpful debugging information

### Production Mode

- Error details collapsed (user-friendly)
- Technical details available if user clicks "Technical Details"
- Component stack visible
- Stack trace hidden (unless shared via UI)
- Error reported to monitoring service (if configured)

## Error Monitoring Integration

To integrate with error tracking services (Sentry, Rollbar, etc.):

```tsx
// In ErrorBoundary.componentDidCatch:
override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
  // Log to console
  console.error("ErrorBoundary caught an error:", error, errorInfo);

  // Send to error tracking service
  captureException(error, {
    contexts: { react: errorInfo },
    level: 'error',
  });
}
```

## Common Error Scenarios

### Async Data Loading Error

```tsx
// Use RouteErrorBoundary to catch data loading failures
<RouteErrorBoundary routeName="Products">
  <Suspense fallback={<Loader />}>
    <ProductList />
  </Suspense>
</RouteErrorBoundary>
```

### Third-Party Component Failure

```tsx
// Wrap risky third-party components
<ErrorBoundary fallback={(error, retry) => <div>Third-party widget failed to load</div>}>
  <ThirdPartyWidget />
</ErrorBoundary>
```

### Route Transition Error

```tsx
// Handled by router-level ErrorComponent
// Automatically displays error page on route errors
```

## Best Practices

1. **Use Multiple Boundaries**: Don't rely on a single app-level boundary. Add route-level boundaries for critical pages.

2. **Provide Context**: Use the `routeName` prop to help users understand where the error occurred.

3. **Meaningful Fallbacks**: Custom fallbacks should guide users to recovery options.

4. **Monitor Errors**: Integrate with error tracking to be alerted to production issues.

5. **Test Error States**: Manually test boundaries by throwing errors in development.

6. **Avoid Silent Failures**: Always show an error UI; don't hide errors from users.

## Testing

### Manual Testing in Development

```tsx
// Add a test error button to any page
<button
  onClick={() => {
    throw new Error("Test error boundary");
  }}
>
  Throw Error
</button>
```

### Automated Testing

```tsx
// Test that ErrorBoundary catches errors
import { render, screen } from "@testing-library/react";
import { ErrorBoundary } from "@/components/error-pages/error-boundary";

const BadComponent = () => {
  throw new Error("Test error");
};

test("ErrorBoundary catches errors", () => {
  render(
    <ErrorBoundary>
      <BadComponent />
    </ErrorBoundary>,
  );

  expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /try again/i })).toBeInTheDocument();
});
```

## Related Files

- `src/components/error-pages/error-boundary.tsx` - Main ErrorBoundary component
- `src/components/error-pages/route-error-boundary.tsx` - Route-level wrapper
- `src/components/error-pages/not-found-page.tsx` - 404 page
- `src/components/error-pages/error-page.tsx` - Router error page
- `src/routes/__root.tsx` - App-level setup
