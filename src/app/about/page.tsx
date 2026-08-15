import type { Metadata } from "next";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAbout } from "@/sanity/lib/queries/content";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "About",
  description: "About me — my biography, skills, and experience.",
};

function PortableText({
  blocks,
}: {
  blocks?: { _type: string; children?: { text?: string }[] }[];
}) {
  if (!blocks?.length) return null;
  return (
    <div className="space-y-4">
      {blocks.map((block, i) => (
        <p key={i} className="text-muted-foreground">
          {block.children?.map((child, j) => <span key={j}>{child.text}</span>)}
        </p>
      ))}
    </div>
  );
}

export default async function AboutPage() {
  const about = await getAbout();

  return (
    <div className="mx-auto max-w-5xl space-y-12 px-4 py-16">
      <section className="space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">About Me</h1>
        <div className="max-w-3xl">
          <PortableText blocks={about?.bio} />
          {!about?.bio?.length ? (
            <p className="text-muted-foreground">
              Content coming soon — add your biography in the Sanity Studio.
            </p>
          ) : null}
        </div>
      </section>

      {about?.skills?.length ? (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {about.skills.map((skill) => (
              <Badge key={skill} variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
        </section>
      ) : null}

      {about?.experience?.length ? (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">Experience</h2>
          <div className="space-y-4">
            {about.experience.map((entry, i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle className="flex flex-wrap items-baseline justify-between gap-2">
                    <span>
                      {entry.role}
                      {entry.company ? ` — ${entry.company}` : ""}
                    </span>
                    {entry.period ? (
                      <span className="text-sm font-normal text-muted-foreground">
                        {entry.period}
                      </span>
                    ) : null}
                  </CardTitle>
                </CardHeader>
                {entry.summary ? (
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {entry.summary}
                    </p>
                  </CardContent>
                ) : null}
              </Card>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}