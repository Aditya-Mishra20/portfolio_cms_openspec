import { defineField, defineType } from "sanity";

export const experienceEntry = defineType({
  name: "experienceEntry",
  title: "Experience Entry",
  type: "object",
  fields: [
    defineField({ name: "role", title: "Role", type: "string" }),
    defineField({ name: "company", title: "Company", type: "string" }),
    defineField({ name: "period", title: "Period", type: "string" }),
    defineField({ name: "summary", title: "Summary", type: "text", rows: 3 }),
  ],
});

export const socialLink = defineType({
  name: "socialLink",
  title: "Social Link",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({ name: "url", title: "URL", type: "url" }),
  ],
});

export const about = defineType({
  name: "about",
  title: "About",
  type: "document",
  fields: [
    defineField({
      name: "bio",
      title: "Biography",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "skills",
      title: "Skills",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "experience",
      title: "Experience",
      type: "array",
      of: [{ type: "experienceEntry" }],
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [{ type: "socialLink" }],
    }),
  ],
  preview: {
    select: {
      title: "_id",
    },
    prepare: () => ({ title: "About" }),
  },
});
