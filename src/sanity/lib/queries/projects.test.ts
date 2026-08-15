import { describe, expect, it, vi } from "vitest";

import { getFeaturedProjects, getProjects } from "./projects";

vi.mock("@/sanity/lib/client", () => ({
  sanityFetch: vi.fn(),
}));

import { sanityFetch } from "@/sanity/lib/client";

const mockedSanityFetch = vi.mocked(sanityFetch);

describe("getProjects", () => {
  it("queries projects with the project tag and an empty fallback", async () => {
    mockedSanityFetch.mockResolvedValue([]);
    const result = await getProjects();

    expect(result).toEqual([]);
    expect(mockedSanityFetch).toHaveBeenCalledWith({
      query: expect.stringContaining('*[_type == "project"]'),
      tags: ["project"],
      fallback: [],
    });
  });
});

describe("getFeaturedProjects", () => {
  it("queries only featured projects with the project tag", async () => {
    mockedSanityFetch.mockResolvedValue([]);
    await getFeaturedProjects();

    expect(mockedSanityFetch).toHaveBeenCalledWith(
      expect.objectContaining({
        query: expect.stringContaining("featured == true"),
        tags: ["project"],
        fallback: [],
      })
    );
  });
});
