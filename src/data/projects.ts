export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  location: string;
  image: string;
  description: string;
  gallery?: string[];
}

export const projects: Project[] = [
  {
    id: "avant-project",
    title: "Avant Project",
    category: "Commercial",
    year: "2025",
    location: "Kinshasa, RDC",
    image: "/images/avant-project/avant-main.png",
    description: "Avant Project est un développement mixte visionnaire qui redéfinit la vie urbaine à Kinshasa. Ce projet ambitieux associe espaces commerciaux, tours résidentielles et équipements publics en un chef-d'œuvre architectural cohérent. La conception adopte les principes modernes d'urbanisme avec espaces verts, zones piétonnes et infrastructures durables. Avec sa tour résidentielle de luxe de 12 étages comme pièce maîtresse, Avant Project représente l'avenir du développement urbain intégré — où travail, vie et loisirs convergent en harmonie.",
    gallery: [
      "/images/avant-project/avant-cityblock-1.png",
      "/images/avant-project/avant-cityblock-2.png",
      "/images/avant-project/avant-tower.png",
      "/images/avant-project/avant-detail.png",
      "/images/avant-project/avant-view-1.png",
      "/images/avant-project/avant-view-2.png",
      "/images/avant-project/avant-view-3.png",
    ],
  },
  {
    id: "quantum-building",
    title: "Immeuble Quantum",
    category: "Commercial",
    year: "2021",
    location: "Kinshasa, RDC",
    image: "/images/immeuble-quantum.png",
    description: "L'Immeuble Quantum est un repère moderne conçu pour la clarté, le confort et la performance. Sa façade épurée et ses lignes raffinées reflètent une vision contemporaine où l'architecture rencontre l'efficacité quotidienne. Le bâtiment offre des espaces bien planifiés baignés de lumière naturelle, des agencements intelligents et des finitions de haute qualité. Chaque détail favorise la productivité et le bien-être. L'Immeuble Quantum est idéal pour les entreprises et résidents recherchant un environnement moderne et fiable.",
  },
  {
    id: "angie-building",
    title: "Résidence Angie",
    category: "Résidentiel",
    year: "2020",
    location: "Kinshasa, RDC",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    description: "Un complexe résidentiel prestigieux démontrant notre engagement envers la qualité de construction et les standards de vie modernes au cœur de Kinshasa.",
  },
  {
    id: "kanga-building",
    title: "Immeuble Kanga",
    category: "Commercial",
    year: "2019",
    location: "Kinshasa, RDC",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    description: "Un complexe commercial intégré comprenant des bureaux de catégorie A et des commerces premium, construit avec l'attention caractéristique de SOCODECO pour l'excellence structurelle.",
  },
  {
    id: "zenufa-office",
    title: "Bureaux Zenufa",
    category: "Commercial",
    year: "2021",
    location: "Kingabwa, RDC",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
    description: "L'un des aménagements de bureaux les plus innovants de Kingabwa, illustrant nos capacités en architecture intérieure avec des solutions de design sur mesure.",
  },
  {
    id: "cbfc-building",
    title: "Immeuble CBFC",
    category: "Commercial",
    year: "2020",
    location: "Kinshasa, RDC",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    description: "Un bâtiment commercial conçu sur mesure pour répondre aux normes opérationnelles internationales, mettant en valeur notre expertise en fondations et travaux structurels.",
  },
  {
    id: "villa-residence",
    title: "Villa Résidence",
    category: "Résidentiel",
    year: "2019",
    location: "Kinshasa, RDC",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    description: "Une résidence privée exclusive présentant une architecture contemporaine, des solutions de conception durables et une excellence de construction clé en main.",
  },
  {
    id: "family-building-lebanon",
    title: "Résidence Familiale",
    category: "Résidentiel",
    year: "2018",
    location: "Beyrouth, Liban",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    description: "Un développement résidentiel premium au Liban offrant des espaces de vie raffinés, démontrant nos capacités de construction inter-régionales.",
  },
  {
    id: "betika-shop",
    title: "Boutique Betika",
    category: "Commercial",
    year: "2021",
    location: "Kinshasa, RDC",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    description: "Un espace commercial moderne avec identité visuelle personnalisée, agencement et solutions de design intérieur reflétant nos services de construction complets.",
  },
];

export const categories = ["Tous", "Résidentiel", "Commercial", "Industriel"];
