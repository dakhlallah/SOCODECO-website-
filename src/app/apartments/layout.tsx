import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apartments",
  description:
    "Explore residential apartments developed by SOCODECO — modern, well-located living spaces in DRC and Lebanon.",
  alternates: { canonical: "/apartments" },
  openGraph: {
    title: "Apartments | SOCODECO",
    description: "Residential apartments by SOCODECO.",
    url: "/apartments",
  },
};

export default function ApartmentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
