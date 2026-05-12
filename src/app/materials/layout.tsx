import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Materials",
  description:
    "Discover the materials and finishes SOCODECO uses to deliver durable, high-quality construction projects.",
  alternates: { canonical: "/materials" },
  openGraph: {
    title: "Materials | SOCODECO",
    description: "Materials and finishes used in our construction projects.",
    url: "/materials",
  },
};

export default function MaterialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
