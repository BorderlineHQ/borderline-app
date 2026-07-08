import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Teams & Payments | Manage Your African Teams",
  description: "Manage distributed teams across Africa. Process cross-border payments in local currencies — GHS, NGN, ZAR, KES, XOF. Track payment history and team performance from one dashboard.",
};

export default function TeamsPaymentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
