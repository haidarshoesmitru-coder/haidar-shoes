import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core neutrals — white canvas, soft warm-gray sections, near-black type
        paper: "#FFFFFF",
        canvas: "#F6F5F2",
        ink: "#141412",
        graphite: "#57564F",
        stone: "#8B8A82",
        line: "#E4E2DB",
        // Single restrained accent — a burnished clay tone referencing leather
        // tanning, used sparingly (badges, active states, focus rings) rather
        // than as a dominant brand color.
        clay: "#B5502E",
      },
      fontFamily: {
        display: ["var(--font-archivo)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.22em",
      },
      boxShadow: {
        // Deliberately soft — no heavy drop shadows anywhere in this system.
        card: "0 1px 2px rgba(20,20,18,0.04), 0 8px 24px -12px rgba(20,20,18,0.10)",
        raised: "0 2px 4px rgba(20,20,18,0.05), 0 16px 32px -16px rgba(20,20,18,0.14)",
      },
    },
  },
  plugins: [],
};
export default config;
