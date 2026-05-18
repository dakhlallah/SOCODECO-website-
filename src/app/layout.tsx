import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ateliernova.fr";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ATELIER NOVA — Architecture • Innovation • Expérience",
    template: "%s | ATELIER NOVA",
  },
  description:
    "ATELIER NOVA conçoit des architectures contemporaines intemporelles où innovation, lumière et expérience humaine fusionnent.",
  keywords: [
    "architecture",
    "studio d'architecture",
    "architecture contemporaine",
    "design intérieur",
    "BIM",
    "ATELIER NOVA",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "ATELIER NOVA",
    locale: "fr_FR",
    url: SITE_URL,
    title: "ATELIER NOVA — Architecture • Innovation • Expérience",
    description:
      "Studio d'architecture contemporaine. Des œuvres qui habitent le paysage.",
  },
  twitter: {
    card: "summary_large_image",
    title: "ATELIER NOVA — Architecture • Innovation • Expérience",
    description:
      "Studio d'architecture contemporaine. Des œuvres qui habitent le paysage.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
