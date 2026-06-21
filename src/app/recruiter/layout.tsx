import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recruiter Dashboard | Source Verified Tech Builders",
  description: "Find, review, and hire early-career digital builders from Africa. Access AI-compiled portfolio case studies, filter candidates by verified technical skills, and manage gig applications.",
};

export default function RecruiterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
