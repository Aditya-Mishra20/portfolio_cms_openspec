import type { SchemaTypeDefinition } from "sanity";

import { about, experienceEntry, socialLink } from "./about";
import { blogPost } from "./blogPost";
import { contactInfo } from "./contactInfo";
import { project } from "./project";
import { service } from "./service";
import { navLink, siteSettings } from "./siteSettings";

export const schemaTypes: SchemaTypeDefinition[] = [
  project,
  service,
  about,
  experienceEntry,
  socialLink,
  siteSettings,
  navLink,
  contactInfo,
  blogPost,
];