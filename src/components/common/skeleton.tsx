import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "circle" | "rect" | "image";
}

export function Skeleton({
  className,
  variant = "rect",
  ...props
}: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-shimmer",
        variant === "circle" && "rounded-full",
        variant === "text" && "h-4 rounded",
        variant === "image" && "aspect-square rounded-lg",
        "bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800",
        "bg-[length:200%_100%]",
        className
      )}
      {...props}
    />
  );
}

// Shimmer loading card
export function SkeletonCard() {
  return (
    <div className="space-y-4 rounded-lg border border-border p-4">
      <Skeleton variant="image" className="h-48 w-full" />
      <div className="space-y-2">
        <Skeleton variant="text" className="h-5 w-3/4" />
        <Skeleton variant="text" className="h-4 w-1/2" />
      </div>
      <div className="flex gap-2">
        <Skeleton variant="rect" className="h-10 w-1/2 rounded" />
        <Skeleton variant="rect" className="h-10 w-1/2 rounded" />
      </div>
    </div>
  );
}

// Product grid skeleton
export function SkeletonProductGrid({ count = 4 }: { count?: number }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

// Hero skeleton
export function SkeletonHero() {
  return (
    <div className="space-y-4">
      <Skeleton variant="image" className="h-96 w-full rounded-xl" />
      <div className="space-y-3 max-w-2xl mx-auto px-4">
        <Skeleton variant="text" className="h-8 w-2/3 mx-auto" />
        <Skeleton variant="text" className="h-6 w-3/4 mx-auto" />
        <Skeleton variant="text" className="h-4 w-1/2 mx-auto" />
      </div>
    </div>
  );
}

// Page skeleton (full page loading)
export function SkeletonPage() {
  return (
    <div className="space-y-8">
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

