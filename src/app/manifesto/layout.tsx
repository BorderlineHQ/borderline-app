import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Manifesto | Africans Hiring Africans",
  description: "Traditional work platforms have failed the African market. Read why BorderLine is building the trust and payment protocol for intra-continental tech hiring to bypass corporate resume walls.",
  keywords: [
    "BorderLine manifesto",
    "Africans hiring Africans",
    "African tech hubs",
    "reputation protocol",
    "gig-to-career lifecycle",
    "Proof of Skill",
    "Build Score",
  ],
  alternates: {
    canonical: "/manifesto",
  },
  openGraph: {
    type: "article",
    url: "https://borderline.africa/manifesto",
    title: "Our Manifesto | Africans Hiring Africans | BorderLine",
    description: "Traditional work platforms have failed the African market. Read why BorderLine is building the trust and payment protocol for intra-continental tech hiring.",
    images: [
      {
        url: "/borderline_talent_cafe.png",
        width: 1200,
        height: 630,
        alt: "BorderLine Manifesto - Africans Hiring Africans",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Manifesto | Africans Hiring Africans | BorderLine",
    description: "Traditional work platforms have failed the African market. Read why BorderLine is building the trust and payment protocol for intra-continental tech hiring.",
    images: ["/borderline_talent_cafe.png"],
  },
};

export default function ManifestoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
