import type { Metadata } from "next";
import ServicesPage from "./ServicesPage";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Architecture résidentielle et commerciale, design intérieur, BIM & visualisation 3D — la maîtrise complète d'ATELIER NOVA, de l'idée à la matière.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services | ATELIER NOVA",
    description:
      "Quatre domaines d'intervention, une même exigence : la justesse.",
    url: "/services",
  },
};

export default function Page() {
  return <ServicesPage />;
}
