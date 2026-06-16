import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SOCODECO | Premium Construction & Engineering",
  description:
    "Premium construction, engineering, and real estate development company in the Democratic Republic of Congo and Lebanon. Building landmarks since 1991.",
  keywords: [
    "construction",
    "engineering",
    "real estate",
    "architecture",
    "Congo DRC",
    "Lebanon",
    "SOCODECO",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
