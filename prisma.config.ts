import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  // @ts-ignore - datasource is the correct key for Prisma 7 config
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
