"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Droplets } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--color-border)]/60 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Droplets className="h-6 w-6 text-primary" strokeWidth={1.5} />
          <div className="flex flex-col leading-none">
            <span className="text-[15px] font-normal tracking-tight text-dark">
              Jal Neeti
            </span>
            <span className="text-[9px] tracking-[0.15em] text-[color:var(--color-body)] uppercase">
              Technologies
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-2.5 py-1.5 rounded text-[13px] font-normal text-[color:var(--color-label)] transition-colors hover:text-primary",
                link.highlight &&
                  "bg-accent text-white font-medium hover:bg-accent/90 hover:text-white ml-2 px-3"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-[color:var(--color-label)] hover:text-primary"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="lg:hidden border-t border-[color:var(--color-border)] bg-white px-4 py-3 space-y-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "block px-4 py-2.5 rounded text-sm font-normal text-[color:var(--color-label)] hover:text-primary hover:bg-primary/5",
                link.highlight &&
                  "bg-accent text-white font-medium hover:bg-accent/90 hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
