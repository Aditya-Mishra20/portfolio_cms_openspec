import { ImageResponse } from "next/og";

import { getSiteSettings } from "@/sanity/lib/queries/siteSettings";

export const alt = "Portfolio site";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const settings = await getSiteSettings();
  const title = settings?.siteTitle ?? "Portfolio";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 700 }}>{title}</div>
        <div style={{ fontSize: 32, marginTop: 16, color: "#a1a1aa" }}>
          Developer portfolio
        </div>
      </div>
    ),
    { ...size },
  );
}