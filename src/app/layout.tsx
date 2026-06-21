import type { Metadata } from "next";
import { DM_Sans, Inter, JetBrains_Mono, Lora } from "next/font/google";
import "./globals.css";
import { AppProvider } from "../context/AppContext";
import Header from "../components/shared/Header";

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
  title: "BorderLine | Trust Infrastructure for Africa's Digital Builders",
  description: "AI-powered economic infrastructure that verifies, connects, and monetizes the continent's emerging builders. Resume-free matching and WhatsApp-native profile management.",
  icons: {
    icon: "/icon.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${inter.variable} ${jetbrainsMono.variable} ${lora.variable}`}>
      <body>
        <AppProvider>
          <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Header />
            <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
              {children}
            </main>
          </div>
        </AppProvider>
      </body>
    </html>
  );
}
