import Link from "next/link";

import type { SiteSettings } from "@/sanity/lib/queries/siteSettings";

export function SiteFooter({
  settings,
}: {
  settings: SiteSettings | null;
}) {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-8 text-center">
        <p className="text-sm text-muted-foreground">
          {settings?.footerContent ?? "Built with Next.js and Sanity."}
        </p>
        {settings?.socialLinks?.length ? (
          <div className="flex gap-4">
            {settings.socialLinks.map((link) => (
              <Link
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </footer>
  );
}