import type { Metadata } from "next";
import { projects } from "@/data/projects";
import Link from "next/link";
import ProjectContent from "./ProjectContent";

export function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  if (!project) {
    return { title: "Project not found" };
  }
  const description = project.description.slice(0, 160);
  return {
    title: project.title,
    description,
    alternates: { canonical: `/projects/${project.id}` },
    openGraph: {
      title: `${project.title} | SOCODECO`,
      description,
      url: `/projects/${project.id}`,
      images: project.image ? [{ url: project.image }] : undefined,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-6xl text-[var(--text)] mb-4">
            PROJECT NOT FOUND
          </h1>
          <Link
            href="/projects/"
            className="font-mono text-[var(--accent)] hover:underline"
          >
            &larr; Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const otherProjects = projects.filter((p) => p.id !== id).slice(0, 3);

  return <ProjectContent project={project} otherProjects={otherProjects} />;
}
