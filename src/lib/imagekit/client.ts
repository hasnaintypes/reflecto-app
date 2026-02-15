import ImageKit from "@imagekit/nodejs";
import { env } from "@/env";

export const imagekitClient = new ImageKit({
  privateKey: env.IMAGEKIT_PRIVATE_KEY,
});
