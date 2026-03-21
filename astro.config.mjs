import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

export default defineConfig({
  integrations: [tailwind({ applyBaseStyles: false })],
  output: "static",
  base: "/brochure",
  site: "https://fayeelizabethburke.github.io",
  build: {
    assets: "_assets",
  },
});
