// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@/components": resolve(__dirname, "./src/components"),
      "@/types": resolve(__dirname, "./src/types"),
      "@/theme": resolve(__dirname, "./src/theme"),
      "@/pages": resolve(__dirname, "./src/pages"),
    },
  },
});
