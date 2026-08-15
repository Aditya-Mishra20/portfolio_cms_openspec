import { describe, expect, it, vi } from "vitest";

import { getBlogPost, getBlogPosts } from "./blog";

vi.mock("@/sanity/lib/client", () => ({
  sanityFetch: vi.fn(),
}));

import { sanityFetch } from "@/sanity/lib/client";

const mockedSanityFetch = vi.mocked(sanityFetch);

describe("blog queries", () => {
  it("getBlogPosts fetches all posts with the blogPost tag", async () => {
    mockedSanityFetch.mockResolvedValue([]);
    await getBlogPosts();

    expect(mockedSanityFetch).toHaveBeenCalledWith({
      query: expect.stringContaining('*[_type == "blogPost"]'),
      tags: ["blogPost"],
      fallback: [],
    });
  });

  it("getBlogPost fetches a single post by slug", async () => {
    mockedSanityFetch.mockResolvedValue(null);
    const result = await getBlogPost("my-post");

    expect(result).toBeNull();
    expect(mockedSanityFetch).toHaveBeenCalledWith({
      query: expect.stringContaining("$slug"),
      params: { slug: "my-post" },
      tags: ["blogPost"],
      fallback: null,
    });
  });
});
