"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type FormState = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(formData: FormData) {
    const nextErrors: Record<string, string> = {};
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const body = String(formData.get("message") ?? "");

    if (!name.trim()) nextErrors.name = "Name is required.";
    if (!email.trim()) nextErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      nextErrors.email = "Enter a valid email address.";
    if (!body.trim()) nextErrors.message = "Message is required.";

    return nextErrors;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const nextErrors = validate(formData);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setState("submitting");
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
      }),
    });

    if (response.ok) {
      setState("success");
      event.currentTarget.reset();
    } else {
      setState("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" placeholder="Your name" />
        {errors.name ? (
          <p className="text-sm text-destructive">{errors.name}</p>
        ) : null}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
        />
        {errors.email ? (
          <p className="text-sm text-destructive">{errors.email}</p>
        ) : null}
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" name="message" placeholder="Your message" rows={5} />
        {errors.message ? (
          <p className="text-sm text-destructive">{errors.message}</p>
        ) : null}
      </div>
      <Button type="submit" disabled={state === "submitting"}>
        {state === "submitting" ? "Sending..." : "Send message"}
      </Button>
      {state === "success" ? (
        <p className="text-sm text-green-600 dark:text-green-400">
          Message sent — thank you! I will get back to you soon.
        </p>
      ) : null}
      {state === "error" ? (
        <p className="text-sm text-destructive">
          Something went wrong. Please try again.
        </p>
      ) : null}
    </form>
  );
}