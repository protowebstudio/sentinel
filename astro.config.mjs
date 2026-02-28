import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@tailwindcss/vite";

/**
 * Sentinel Hardening:
 * - Set `site` so sitemap can be generated.
 * - Dev-only iframe support is gated behind SENTINEL_ALLOW_IFRAME=1.
 */
const allowDevIframe = process.env.SENTINEL_ALLOW_IFRAME === "1";

export default defineConfig({
  site: "https://sentinel.protowebstudio.com",

  integrations: [
    react(),
    mdx(),
    sitemap(),
  ],

  vite: {
    plugins: [tailwind()],
    server: {
      headers: allowDevIframe
        ? {
            // DEV ONLY (explicitly gated). Do not use in production.
            "Content-Security-Policy": "frame-ancestors *",
          }
        : {},
    },
  },
});
