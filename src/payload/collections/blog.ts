import type { CollectionConfig } from "payload";
import { env } from "@/env";

export const Blog: CollectionConfig = {
  slug: "blog",
  access: {
    read: () => true,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "publishedAt"],
    preview: ({ slug }) => `${env.NEXT_PUBLIC_SITE_URL}/blog/${slug}`,
    livePreview: {
      url({ data }) {
        return `${env.NEXT_PUBLIC_SITE_URL}/blog/${data.slug}/preview`;
      },
    },
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "shortDescription",
      type: "textarea",
    },
    {
      name: "content",
      type: "richText",
      required: true,
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
      name: "author",
      type: "relationship",
      relationTo: "users",
      hasMany: false,
    },
  ],
};
