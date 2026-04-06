import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

export function Card({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-lg border border-[color:var(--color-border)] bg-white p-6 shadow-ambient transition-all duration-150 hover:shadow-elevated hover:border-[color:var(--color-border)]/60",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardDark({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-lg bg-card border border-white/10 p-6 transition-all duration-150 hover:border-primary-light/30",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
