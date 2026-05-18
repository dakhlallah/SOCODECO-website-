export interface NovaProject {
  slug: string;
  name: string;
  type: string;
  location: string;
  year: string;
  surface: string;
  cover: string;
  intro: string;
  narrative: string[];
  gallery: string[];
}

export const novaProjects: NovaProject[] = [
  {
    slug: "villa-horizon",
    name: "Villa Horizon",
    type: "Résidence privée",
    location: "Genève, Suisse",
    year: "2025",
    surface: "850 m²",
    cover:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=2000&q=85",
    intro:
      "Une villa suspendue entre lac et forêt, pensée comme une ligne d'horizon habitée.",
    narrative: [
      "Villa Horizon prolonge le paysage plutôt qu'elle ne s'y oppose. Les volumes bas s'étirent vers le lac, capturant la lumière rasante du soir dans des espaces de vie continus.",
      "La matérialité — pierre locale, chêne fumé, béton ciré — installe une atmosphère silencieuse où chaque transition est dessinée pour le corps et le regard.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=85",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=85",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1600&q=85",
    ],
  },
  {
    slug: "maison-lumiere",
    name: "Maison Lumière",
    type: "Résidence privée",
    location: "Annecy, France",
    year: "2024",
    surface: "420 m²",
    cover:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=2000&q=85",
    intro:
      "Une architecture conçue autour d'un seul geste : faire entrer le jour.",
    narrative: [
      "Maison Lumière organise ses pièces autour d'un patio central qui agit comme un puits de lumière vivant, mesurant le temps au fil des heures.",
      "Les façades minérales se referment sur l'extérieur pour mieux s'ouvrir sur le cœur intime de la maison.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1600&q=85",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb3?w=1600&q=85",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=85",
    ],
  },
  {
    slug: "nexus-tower",
    name: "Nexus Tower",
    type: "Tour de bureaux",
    location: "Paris, France",
    year: "2024",
    surface: "24 000 m²",
    cover:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=2000&q=85",
    intro:
      "Une verticalité sculptée par la lumière et la transparence structurelle.",
    narrative: [
      "Nexus Tower repense l'immeuble de bureaux comme un organisme respirant : doubles peaux ventilées, atriums plantés et lumière naturelle jusqu'au cœur des plateaux.",
      "La trame structurelle, exprimée en façade, devient l'ornement même de l'édifice.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=85",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=85",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=85",
    ],
  },
  {
    slug: "pavilion-27",
    name: "Pavilion 27",
    type: "Espace culturel",
    location: "Lyon, France",
    year: "2023",
    surface: "1 900 m²",
    cover:
      "https://images.unsplash.com/photo-1481253127861-534498168948?w=2000&q=85",
    intro:
      "Un pavillon-paysage où l'art et l'architecture partagent la même respiration.",
    narrative: [
      "Pavilion 27 efface la limite entre intérieur et extérieur grâce à une toiture flottante portée par de fines colonnes d'acier.",
      "L'espace d'exposition se module librement, laissant la lumière zénithale composer la scénographie.",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1600&q=85",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=85",
      "https://images.unsplash.com/photo-1481253127861-534498168948?w=1600&q=85",
    ],
  },
];

export function getNovaProject(slug: string) {
  return novaProjects.find((p) => p.slug === slug);
}
