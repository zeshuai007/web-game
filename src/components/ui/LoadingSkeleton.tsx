import React from 'react';

interface LoadingSkeletonProps {
  width?: number | string;
  height?: number | string;
  borderRadius?: number | string;
  className?: string;
  rows?: number;
}

const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  width = '100%',
  height = 16,
  borderRadius = 4,
  className = '',
  rows = 1,
}) => {
  if (rows > 1) {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="skeleton"
            style={{
              width: i === rows - 1 ? '70%' : width,
              height,
              borderRadius,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`skeleton ${className}`}
      style={{ width, height, borderRadius }}
    />
  );
};

/** 卡片骨架 */
export const SkeletonCard: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`game-card p-4 space-y-3 ${className}`}>
    <div className="flex items-center gap-3">
      <LoadingSkeleton width={40} height={40} borderRadius={8} />
      <div className="flex-1">
        <LoadingSkeleton height={14} width="60%" className="mb-2" />
        <LoadingSkeleton height={12} width="40%" />
      </div>
    </div>
    <LoadingSkeleton height={12} rows={3} />
  </div>
);

export default LoadingSkeleton;
