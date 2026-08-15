import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { POST } from "./route";

vi.mock("next-sanity/webhook", () => ({
  parseBody: vi.fn(),
}));

vi.mock("next/cache", () => ({
  revalidateTag: vi.fn(),
}));

import { revalidateTag } from "next/cache";
import { parseBody } from "next-sanity/webhook";

const mockedParseBody = vi.mocked(parseBody);
const mockedRevalidateTag = vi.mocked(revalidateTag);

function webhookRequest(body: unknown) {
  return new NextRequest("http://localhost/api/revalidate", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
}

describe("POST /api/revalidate", () => {
  beforeEach(() => {
    vi.stubEnv("REVALIDATE_SECRET", "secret");
    vi.clearAllMocks();
  });

  it("returns 401 when the signature is invalid", async () => {
    mockedParseBody.mockResolvedValue({
      isValidSignature: false,
      body: { _type: "project" },
    });

    const response = await POST(webhookRequest({ _type: "project" }));

    expect(response.status).toBe(401);
    expect(mockedRevalidateTag).not.toHaveBeenCalled();
  });

  it("returns 401 when parseBody throws", async () => {
    mockedParseBody.mockRejectedValue(new Error("bad body"));

    const response = await POST(webhookRequest({ _type: "project" }));

    expect(response.status).toBe(401);
    expect(mockedRevalidateTag).not.toHaveBeenCalled();
  });

  it("revalidates the mapped tag for a known document type", async () => {
    mockedParseBody.mockResolvedValue({
      isValidSignature: true,
      body: { _type: "project" },
    });

    const response = await POST(webhookRequest({ _type: "project" }));

    expect(response.status).toBe(200);
    expect(mockedRevalidateTag).toHaveBeenCalledWith("project", "max");
    await expect(response.json()).resolves.toEqual({
      revalidated: true,
      tag: "project",
    });
  });

  it("revalidates nothing for an unknown type but still returns 200", async () => {
    mockedParseBody.mockResolvedValue({
      isValidSignature: true,
      body: { _type: "unknown" },
    });

    const response = await POST(webhookRequest({ _type: "unknown" }));

    expect(response.status).toBe(200);
    expect(mockedRevalidateTag).not.toHaveBeenCalled();
    await expect(response.json()).resolves.toEqual({
      revalidated: true,
      tag: null,
    });
  });
});
