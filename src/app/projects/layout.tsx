import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Browse SOCODECO's portfolio of residential, commercial, and industrial construction projects across DRC and Lebanon.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects | SOCODECO",
    description: "Selected construction and civil engineering projects.",
    url: "/projects",
  },
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
