import Link from "next/link";
import { Droplets, Mail, Phone, MapPin } from "lucide-react";
import { BRAND } from "@/lib/constants";

const footerLinks = {
  "For CSR Teams": [
    { label: "CSR Partnership Programme", href: "/csr" },
    { label: "Impact Calculator", href: "/impact-calculator" },
    { label: "Transparency Dashboard", href: "/transparency" },
    { label: "Schedule a Call", href: "/contact?category=partnership" },
  ],
  "For Industry": [
    { label: "Industrial Water Reuse", href: "/for-industry" },
    { label: "Water Quality Data", href: "/transparency" },
    { label: "Get a Quote", href: "/contact?category=customer" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Product", href: "/product" },
    { label: "For Government", href: "/government" },
    { label: "Invest", href: "/invest" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
    { label: "Challenge 2026", href: "/challenge" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-dark text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Droplets className="h-8 w-8 text-primary-light" />
              <div className="flex flex-col leading-none">
                <span className="text-lg font-bold" style={{ fontFamily: "var(--font-heading)" }}>
                  Jal Neeti
                </span>
                <span className="text-[10px] tracking-widest text-gray-400 uppercase">
                  Technologies
                </span>
              </div>
            </Link>
            <p className="text-primary-light font-medium italic mb-2">
              {BRAND.tagline}
            </p>
            <p className="text-sm text-gray-400 mb-6 max-w-sm">
              {BRAND.taglineEnglish} — Containerized, solar-powered,
              IoT-monitored sewage treatment plants built with 100% Indian
              materials.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary-light" />
                <span>Geneva, Switzerland | Noida, India (2026)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary-light" />
                <span>rahul@jalneeti.in</span>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-300 mb-4">
                {title}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 hover:text-primary-light transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} {BRAND.company}. All rights
            reserved.
          </p>
          <p className="text-xs text-gray-500">
            Made with purpose in India
          </p>
        </div>
      </div>
    </footer>
  );
}
