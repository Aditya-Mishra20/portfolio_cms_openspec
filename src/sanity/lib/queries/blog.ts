import { groq } from "next-sanity";

import { sanityFetch } from "../client";

export const blogPostsQuery = groq`*[_type == "blogPost"] | order(publishedAt desc){
  title,
  slug,
  excerpt,
  "coverImage": coverImage.asset->url,
  publishedAt
}`;

export const blogPostQuery = groq`*[_type == "blogPost" && slug.current == $slug][0]{
  title,
  slug,
  excerpt,
  body,
  "coverImage": coverImage.asset->url,
  publishedAt
}`;

export type BlogPostSummary = {
  title: string;
  slug: { current: string };
  excerpt?: string;
  coverImage?: string;
  publishedAt?: string;
};

export type BlogPost = BlogPostSummary & {
  body?: { _type: string; children?: { text?: string }[] }[];
};

export async function getBlogPosts(): Promise<BlogPostSummary[]> {
  return sanityFetch<BlogPostSummary[]>({
    query: blogPostsQuery,
    tags: ["blogPost"],
    fallback: [],
  });
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  return sanityFetch<BlogPost | null>({
    query: blogPostQuery,
    params: { slug },
    tags: ["blogPost"],
    fallback: null,
  });
}