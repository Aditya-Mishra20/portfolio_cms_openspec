import { defineConfig } from "sanity";
import {
  structureTool,
  type ListItemBuilder,
  type StructureBuilder,
} from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { schemaTypes } from "./schemaTypes";

const singletonActions = new Set(["publish", "discardChanges", "restore"]);
const singletonTypes = new Set(["siteSettings", "contactInfo"]);

const singletonListItem = (
  S: StructureBuilder,
  type: string,
  title: string,
): ListItemBuilder =>
  S.documentListItem().id(type).title(title).schemaType(type);

export default defineConfig({
  name: "portfolio-cms",
  title: "Portfolio CMS",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "",
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(({ action }) => action && singletonActions.has(action))
        : input,
  },
  structure: (S: StructureBuilder) =>
    S.list()
      .title("Content")
      .items([
        singletonListItem(S, "siteSettings", "Site Settings"),
        singletonListItem(S, "contactInfo", "Contact Info"),
        S.divider(),
        ...S.documentTypeListItems(),
      ]),
});