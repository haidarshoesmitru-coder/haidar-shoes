import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Haidar Shoes — Premium Footwear";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function TwitterImage() {
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
          backgroundColor: "#FFFFFF",
        }}
      >
        <div
          style={{
            fontSize: 92,
            fontWeight: 800,
            color: "#141412",
            letterSpacing: "-0.02em",
            display: "flex",
          }}
        >
          Haidar&nbsp;<span style={{ color: "#B5502E" }}>Shoes</span>
        </div>
        <div
          style={{
            marginTop: 22,
            fontSize: 26,
            color: "#57564F",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            display: "flex",
          }}
        >
          Step Into Style &amp; Comfort
        </div>
        <div
          style={{
            marginTop: 44,
            width: 100,
            height: 3,
            backgroundColor: "#141412",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
