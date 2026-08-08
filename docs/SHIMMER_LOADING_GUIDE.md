# Shimmer Loading Effect Guide

## Overview

The shimmer loading effect provides an elegant, modern loading experience during initial page load and style fetching. It improves perceived performance and creates a professional first impression.

---

## 🎨 Features

### 1. **LoadingOverlay Component**

- Full-screen loading indicator that appears during initial page load
- Smooth fade-out transition (500ms) when styles are ready
- Premium triple-ring spinner with staggered animations
- Animated gradient background with glassmorphism effect
- Dynamic progress bar with loading dots

### 2. **Skeleton Components**

- **Skeleton**: Base component for shimmer placeholders
  - Variants: `text`, `circle`, `rect`, `image`
  - Smooth gradient animation (2.5s ease-in-out)
  - Dark mode support

- **SkeletonCard**: Product card placeholder
  - Includes image, title, and button skeletons
  - Used in product grids

- **SkeletonProductGrid**: Multiple skeleton cards
  - Staggered fade-in animation (0.1s delay between items)
  - Configurable count (default: 4)

- **SkeletonHero**: Large hero section placeholder
  - Image + title + description + CTA buttons

- **SkeletonPage**: Full page loading skeleton
  - Complete layout mockup for better perceived performance

### 3. **LoadingProvider**

- React Context for managing loading state
- Automatically detects when styles are fully loaded
- Emits `isInitialLoading` and `isStylesLoaded` states

---

## 📦 Architecture

```
src/
├── providers/
│   └── loading-provider.tsx          # Loading state management
├── components/common/
│   ├── skeleton.tsx                 # Skeleton components
│   ├── loading-overlay.tsx          # Loading indicator
│   └── index.ts                     # Exports
└── styles.css                       # Shimmer animations
```

---

## 🎯 Usage

### 1. Using LoadingOverlay (automatic)

The LoadingOverlay is included in the root layout and displays automatically:

```tsx
// src/routes/__root.tsx
function RootComponent() {
  return (
    <LoadingProvider>
      <ClientProvider>
        <ErrorBoundary>
          <LoadingOverlay /> {/* Displays during initial load */}
          {/* ... rest of app ... */}
        </ErrorBoundary>
      </ClientProvider>
    </LoadingProvider>
  );
}
```

### 2. Using Skeleton Components

For custom loading states:

```tsx
import { SkeletonCard, SkeletonProductGrid, SkeletonPage } from "@/components/common";

// Single card skeleton
<SkeletonCard />

// Product grid (4 items)
<SkeletonProductGrid count={4} />

// Full page skeleton
<SkeletonPage />

// Custom skeleton
<Skeleton variant="image" className="h-48 w-full rounded-lg" />
<Skeleton variant="text" className="h-4 w-2/3" />
```

### 3. Checking Loading State

```tsx
import { useLoadingState } from "@/providers/loading-provider";

function MyComponent() {
  const { isInitialLoading, isStylesLoaded } = useLoadingState();

  if (isInitialLoading) {
    return <SkeletonPage />;
  }

  return <YourContent />;
}
```

---

## 🎬 Animations

### Shimmer Animation (2.5s)

- Smooth gradient sweep from left to right
- Easing: ease-in-out for natural motion
- Repeats infinitely during load

```css
@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  50% {
    background-position: 500px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}
```

### Fade-In-Up Animation (0.6s)

- Staggered entry for skeleton items
- Each item delays by 0.1s
- Creates cascading reveal effect

```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### Spinner Animations

- Outer ring: 2.5s forward rotation
- Middle ring: 3s reverse rotation
- Inner glow: Subtle pulse effect

---

## 🎨 Customization

### Adjust Loading Duration

```tsx
// src/providers/loading-provider.tsx
const timer = setTimeout(() => {
  setIsInitialLoading(false);
  setStylesLoaded(true);
}, 1200); // Change from 800ms to 1200ms
```

### Modify Shimmer Speed

```css
/* src/styles.css */
@utility animate-shimmer {
  animation: shimmer 3s ease-in-out infinite; /* Changed from 2.5s */
}
```

### Change Skeleton Card Layout

```tsx
// src/components/common/skeleton.tsx
export function SkeletonCard() {
  return (
    <div className="space-y-4 rounded-lg border border-border p-6">
      {" "}
      {/* Changed padding */}
      {/* ... rest of component ... */}
    </div>
  );
}
```

### Update Overlay Colors

```tsx
// src/components/common/loading-overlay.tsx
<div
  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 
               bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"
/>
```

---

## 🚀 Performance Considerations

1. **Hardware Acceleration**: All animations use `transform` and `opacity` for smooth 60fps
2. **Pointer Events**: Loading overlay disables pointer events when not visible
3. **Backdrop Blur**: Only applied during loading (removed when complete)
4. **CSS Animations**: GPU-accelerated keyframe animations, not JavaScript

---

## 🔍 Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (with `-webkit-` prefix for backdrop-filter)
- Mobile: Optimized with reduced blur intensity

---

## 📊 Loading State Flow

```
Initial Page Load
      ↓
LoadingProvider starts (isInitialLoading = true)
      ↓
LoadingOverlay displays with shimmer
      ↓
Styles/Fonts loaded (800ms)
      ↓
isInitialLoading = false
      ↓
LoadingOverlay fades out (500ms)
      ↓
Page content visible
```

---

## 🐛 Troubleshooting

### Loading overlay doesn't appear

- Ensure `LoadingProvider` wraps entire app in `__root.tsx`
- Check z-index conflicts with other components

### Shimmer animation looks janky

- Verify hardware acceleration is enabled
- Check browser DevTools Performance tab
- Reduce animation complexity if needed

### Content flashes during transition

- Increase loading duration in `loading-provider.tsx`
- Add delay to content render with Suspense

### Loading state sticks indefinitely

- Check console for errors during initialization
- Verify stylesheets load correctly
- Test in incognito/private mode

---

## 🎯 Best Practices

1. **Keep loading state brief** (under 1-2 seconds for perceived performance)
2. **Use appropriate skeleton variants** (match actual content layout)
3. **Consider network conditions** (add min duration for consistency)
4. **Test on slower connections** (throttle in DevTools)
5. **Stagger multiple skeletons** (improves perceived smoothness)
6. **Match brand colors** (customize gradient/spinner colors)

---

## 🔗 Related Files

- `src/providers/loading-provider.tsx` - Loading state management
- `src/components/common/skeleton.tsx` - Skeleton components
- `src/components/common/loading-overlay.tsx` - Loading indicator
- `src/routes/__root.tsx` - Root layout integration
- `src/styles.css` - Shimmer animations

---

## 📝 Version

- **Created**: August 8, 2026
- **Last Updated**: August 8, 2026
- **Status**: ✅ Production Ready
