import type { CollectionConfig } from "payload";
import { slugField } from "payload";

export const Products: CollectionConfig = {
  slug: "products",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    slugField({ fieldToUse: "title" }),
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "thumbnailImage",
      type: "relationship",
      relationTo: "media",
      hasMany: false,
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "client",
      type: "text",
      required: true,
    },
    {
      name: "images",
      type: "array",
      fields: [
        {
          name: "image",
          type: "relationship",
          relationTo: "media",
          hasMany: false,
        },
      ],
    },
  ],
};
