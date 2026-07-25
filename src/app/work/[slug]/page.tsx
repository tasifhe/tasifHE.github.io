import { projects } from "../../../data/projects";
import { ProjectDetail } from "../../../components/ProjectDetail";
import type { Metadata } from "next";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
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

export default async function WorkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return <div>Project not found</div>;

  return <ProjectDetail project={project} />;
}
