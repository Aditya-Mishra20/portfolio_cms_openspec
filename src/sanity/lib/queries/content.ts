import { groq } from "next-sanity";

import { sanityFetch } from "../client";

export const servicesQuery = groq`*[_type == "service"] | order(order asc){
  name,
  description,
  icon
}`;

export const aboutQuery = groq`*[_type == "about"][0]{
  bio,
  skills,
  experience[] { role, company, period, summary },
  socialLinks[] { label, url }
}`;

export const contactInfoQuery = groq`*[_type == "contactInfo"][0]{
  email,
  phone,
  location,
  availability
}`;

export type Service = {
  name: string;
  description?: string;
  icon?: string;
};

export type ExperienceEntry = {
  role?: string;
  company?: string;
  period?: string;
  summary?: string;
};

export type About = {
  bio?: { _type: string; children?: { text?: string }[] }[];
  skills?: string[];
  experience?: ExperienceEntry[];
  socialLinks?: { label: string; url: string }[];
};

export type ContactInfo = {
  email?: string;
  phone?: string;
  location?: string;
  availability?: "available" | "limited" | "unavailable";
};

export async function getServices(): Promise<Service[]> {
  return sanityFetch<Service[]>({
    query: servicesQuery,
    tags: ["service"],
    fallback: [],
  });
}

export async function getAbout(): Promise<About | null> {
  return sanityFetch<About | null>({
    query: aboutQuery,
    tags: ["about"],
    fallback: null,
  });
}

export async function getContactInfo(): Promise<ContactInfo | null> {
  return sanityFetch<ContactInfo | null>({
    query: contactInfoQuery,
    tags: ["contactInfo"],
    fallback: null,
  });
}