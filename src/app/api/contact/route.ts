import { NextResponse } from "next/server";

type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

function isValid(payload: unknown): payload is ContactPayload {
  if (!payload || typeof payload !== "object") return false;
  const { name, email, message } = payload as Record<string, unknown>;
  if (typeof name !== "string" || !name.trim()) return false;
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return false;
  if (typeof message !== "string" || !message.trim()) return false;
  return true;
}

export async function POST(request: Request) {
  const apiKey = process.env.EMAIL_SERVICE_API_KEY ?? "";
  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";
  const toEmail = process.env.CONTACT_TO_EMAIL ?? "";

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }

  if (!isValid(payload)) {
    return NextResponse.json(
      { error: "Name, email, and message are required" },
      { status: 400 }
    );
  }

  if (!apiKey) {
    return NextResponse.json(
      { error: "Email service is not configured" },
      { status: 500 }
    );
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      subject: `New contact message from ${payload.name}`,
      reply_to: payload.email,
      text: `${payload.message}\n\nFrom: ${payload.name} <${payload.email}>`,
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
