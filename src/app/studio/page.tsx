import type { Metadata } from "next";
import StudioPage from "./StudioPage";

export const metadata: Metadata = {
  title: "Studio",
  description:
    "ATELIER NOVA — une architecture contemporaine pensée comme une expérience sensorielle, où esthétique, technologie et émotion fusionnent.",
  alternates: { canonical: "/studio" },
  openGraph: {
    title: "Studio | ATELIER NOVA",
    description:
      "Notre approche : écouter le lieu, dessiner l'intention, construire la matière.",
    url: "/studio",
  },
};

export default function Page() {
  return <StudioPage />;
}
