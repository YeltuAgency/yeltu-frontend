import React from "react";
import { cn } from "../../lib/utils";

export const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "w-full px-4 py-3 rounded-xl border-2 border-slate-300 bg-white text-slate-900 resize-none",
        "focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200",
        "transition-all duration-300",
        className
      )}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";
