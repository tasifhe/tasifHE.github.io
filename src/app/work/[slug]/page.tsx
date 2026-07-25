import { projects } from "../../../data/projects";
import { ProjectDetail } from "../../../components/ProjectDetail";
import type { Metadata } from "next";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) {
    return { title: "Project Not Found" };
  }
  return {
    title: `${project.title} | Tasif Hossain Emon`,
    description: project.hook,
    openGraph: {
      images: [project.heroImage],
    },
  };
}

export default function WorkPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return <div>Project not found</div>;

  return <ProjectDetail project={project} />;
}
