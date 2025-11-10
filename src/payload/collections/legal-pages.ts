import type { CollectionConfig } from "payload";
import { slugField } from "payload";

export const LegalPages: CollectionConfig = {
  slug: "legal-pages",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    slugField({ fieldToUse: "title" }),
    {
      name: "content",
      type: "richText",
      required: true,
    },
  ],
};
