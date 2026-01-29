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
    location: "Kinshasa, DRC",
    image: "/images/avant-project/avant-main.png",
    description: "Avant Project is a visionary mixed-use development that redefines urban living in Kinshasa. This ambitious project combines commercial spaces, residential towers, and public amenities into a cohesive architectural masterpiece. The design embraces modern urban planning principles with green spaces, pedestrian-friendly zones, and sustainable infrastructure. Featuring a striking 12-floor luxury residential tower as its centerpiece, Avant Project represents the future of integrated city development — where work, life, and leisure converge in harmony.",
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
    location: "Kinshasa, DRC",
    image: "/images/immeuble-quantum.png",
    description: "Immeuble Quantum is a modern landmark designed for clarity, comfort and performance. Its clean façade and refined lines reflect a contemporary vision where architecture meets everyday efficiency. The building offers well planned spaces filled with natural light, smart layouts, and high quality finishes. Every detail supports productivity and well being, from smooth circulation to thoughtful proportions. Immeuble Quantum is ideal for businesses and residents looking for a reliable modern environment. It stands as a symbol of progress, balance, and long term value — a place built for today and ready for tomorrow.",
  },
  {
    id: "angie-building",
    title: "Angie Building",
    category: "Residential",
    year: "2020",
    location: "Kinshasa, DRC",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    description: "A prestigious residential complex demonstrating our commitment to quality construction and modern living standards in the heart of Kinshasa.",
  },
  {
    id: "kanga-building",
    title: "Kanga Building",
    category: "Commercial",
    year: "2019",
    location: "Kinshasa, DRC",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    description: "An integrated commercial facility featuring Grade A office space and premium retail, built with SOCODECO's signature attention to structural excellence.",
  },
  {
    id: "zenufa-office",
    title: "Zenufa Office",
    category: "Commercial",
    year: "2021",
    location: "Kingabwa, DRC",
    image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
    description: "One of Kingabwa's most innovative office interiors, showcasing our interior architecture capabilities with bespoke design solutions.",
  },
  {
    id: "cbfc-building",
    title: "CBFC Building",
    category: "Commercial",
    year: "2020",
    location: "Kinshasa, DRC",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
    description: "A purpose-built commercial facility engineered to meet international operational standards, featuring our expertise in foundations and structural work.",
  },
  {
    id: "villa-residence",
    title: "Villa Residence",
    category: "Residential",
    year: "2019",
    location: "Kinshasa, DRC",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    description: "An exclusive private residence featuring contemporary architecture, sustainable design solutions, and turnkey construction excellence.",
  },
  {
    id: "family-building-lebanon",
    title: "Family Building",
    category: "Residential",
    year: "2018",
    location: "Beirut, Lebanon",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    description: "A premium residential development in Lebanon offering refined living spaces, demonstrating our cross-regional construction capabilities.",
  },
  {
    id: "betika-shop",
    title: "Betika Shop",
    category: "Commercial",
    year: "2021",
    location: "Kinshasa, DRC",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    description: "A modern retail space featuring custom branding, shopfitting, and interior design solutions that reflect our comprehensive construction services.",
  },
];

export const categories = ["All", "Residential", "Commercial", "Industrial"];
