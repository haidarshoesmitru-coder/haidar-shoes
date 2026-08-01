import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import WhyChooseUs from "@/components/WhyChooseUs";
import AboutStory from "@/components/AboutStory";

export const metadata: Metadata = {
  title: "About",
  description: "The story of Haidar Shoes — a trusted footwear brand crafting stylish, comfortable shoes.",
};

export default function AboutPage() {
  return (
    <div className="pt-28 pb-16 md:pt-32 md:pb-24">
      <div className="container-lux">
        <div className="flex items-center gap-3 mb-4">
          <span className="rule-mark" />
          <p className="text-eyebrow">Our Story</p>
        </div>
        <h1 className="font-display font-bold text-4xl md:text-6xl text-ink max-w-3xl tracking-tight">
          Footwear built on craft, worn with confidence.
        </h1>
      </div>

      <AboutStory />

      <div className="container-lux mt-24">
        <SectionHeading eyebrow="What We Stand For" title="The Haidar Standard" align="center" />
        <div className="mt-12 border border-line">
          <WhyChooseUs />
        </div>
      </div>
    </div>
  );
}
