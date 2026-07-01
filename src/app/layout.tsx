import type { Metadata } from "next";
import { DM_Sans, Inter, JetBrains_Mono, Lora } from "next/font/google";
import "./globals.css";
import { AppProvider } from "../context/AppContext";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const dmSans = DM_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const lora = Lora({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://borderline.africa"),
  title: {
    default: "BorderLine | Trust Infrastructure for Africa's Digital Builders",
    template: "%s | BorderLine",
  },
  description: "AI-powered economic infrastructure that verifies, connects, and monetizes Africa's emerging digital builders. Bypassing corporate resume walls via automated skill verification, smart matching, and cross-border escrow settled via Mobile Money.",
  keywords: [
    "Africa tech talent",
    "verified developer portfolio",
    "WhatsApp job matching",
    "African startups hiring",
    "Proof of Skill",
    "Build Score",
    "escrow payments",
    "mobile money jobs",
    "hire software engineers Africa",
    "remote African developers",
    "freelance gig marketplace",
  ],
  authors: [{ name: "Team 4 (Africoded)" }],
  creator: "Team 4 (Africoded)",
  publisher: "BorderLine",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://borderline.africa",
    siteName: "BorderLine",
    title: "BorderLine | Trust Infrastructure for Africa's Digital Builders",
    description: "AI-powered economic infrastructure that verifies, connects, and monetizes Africa's emerging digital builders. WhatsApp-native profile management and escrow payments.",
    images: [
      {
        url: "/borderline_talent_cafe.png",
        width: 1200,
        height: 630,
        alt: "BorderLine - Connecting Africa's Top Digital Talent",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BorderLine | Trust Infrastructure for Africa's Digital Builders",
    description: "AI-powered economic infrastructure that verifies, connects, and monetizes Africa's emerging digital builders.",
    images: ["/borderline_talent_cafe.png"],
    creator: "@borderline_africa",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export const viewport = {
  themeColor: "#030712",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${inter.variable} ${jetbrainsMono.variable} ${lora.variable}`}>
      <body className="light-theme">
        <AppProvider>
          <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Header />
            <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              {children}
            </main>
            <Footer />
          </div>
        </AppProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
