import React, { useState } from 'react';

interface LogoWithSkeletonProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  fallbackText?: string;
}

export const LogoWithSkeleton: React.FC<LogoWithSkeletonProps> = ({
  src,
  alt,
  className = 'max-w-full max-h-full object-contain',
  containerClassName = 'relative w-full h-full flex items-center justify-center',
  fallbackText,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <div className={containerClassName}>
      {/* Subtle Skeleton Placeholder */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center p-1">
          <div className="w-4/5 h-3/5 bg-slate-200/70 animate-pulse rounded-md overflow-hidden relative">
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-[shimmer_1.5s_infinite]" />
          </div>
        </div>
      )}

      {/* Fallback if image failed to load */}
      {hasError ? (
        <span className="text-[11px] font-bold leading-tight tracking-tight whitespace-pre-line px-1 text-slate-700">
          {fallbackText || alt}
        </span>
      ) : (
        /* Actual Logo Image */
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          className={`${className} transition-opacity duration-300 ${
            isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        />
      )}
    </div>
  );
};
