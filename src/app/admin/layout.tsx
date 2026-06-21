import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Console | Auditing Queue & System Logs",
  description: "Ecosystem manager dashboard for BorderLine. Audit candidate project submissions, approve AI-generated case studies, toggle verified trust badges, and monitor database transaction logs.",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
