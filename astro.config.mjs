import { defineConfig } from "astro/config";
import { SITE_URL, SITE_BASE } from "./site.config.mjs";

export default defineConfig({
  site: SITE_URL,
  base: SITE_BASE,
  trailingSlash: "ignore",
  build: {
    // One HTML file per page with its CSS inside it, so the home page has no
    // absolute asset URLs and works from any folder.
    inlineStylesheets: "always",
    format: "file",
  },
  devToolbar: { enabled: false },
});
