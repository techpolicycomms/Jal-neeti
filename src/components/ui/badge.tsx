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
        "inline-flex items-center rounded border px-2 py-0.5 text-[11px] font-medium tracking-wide uppercase",
        {
          "bg-gray-50 text-gray-600 border-gray-200": variant === "default",
          "bg-primary/5 text-primary border-primary/20": variant === "primary",
          "bg-accent/5 text-accent border-accent/20": variant === "accent",
          "bg-bio/5 text-bio border-bio/20": variant === "success",
          "bg-water/5 text-water border-water/20": variant === "water",
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
