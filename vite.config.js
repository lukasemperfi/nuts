import { defineConfig } from "vite";
import { resolve } from "path";
import { glob } from "glob";
import nunjucks from "vite-plugin-nunjucks";
import FullReload from "vite-plugin-full-reload";

const pagesDir = resolve(__dirname, "src/pages");
const outDir = "../../dist";
const baseUrl = "/nuts/";

function getHtmlEntries() {
  const entries = {};
  const files = glob.sync(`${pagesDir}/**/index.html`);
  for (const file of files) {
    const relative = file.replace(pagesDir, "").replace(/\\/g, "/");
    let name = relative.replace("/index.html", "");
    if (name === "") name = "home";
    entries[name] = file;
  }
  return entries;
}

export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  base: baseUrl,
  root: pagesDir,
  publicDir: resolve(__dirname, "src/shared/assets"),
  build: {
    outDir: outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: getHtmlEntries(),
    },
    assetsDir: "assets",
  },
  plugins: [
    nunjucks({
      variables: {
        assetsPath: "/src",
      },
    }),
    FullReload(["src/**/*"]),
  ],
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `
  //         @use "@/app/styles/variables" as *;
  //         @use "@/app/styles/mixins" as *;
  //       `,
  //     },
  //   },
  // },
});
