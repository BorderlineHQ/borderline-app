import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Talent Dashboard | Build Your AI-Verified Portfolio",
  description: "Upload raw project notes or link your code repository. The BorderLine AI compiler converts your capabilities into result-oriented case studies, bypassing corporate resume barriers.",
};

export default function TalentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
