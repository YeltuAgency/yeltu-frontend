import React, { useState } from "react";

const ERROR_IMG =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==";

export function ImageWithFallback(props) {
  const [hasError, setHasError] = useState(false);

  const { src, alt, className = "", ...rest } = props;
  const safeAlt = alt ?? "";

  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 text-gray-400 ${className}`}
        aria-label={safeAlt || "Image could not be loaded"}
      >
        <img
          src={ERROR_IMG}
          alt={safeAlt}
          loading="lazy"
          className={className}
          {...rest}
        />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={safeAlt}
      loading="lazy"
      className={className}
      onError={() => setHasError(true)}
      {...rest}
    />
  );
}
