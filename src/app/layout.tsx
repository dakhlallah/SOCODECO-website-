import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "SOCODECO | Construction & Civil Engineering",
  description: "Leading construction and civil engineering agency in Congo DRC and Lebanon. Building excellence from residential to industrial infrastructure.",
  keywords: ["construction", "civil engineering", "Congo DRC", "Lebanon", "building", "infrastructure"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CustomCursor />
        <Navigation />
        {children}
      </body>
    </html>
  );
}
