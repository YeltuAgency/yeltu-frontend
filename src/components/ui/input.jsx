import React from "react";
import { cn } from "../../lib/utils";

export const Input = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "w-full px-4 py-3 rounded-xl border-2 border-slate-300 bg-white text-slate-900",
        "focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200",
        "transition-all duration-300",
        className
      )}
      {...props}
    />
  );
});

Input.displayName = "Input";
