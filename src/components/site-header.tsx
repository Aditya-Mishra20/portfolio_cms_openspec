import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";
import type { SiteSettings } from "@/sanity/lib/queries/siteSettings";

export function SiteHeader({ settings }: { settings: SiteSettings | null }) {
  const navLinks = settings?.navLinks?.length
    ? settings.navLinks
    : [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Work", href: "/work" },
        { label: "Services", href: "/services" },
        { label: "Contact", href: "/contact" },
      ];

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40 border-b backdrop-blur">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="font-semibold tracking-tight">
          {settings?.siteTitle ?? "Portfolio"}
        </Link>
        <nav className="flex items-center gap-6" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-foreground text-sm transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
