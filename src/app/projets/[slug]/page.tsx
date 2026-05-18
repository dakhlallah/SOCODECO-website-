import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { novaProjects, getNovaProject } from "@/data/novaProjects";
import ProjectDetail from "./ProjectDetail";

export function generateStaticParams() {
  return novaProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getNovaProject(slug);
  if (!project) return { title: "Projet introuvable" };
  return {
    title: project.name,
    description: project.intro,
    alternates: { canonical: `/projets/${project.slug}` },
    openGraph: {
      title: `${project.name} | ATELIER NOVA`,
      description: project.intro,
      url: `/projets/${project.slug}`,
      images: [{ url: project.cover }],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getNovaProject(slug);
  if (!project) notFound();

  const index = novaProjects.findIndex((p) => p.slug === slug);
  const next = novaProjects[(index + 1) % novaProjects.length];

  return <ProjectDetail project={project} next={next} />;
}
