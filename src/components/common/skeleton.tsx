import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circle" | "rect" | "image";
}

export function Skeleton({ className, variant = "rect", ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative isolate overflow-hidden rounded bg-muted",
        variant === "circle" && "rounded-full",
        variant === "text" && "h-4 w-full rounded",
        variant === "image" && "aspect-square rounded-lg",
        className,
      )}
      {...props}
    >
      {/* Shimmer sweep */}
      <div className="animate-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
    </div>
  );
}

// Shimmer loading card with enhanced animation
export function SkeletonCard() {
  return (
    <div className="bg-card/50 space-y-4 rounded-lg border border-border p-3 sm:p-4">
      <Skeleton variant="image" className="aspect-[4/5] h-auto w-full" />
      <div className="space-y-3">
        <Skeleton variant="text" className="h-5 w-3/4" />
        <Skeleton variant="text" className="h-4 w-full" />
        <Skeleton variant="text" className="h-4 w-2/3" />
      </div>
      <div className="flex flex-col gap-2 pt-2 sm:flex-row">
        <Skeleton variant="rect" className="h-10 flex-1 rounded-md" />
        <Skeleton variant="rect" className="h-10 flex-1 rounded-md" />
      </div>
    </div>
  );
}

// Product grid skeleton with staggered animation
export function SkeletonProductGrid({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            animation: `fadeInUp 0.6s ease-out forwards`,
            animationDelay: `${i * 0.08}s`,
            opacity: 0,
          }}
        >
          <SkeletonCard />
        </div>
      ))}
    </div>
  );
}

// Hero skeleton with larger shimmer effect
export function SkeletonHero() {
  return (
    <div className="space-y-6">
      <Skeleton
        variant="image"
        className="h-56 w-full rounded-xl sm:h-80 lg:h-96 lg:aspect-auto"
      />
      <div className="mx-auto max-w-2xl space-y-4 px-4">
        <Skeleton variant="text" className="mx-auto h-8 w-2/3" />
        <Skeleton variant="text" className="mx-auto h-6 w-3/4" />
        <Skeleton variant="text" className="mx-auto h-4 w-1/2" />
        <div className="flex flex-col justify-center gap-3 pt-4 sm:flex-row">
          <Skeleton variant="rect" className="h-12 w-full rounded-lg sm:w-32" />
          <Skeleton variant="rect" className="h-12 w-full rounded-lg sm:w-32" />
        </div>
      </div>
    </div>
  );
}

// Full page skeleton with comprehensive layout
export function SkeletonPage() {
  return (
    <div className="space-y-12">
      <SkeletonHero />
      <div className="container-page space-y-8">
        <div className="space-y-3">
          <Skeleton variant="text" className="h-6 w-1/2 sm:w-1/4" />
          <Skeleton variant="text" className="h-4 w-2/3 sm:w-1/3" />
        </div>
        <SkeletonProductGrid count={8} />
      </div>
    </div>
  );
}
