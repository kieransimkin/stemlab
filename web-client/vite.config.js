import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  plugins: [react()],
  resolve: {
    dedupe: ["react", "react-dom"],
  },
  build: {
    emptyOutDir: false,
    cssCodeSplit: false,
    minify: "esbuild",
    outDir: resolve(import.meta.dirname, "../src/stemlab/web"),
    lib: {
      entry: resolve(import.meta.dirname, "src/app.jsx"),
      name: "StemLabWeb",
      formats: ["es"],
      fileName: () => "app.js",
    },
    rollupOptions: {
      output: {
        assetFileNames: asset => asset.name?.endsWith(".css") ? "timeline.css" : "[name][extname]",
      },
    },
  },
});
