import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { POST } from "./route";

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.stubEnv("EMAIL_SERVICE_API_KEY", "test-key");
    vi.stubEnv("CONTACT_FROM_EMAIL", "test@example.com");
    vi.stubEnv("CONTACT_TO_EMAIL", "to@example.com");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("returns 400 for an invalid JSON body", async () => {
    const response = await POST(new Request("http://localhost/api/contact"));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "Invalid request body",
    });
  });

  it("returns 400 when fields are missing", async () => {
    const response = await POST(
      new Request("http://localhost/api/contact", {
        method: "POST",
        body: JSON.stringify({ name: "", email: "not-an-email", message: "" }),
        headers: { "Content-Type": "application/json" },
      })
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      error: "Name, email, and message are required",
    });
  });

  it("returns 500 when the email service is not configured", async () => {
    vi.stubEnv("EMAIL_SERVICE_API_KEY", "");

    const response = await POST(
      new Request("http://localhost/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: "Alice",
          email: "alice@example.com",
          message: "Hello",
        }),
        headers: { "Content-Type": "application/json" },
      })
    );

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      error: "Email service is not configured",
    });
  });

  it("returns 502 when the email provider fails", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("boom", { status: 500 }))
    );

    const response = await POST(
      new Request("http://localhost/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: "Alice",
          email: "alice@example.com",
          message: "Hello",
        }),
        headers: { "Content-Type": "application/json" },
      })
    );

    expect(response.status).toBe(502);
    await expect(response.json()).resolves.toEqual({
      error: "Failed to send message",
    });
  });

  it("sends the message via Resend and returns ok", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(
      new Request("http://localhost/api/contact", {
        method: "POST",
        body: JSON.stringify({
          name: "Alice",
          email: "alice@example.com",
          message: "Hello there",
        }),
        headers: { "Content-Type": "application/json" },
      })
    );

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true });

    expect(fetchMock).toHaveBeenCalledWith("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: "Bearer test-key",
        "Content-Type": "application/json",
      },
      body: expect.stringContaining('"from":"test@example.com"'),
    });
  });
});
