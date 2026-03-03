interface SkeletonProps {
  widthTwClass?: string;
  heightTwClass?: string;
  roundedTwClass?: string;
  className?: string;
}

export default function Skeleton({
  widthTwClass = "w-full",
  heightTwClass = "h-4",
  roundedTwClass = "rounded",
  className = "",
}: SkeletonProps) {
  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .skeleton-shimmer {
          background: linear-gradient(
            135deg,
            #f0f3f7 25%,
            #e2e8f0 50%,
            #f0f3f7 75%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite linear;
        }
      `}</style>
      <div
        className={`skeleton-shimmer ${widthTwClass} ${heightTwClass} ${roundedTwClass} ${className}`}
        aria-hidden="true"
      />
    </>
  );
}
