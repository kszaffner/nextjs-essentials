import { ImageResponse } from "next/og";

// The size and type every image in this project uses (the usual 1.91:1 card).
export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;
export const OG_IMAGE_CONTENT_TYPE = "image/png";

type OgCardProps = {
  title: string;
  subtitle: string;
};

// ImageResponse renders with Satori: flexbox and a subset of CSS only (no
// grid), so every container with children is a flex box with inline styles.
function OgCard({ title, subtitle }: OgCardProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        padding: 80,
        background: "#0b57d0",
        color: "#ffffff",
      }}
    >
      <div style={{ display: "flex", fontSize: 30, opacity: 0.8 }}>nextjs-essentials</div>
      <div style={{ display: "flex", fontSize: 76, fontWeight: 700, marginTop: 24 }}>{title}</div>
      <div style={{ display: "flex", fontSize: 34, marginTop: 24, opacity: 0.9 }}>{subtitle}</div>
    </div>
  );
}

export function renderOgImage(title: string, subtitle: string): ImageResponse {
  return new ImageResponse(<OgCard title={title} subtitle={subtitle} />, OG_IMAGE_SIZE);
}
