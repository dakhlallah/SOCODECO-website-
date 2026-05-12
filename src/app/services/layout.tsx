import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "General contracting, steel construction, façades, and BIM — explore SOCODECO's full range of construction and civil engineering services.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services | SOCODECO",
    description:
      "General contracting, steel construction, façades and BIM services.",
    url: "/services",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
