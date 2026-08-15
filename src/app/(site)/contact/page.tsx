import type { Metadata } from "next";

import { Mail, MapPin, Phone } from "lucide-react";

import { ContactForm } from "@/components/contact-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getContactInfo } from "@/sanity/lib/queries/content";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch — contact details and a message form.",
};

export default async function ContactPage() {
  const contact = await getContactInfo();

  return (
    <div className="mx-auto max-w-5xl space-y-12 px-4 py-16">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Contact</h1>
        <p className="text-muted-foreground max-w-2xl">
          Have a project in mind or just want to say hello? Send a message.
        </p>
      </section>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Send a message</CardTitle>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {contact?.email ? (
              <p className="text-muted-foreground flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4" />
                <a
                  href={`mailto:${contact.email}`}
                  className="hover:text-foreground"
                >
                  {contact.email}
                </a>
              </p>
            ) : null}
            {contact?.phone ? (
              <p className="text-muted-foreground flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4" />
                {contact.phone}
              </p>
            ) : null}
            {contact?.location ? (
              <p className="text-muted-foreground flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4" />
                {contact.location}
              </p>
            ) : null}
            {contact?.availability ? (
              <p className="text-muted-foreground text-sm">
                Availability:{" "}
                <span className="text-foreground font-medium">
                  {contact.availability}
                </span>
              </p>
            ) : null}
            {!contact?.email &&
            !contact?.phone &&
            !contact?.location &&
            !contact?.availability ? (
              <p className="text-muted-foreground text-sm">
                Contact details coming soon.
              </p>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
