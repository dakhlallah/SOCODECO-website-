import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Architecture",
  description:
    "Architectural design and execution by SOCODECO — combining technical rigor with contemporary aesthetics.",
  alternates: { canonical: "/architecture" },
  openGraph: {
    title: "Architecture | SOCODECO",
    description: "Architectural design and execution by SOCODECO.",
    url: "/architecture",
  },
};

export default function ArchitectureLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
