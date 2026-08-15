import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { parseBody } from "next-sanity/webhook";

const secret = process.env.REVALIDATE_SECRET ?? "";

const tagByType: Record<string, string> = {
  project: "project",
  service: "service",
  about: "about",
  siteSettings: "siteSettings",
  contactInfo: "contactInfo",
  blogPost: "blogPost",
};

export async function POST(req: NextRequest) {
  let parsed;
  try {
    parsed = await parseBody(req, secret);
  } catch {
    return NextResponse.json({ revalidated: false }, { status: 401 });
  }

  if (!parsed.isValidSignature || !parsed.body) {
    return NextResponse.json({ revalidated: false }, { status: 401 });
  }

  const tag = parsed.body._type ? tagByType[parsed.body._type] : undefined;
  if (tag) {
    revalidateTag(tag, "max");
  }

  return NextResponse.json({ revalidated: true, tag: tag ?? null });
}