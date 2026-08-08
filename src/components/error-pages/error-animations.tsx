/**
 * Shared Error Animations and Utilities
 * Prevents duplication across error components
 */

/**
 * Woven Texture Background Component
 * Used by both ErrorBoundary and NotFoundPage for consistent branding
 */
export function AnimatedWovenBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <style>{`
        @keyframes drift {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(12px, -8px) rotate(0.5deg); }
          50% { transform: translate(-6px, 12px) rotate(-0.5deg); }
          75% { transform: translate(8px, -6px) rotate(0.3deg); }
        }
        .woven-bg {
          animation: drift 12s ease-in-out infinite;
        }
      `}</style>

      <svg
        className="woven-bg absolute inset-0 w-full h-full opacity-15 dark:opacity-10"
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern id="errorWeave" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <line x1="0" y1="10" x2="40" y2="10" stroke="currentColor" strokeWidth="1.5" />
            <line x1="0" y1="20" x2="40" y2="20" stroke="currentColor" strokeWidth="1.5" />
            <line x1="0" y1="30" x2="40" y2="30" stroke="currentColor" strokeWidth="1.5" />
            <line x1="10" y1="0" x2="10" y2="40" stroke="currentColor" strokeWidth="1.5" />
            <line x1="20" y1="0" x2="20" y2="40" stroke="currentColor" strokeWidth="1.5" />
            <line x1="30" y1="0" x2="30" y2="40" stroke="currentColor" strokeWidth="1.5" />
          </pattern>
        </defs>
        <rect width="400" height="400" fill="url(#errorWeave)" />
      </svg>
    </div>
  );
}

/**
 * Error Icon with shake animation
 */
import { AlertTriangle } from "lucide-react";

export function AnimatedErrorIcon() {
  return (
    <div>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: rotate(0deg) scale(1); }
          10% { transform: rotate(-2deg) scale(1.02); }
          20% { transform: rotate(2deg) scale(1.02); }
          30% { transform: rotate(-2deg) scale(1.02); }
          40% { transform: rotate(2deg) scale(1.02); }
          50% { transform: rotate(-1deg) scale(1.01); }
          60% { transform: rotate(1deg) scale(1.01); }
          70% { transform: rotate(0deg) scale(1); }
          100% { transform: rotate(0deg) scale(1); }
        }
        .error-icon {
          animation: shake 0.8s cubic-bezier(0.36, 0, 0.66, -0.56) 0s, 
                    fadeUpStagger 0.7s ease-out 100ms both;
          display: inline-block;
        }
      `}</style>
      <div className="error-icon">
        <AlertTriangle className="h-16 w-16 text-destructive" strokeWidth={1.5} />
      </div>
    </div>
  );
}
