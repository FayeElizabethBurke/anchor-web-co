import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

export default defineConfig({
  integrations: [tailwind({ applyBaseStyles: false })],
  output: "static",
  site: "https://anchor-web.com",
  build: {
    assets: "_assets",
  },
});
