import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

export const dynamic = "force-static";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://socodeco.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/projects",
    "/materials",
    "/apartments",
    "/architecture",
    "/contact",
  ];

  const staticEntries = staticRoutes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const projectEntries = projects.map((project) => ({
    url: `${SITE_URL}/projects/${project.id}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticEntries, ...projectEntries];
}
