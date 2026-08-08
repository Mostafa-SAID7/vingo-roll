import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circle" | "rect" | "image";
}

export function Skeleton({ className, variant = "rect", ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "relative isolate",
        "overflow-hidden rounded",
        variant === "circle" && "rounded-full",
        variant === "text" && "h-4 rounded w-full",
        variant === "image" && "aspect-square rounded-lg",
        "bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800",
        className,
      )}
      {...props}
    >
      {/* Shimmer overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent dark:via-white/10 animate-shimmer"
        style={{
          backgroundSize: "200% 100%",
        }}
      />
    </div>
  );
}

// Shimmer loading card with enhanced animation
export function SkeletonCard() {
  return (
    <div className="space-y-4 rounded-lg border border-border p-4 bg-card/50">
      <Skeleton variant="image" className="h-48 w-full" />
      <div className="space-y-3">
        <Skeleton variant="text" className="h-5 w-3/4" />
        <Skeleton variant="text" className="h-4 w-full" />
        <Skeleton variant="text" className="h-4 w-2/3" />
      </div>
      <div className="flex gap-2 pt-2">
        <Skeleton variant="rect" className="h-10 flex-1 rounded-md" />
        <Skeleton variant="rect" className="h-10 flex-1 rounded-md" />
      </div>
    </div>
  );
}

// Product grid skeleton with staggered animation
export function SkeletonProductGrid({ count = 4 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            animation: `fadeInUp 0.6s ease-out forwards`,
            animationDelay: `${i * 0.1}s`,
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
      <Skeleton variant="image" className="h-96 w-full rounded-xl" />
      <div className="space-y-4 max-w-2xl mx-auto px-4">
        <Skeleton variant="text" className="h-8 w-2/3 mx-auto" />
        <Skeleton variant="text" className="h-6 w-3/4 mx-auto" />
        <Skeleton variant="text" className="h-4 w-1/2 mx-auto" />
        <div className="flex gap-3 justify-center pt-4">
          <Skeleton variant="rect" className="h-12 w-32 rounded-lg" />
          <Skeleton variant="rect" className="h-12 w-32 rounded-lg" />
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
      <div className="container space-y-8">
        <div className="space-y-3">
          <Skeleton variant="text" className="h-6 w-1/4" />
          <Skeleton variant="text" className="h-4 w-1/3" />
        </div>
        <SkeletonProductGrid count={8} />
      </div>
    </div>
  );
}
