import { ProjectCard } from "@/components/project-card";
import { getProjects } from "@/sanity/lib/queries/projects";

export const revalidate = 300;

export default async function WorkPage() {
  const projects = await getProjects();

  return (
    <div className="mx-auto max-w-5xl space-y-12 px-4 py-16">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Work</h1>
        <p className="max-w-2xl text-muted-foreground">
          A selection of projects I have built.
        </p>
      </section>

      {projects.length ? (
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <div key={project.slug.current} id={project.slug.current}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">
          No projects yet — add them in the Sanity Studio.
        </p>
      )}
    </div>
  );
}