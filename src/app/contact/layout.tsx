import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with SOCODECO — offices in Kinshasa (DRC) and Beirut (Lebanon). Reach out for project inquiries and partnerships.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact SOCODECO",
    description: "Reach our offices in Kinshasa and Beirut.",
    url: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
