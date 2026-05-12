import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";
import { LanguageProvider } from "@/contexts/LanguageContext";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://socodeco.org";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SOCODECO | Construction & Civil Engineering",
    template: "%s | SOCODECO",
  },
  description:
    "Leading construction and civil engineering agency in Congo DRC and Lebanon. Building excellence from residential to industrial infrastructure.",
  keywords: [
    "construction",
    "civil engineering",
    "Congo DRC",
    "Lebanon",
    "building",
    "infrastructure",
    "SOCODECO",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "SOCODECO",
    url: SITE_URL,
    title: "SOCODECO | Construction & Civil Engineering",
    description:
      "Leading construction and civil engineering agency in Congo DRC and Lebanon.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SOCODECO | Construction & Civil Engineering",
    description:
      "Leading construction and civil engineering agency in Congo DRC and Lebanon.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="antialiased">
        <LanguageProvider>
          <CustomCursor />
          <Navigation />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
