import "server-only";

import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId, token } from "./env";

export const isSanityConfigured = Boolean(projectId && dataset);

export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token,
    })
  : null;

export async function sanityFetch<QueryResult>({
  query,
  params = {},
  tags,
  fallback,
}: {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
  fallback?: QueryResult;
}): Promise<QueryResult> {
  if (!client) return fallback ?? ([] as QueryResult);
  return client.fetch(query, params, {
    next: { revalidate: 300, tags },
  });
}
