import type { Metadata } from "next";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getServices } from "@/sanity/lib/queries/content";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Services",
  description: "How I can help with your next project.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="mx-auto max-w-5xl space-y-12 px-4 py-16">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Services</h1>
        <p className="text-muted-foreground max-w-2xl">
          How I can help with your next project.
        </p>
      </section>

      {services.length ? (
        <div className="grid gap-6 sm:grid-cols-2">
          {services.map((service) => (
            <Card key={service.name}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {service.icon ? (
                    <span aria-hidden>{service.icon}</span>
                  ) : null}
                  {service.name}
                </CardTitle>
              </CardHeader>
              {service.description ? (
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    {service.description}
                  </p>
                </CardContent>
              ) : null}
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">
          No services yet — add them in the Sanity Studio.
        </p>
      )}
    </div>
  );
}
