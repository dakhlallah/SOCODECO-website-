import type { Metadata } from "next";
import ProjectsIndex from "./ProjectsIndex";

export const metadata: Metadata = {
  title: "Projets",
  description:
    "Le portfolio d'ATELIER NOVA — résidences, tours et espaces culturels où la lumière et la matière composent une même partition.",
  alternates: { canonical: "/projets" },
  openGraph: {
    title: "Projets | ATELIER NOVA",
    description:
      "Une sélection d'œuvres d'architecture contemporaine signées ATELIER NOVA.",
    url: "/projets",
  },
};

export default function ProjetsPage() {
  return <ProjectsIndex />;
}
