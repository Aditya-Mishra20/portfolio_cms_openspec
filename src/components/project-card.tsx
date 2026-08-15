import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Project } from "@/sanity/lib/queries/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="overflow-hidden">
      {project.images?.[0] ? (
        <div className="relative aspect-video w-full">
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      ) : null}
      <CardHeader>
        <CardTitle className="flex items-center justify-between gap-2">
          {project.title}
          {project.featured ? <Badge>Featured</Badge> : null}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {project.description ? (
          <p className="text-muted-foreground text-sm">{project.description}</p>
        ) : null}
        {project.techStack?.length ? (
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        ) : null}
      </CardContent>
      {project.liveUrl || project.repoUrl ? (
        <CardFooter className="gap-2">
          {project.liveUrl ? (
            <Button
              render={<a href={project.liveUrl} />}
              size="sm"
              variant="outline"
              nativeButton={false}
            >
              Live
            </Button>
          ) : null}
          {project.repoUrl ? (
            <Button
              render={<a href={project.repoUrl} />}
              size="sm"
              variant="outline"
              nativeButton={false}
            >
              Source
            </Button>
          ) : null}
        </CardFooter>
      ) : null}
      <CardFooter>
        <Button
          render={<Link href={`/work#${project.slug.current}`} />}
          size="sm"
          variant="ghost"
          nativeButton={false}
        >
          View details
        </Button>
      </CardFooter>
    </Card>
  );
}
