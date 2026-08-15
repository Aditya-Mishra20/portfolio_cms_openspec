import { groq } from "next-sanity";

import { sanityFetch } from "../client";

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  siteTitle,
  siteDescription,
  navLinks[] { label, href },
  footerContent,
  heroHeading,
  heroIntroduction,
  socialLinks[] { label, url }
}`;

export type SiteSettings = {
  siteTitle: string;
  siteDescription?: string;
  navLinks?: { label: string; href: string }[];
  footerContent?: string;
  heroHeading?: string;
  heroIntroduction?: string;
  socialLinks?: { label: string; url: string }[];
};

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return sanityFetch<SiteSettings | null>({
    query: siteSettingsQuery,
    tags: ["siteSettings"],
    fallback: null,
  });
}