import type { GlobalConfig } from "payload";

export const Footer: GlobalConfig = {
  slug: "footer",
  fields: [
    {
      name: "footerGroups",
      type: "array",
      required: true,
      maxRows: 8,
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "urls",
          type: "array",
          required: true,
          maxRows: 8,
          fields: [
            {
              name: "label",
              type: "text",
              required: true,
            },
            {
              name: "url",
              type: "text",
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
