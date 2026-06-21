import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Try our Whatsapp Bot | BorderLine",
  description: "Test the offline-native capabilities of the BorderLine platform. Simulate text commands to create profiles, check matches, and apply for contracts via WhatsApp.",
};

export default function WhatsAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
