# Error Handling & User Experience

## Overview

Vingo Roll Studio implements a comprehensive, modern error handling strategy with graceful fallbacks, animated UI components, and excellent error messaging. Our approach prioritizes user experience while maintaining robust error tracking for development.

## Architecture

### 1. Error Boundary Component

The React Error Boundary (`src/routes/__root.tsx`) wraps the entire application to catch unhandled component errors.

**Features:**
- Catches errors in any child component during rendering
- Prevents white-screen-of-death errors
- Provides development-friendly error details in dev mode
- Offers user-friendly messaging in production
- Smooth animations for error display

**Usage:**
```tsx
<ErrorBoundary>
  <YourApp />
</ErrorBoundary>
```

### 2. Route Error Handling

React Router's built-in error and 404 handlers capture route-level errors:

- **404 Not Found**: Triggers when a route doesn't exist
- **Error Handler**: Catches errors thrown during route loading or rendering

**Current Handlers:**
- `NotFoundComponent`: Modern 404 page with animations
- `ErrorComponent`: Generic error page for route errors

### 3. Server-Side Fallback

The `src/lib/error-page.ts` provides a minimal HTML fallback for critical errors that occur before React hydration:

```typescript
renderErrorPage(): string
```

Used by the server to render errors that happen during SSR or hydration.

## Error Pages

### 404 Page Design

The 404 page features:

**Visual Elements:**
- Floating window icon (🪟) with animation
- Large gradient "404" text (purple to pink gradient)
- Clear, empathetic messaging
- Modern rounded UI with proper spacing

**Animations:**
- `slideUp`: Staggered entrance animations (0.1s intervals)
- `float`: Gentle vertical movement on the icon
- All elements animate in sequence for polish

**Actions:**
- "Browse collection" (primary button)
- "Find your style" (secondary button)
- Links to shop and style-finder routes

### Error Page Design

The generic error page features:

**Visual Elements:**
- Warning icon (⚠️) with shake animation
- Empathetic error messaging
- Optional dev-only error details in a scrollable panel
- Styled code block for error stack trace

**Animations:**
- `shake`: Attention-grabbing icon animation
- `slideUp`: Staggered component entrance
- Smooth transitions and hover effects

**Actions:**
- "Go to homepage" (primary button)
- "Reload page" (secondary button)
- Dev mode shows: Error message, stack trace, file location

### HTML Fallback Error Page

Critical errors that occur before React loads display a minimal but styled HTML page:

**Features:**
- No JavaScript required
- Responsive design with media queries
- Dark mode support via `prefers-color-scheme`
- Gradient buttons matching the brand
- Professional typography and spacing
- Scrollable error details area (if provided)

## Styling System

### Animation Keyframes

**slideUp**
```css
@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
```
Used for all entrance animations with staggered delays.

**shake**
```css
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}
```
Creates attention-grabbing effect for error states.

**float**
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
```
Gentle vertical movement for decorative elements.

### Colors

**Gradients:**
- Primary: Purple (#667eea) to Pink (#764ba2)
- Used on: 404 code, error icons, buttons

**CSS Variables (Light/Dark Mode):**
```css
--color-bg: #fafafa (light) / #0f172a (dark)
--color-fg: #111 (light) / #f1f5f9 (dark)
--color-muted: #4b5563 (light) / #94a3b8 (dark)
--color-accent: #667eea
--color-accent-alt: #764ba2
```

## Error Boundary Implementation

### Component Lifecycle

```typescript
class ErrorBoundary extends Component {
  // 1. Catch error during render
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  // 2. Log error details
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught:", error, errorInfo)
    // Could send to error tracking service here
  }

  // 3. Render error UI
  render() {
    if (this.state.hasError) {
      return <ErrorPageContent ... />
    }
    return this.props.children
  }
}
```

### Development Mode Features

In development (`import.meta.env.DEV`):
- Full error message displayed
- Stack trace visible
- Component hierarchy information
- Helps debugging without console logs

## Usage Patterns

### Throwing Errors in Routes

```typescript
export const Route = createFileRoute('/product/$slug')({
  loader: ({ params }) => {
    const product = getProduct(params.slug)
    if (!product) {
      throw notFound() // Triggers 404 handler
    }
    return { product }
  },
  component: Page,
})
```

### Handling Async Errors

```typescript
async function fetchData() {
  try {
    const data = await api.get('/data')
    return data
  } catch (error) {
    // ErrorBoundary will catch this if thrown
    throw error
  }
}
```

### Manual Error Triggering

```typescript
function MyComponent() {
  const handleError = () => {
    throw new Error('Something went wrong!')
  }

  return <button onClick={handleError}>Trigger Error</button>
}
```

## Best Practices

### ✅ Do

1. **Provide Context**: Error messages should explain what went wrong
2. **Suggest Actions**: Always provide links/buttons to recover
3. **Test Gracefully**: Test error states during development
4. **Log Appropriately**: Use console.error for debugging, integrate with error tracking
5. **Animate Smoothly**: Use staggered animations for visual polish

### ❌ Don't

1. **Hide Errors**: Don't silently fail—let users know something happened
2. **Show Stack Traces to Users**: Keep dev details in dev mode only
3. **Break Navigation**: Always provide a way back (home, shop, etc.)
4. **Overcomplicate**: Keep error UI simple and focused

## Integration with Error Tracking

To integrate with services like Sentry, Rollbar, or LogRocket:

```typescript
// In componentDidCatch
componentDidCatch(error: Error, errorInfo: ErrorInfo) {
  // Send to error tracking service
  Sentry.captureException(error, { contexts: { react: errorInfo } })
}
```

## Testing Error Boundaries

### Development Testing

1. **404 Page**: Navigate to `/nonexistent-page`
2. **Error Page**: Check route loaders for `throw` statements
3. **Error Boundary**: Create test component that throws error

### Production Testing

1. Use error tracking service dashboard
2. Monitor error rates in analytics
3. Check user session recordings for error context

## Performance Considerations

- Error boundaries don't catch:
  - Event handlers (use try/catch instead)
  - Async code (use .catch() or try/catch in async functions)
  - Server rendering (use SSR error handler)
- Animations use CSS transforms (GPU accelerated)
- Minimal JavaScript in HTML fallback
- No external dependencies in error pages

## Related Files

- `src/routes/__root.tsx` - Error Boundary & error components
- `src/lib/error-page.ts` - HTML fallback page
- `src/lib/error-capture.ts` - Error tracking utilities
- `src/router.tsx` - Route configuration

## Future Enhancements

- [ ] Integration with error tracking service
- [ ] Analytics tracking for error events
- [ ] Retry logic with exponential backoff
- [ ] Fallback UI for offline errors
- [ ] Error recovery suggestions based on error type
- [ ] A/B testing different error messages
