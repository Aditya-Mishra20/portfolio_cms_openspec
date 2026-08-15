import Link from "next/link";

import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { getFeaturedProjects } from "@/sanity/lib/queries/projects";
import { getSiteSettings } from "@/sanity/lib/queries/siteSettings";

export const revalidate = 300;

export default async function HomePage() {
  const [settings, featuredProjects] = await Promise.all([
    getSiteSettings(),
    getFeaturedProjects(),
  ]);

  return (
    <div className="mx-auto max-w-5xl space-y-20 px-4 py-16">
      <section className="space-y-6">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          {settings?.heroHeading ?? "Hello, I build for the web."}
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          {settings?.heroIntroduction ??
            "A developer portfolio powered by Sanity CMS."}
        </p>
        <div className="flex gap-3">
          <Button render={<Link href="/work" />}>View my work</Button>
          <Button render={<Link href="/contact" />} variant="outline">
            Get in touch
          </Button>
        </div>
      </section>

      {featuredProjects.length ? (
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">
            Featured Projects
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug.current} project={project} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}