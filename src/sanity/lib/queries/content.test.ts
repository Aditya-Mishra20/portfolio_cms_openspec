import { describe, expect, it, vi } from "vitest";

import { getAbout, getContactInfo, getServices } from "./content";

vi.mock("@/sanity/lib/client", () => ({
  sanityFetch: vi.fn(),
}));

import { sanityFetch } from "@/sanity/lib/client";

const mockedSanityFetch = vi.mocked(sanityFetch);

describe("content queries", () => {
  it("getServices fetches services ordered by `order`", async () => {
    mockedSanityFetch.mockResolvedValue([]);
    await getServices();

    expect(mockedSanityFetch).toHaveBeenCalledWith({
      query: expect.stringContaining('*[_type == "service"]'),
      tags: ["service"],
      fallback: [],
    });
  });

  it("getAbout fetches the first about document with a null fallback", async () => {
    mockedSanityFetch.mockResolvedValue(null);
    const result = await getAbout();

    expect(result).toBeNull();
    expect(mockedSanityFetch).toHaveBeenCalledWith({
      query: expect.stringContaining('*[_type == "about"][0]'),
      tags: ["about"],
      fallback: null,
    });
  });

  it("getContactInfo fetches contact info with a null fallback", async () => {
    mockedSanityFetch.mockResolvedValue(null);
    await getContactInfo();

    expect(mockedSanityFetch).toHaveBeenCalledWith({
      query: expect.stringContaining('*[_type == "contactInfo"][0]'),
      tags: ["contactInfo"],
      fallback: null,
    });
  });
});
