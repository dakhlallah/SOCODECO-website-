import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Founded in 1991, SOCODECO is a construction and civil engineering firm operating in DRC and Lebanon — meet the team and discover our story.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About SOCODECO",
    description:
      "Three decades of construction excellence across DRC and Lebanon.",
    url: "/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
