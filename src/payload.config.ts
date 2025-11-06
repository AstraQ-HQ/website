import path from "node:path";
import { fileURLToPath } from "node:url";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { FixedToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";
import { env } from "./env";
import { Blog } from "./payload/collections/blog";
import { Media } from "./payload/collections/media";
import { Users } from "./payload/collections/users";
import { Company } from "./payload/globals/company";
import { Footer } from "./payload/globals/footer";
import { Header } from "./payload/globals/header";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    theme: "light",
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Blog],
  globals: [Company, Footer, Header],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [...defaultFeatures, FixedToolbarFeature()],
  }),
  secret: env.PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, "payload", "types.ts"),
  },
  db: sqliteAdapter({
    client: {
      url: env.DATABASE_URL,
      authToken: env.DATABASE_AUTH_TOKEN,
    },
    generateSchemaOutputFile: path.resolve(dirname, "payload", "db-schema.ts"),
    migrationDir: path.resolve(dirname, "payload", "migrations"),
  }),
  sharp,
  plugins: [],
});
