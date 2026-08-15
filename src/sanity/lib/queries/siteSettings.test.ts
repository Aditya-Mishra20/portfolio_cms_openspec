import { describe, expect, it, vi } from "vitest";

import { getSiteSettings } from "./siteSettings";

vi.mock("@/sanity/lib/client", () => ({
  sanityFetch: vi.fn(),
}));

import { sanityFetch } from "@/sanity/lib/client";

const mockedSanityFetch = vi.mocked(sanityFetch);

describe("getSiteSettings", () => {
  it("fetches site settings with the siteSettings tag and a null fallback", async () => {
    mockedSanityFetch.mockResolvedValue(null);
    const result = await getSiteSettings();

    expect(result).toBeNull();
    expect(mockedSanityFetch).toHaveBeenCalledWith({
      query: expect.stringContaining('*[_type == "siteSettings"][0]'),
      tags: ["siteSettings"],
      fallback: null,
    });
  });
});
