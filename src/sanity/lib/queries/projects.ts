import { groq } from "next-sanity";

import { sanityFetch } from "../client";

export const projectsQuery = groq`*[_type == "project"] | order(date desc){
  title,
  slug,
  description,
  techStack,
  "images": images[].asset->url,
  liveUrl,
  repoUrl,
  featured,
  date
}`;

export const featuredProjectsQuery = groq`*[_type == "project" && featured == true] | order(date desc){
  title,
  slug,
  description,
  techStack,
  "images": images[].asset->url,
  liveUrl,
  repoUrl,
  date
}`;

export type Project = {
  title: string;
  slug: { current: string };
  description?: string;
  techStack?: string[];
  images?: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
  date?: string;
};

export async function getProjects(): Promise<Project[]> {
  return sanityFetch<Project[]>({
    query: projectsQuery,
    tags: ["project"],
    fallback: [],
  });
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return sanityFetch<Project[]>({
    query: featuredProjectsQuery,
    tags: ["project"],
    fallback: [],
  });
}