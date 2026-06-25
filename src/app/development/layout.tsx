import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Under Development | Peer Circles & Growth Platform",
  description: "This section of the BorderLine platform is currently under development. We are building new features to help you upskill, grow, and connect with peer circles and opportunities across the continent.",
  robots: {
    index: false, // Don't index incomplete/development placeholder pages
    follow: true,
  },
  alternates: {
    canonical: "/development",
  },
};

export default function DevelopmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
