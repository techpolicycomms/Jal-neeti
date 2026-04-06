import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  variant?: "default" | "dark" | "teal" | "light";
}

export function Section({
  className,
  variant = "default",
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "py-20 px-4 sm:px-6 lg:px-8 md:py-28",
        {
          "bg-white": variant === "default",
          "bg-dark text-white": variant === "dark",
          "bg-primary text-white": variant === "teal",
          "bg-[#FAFBFC]": variant === "light",
        },
        className
      )}
      {...props}
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

export function SectionHeader({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("text-center max-w-3xl mx-auto mb-16 md:mb-20", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function SectionTitle({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn(
        "text-3xl md:text-4xl lg:text-5xl font-light tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

export function SectionDescription({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "mt-5 text-lg md:text-xl font-light text-[color:var(--color-body)] leading-relaxed",
        className
      )}
      {...props}
    >
      {children}
    </p>
  );
}
