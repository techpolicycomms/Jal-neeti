import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "primary" | "accent" | "success" | "water";
}

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        {
          "bg-gray-100 text-gray-700": variant === "default",
          "bg-primary/10 text-primary": variant === "primary",
          "bg-accent/10 text-accent": variant === "accent",
          "bg-bio/10 text-bio": variant === "success",
          "bg-water/10 text-water": variant === "water",
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
