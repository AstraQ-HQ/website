import type { GlobalConfig } from "payload";

export const Company: GlobalConfig = {
  slug: "company",
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "text",
      required: true,
    },
    {
      name: "logo",
      type: "relationship",
      relationTo: "media",
      hasMany: false,
    },
  ],
};
