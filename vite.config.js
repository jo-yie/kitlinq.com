import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Using a custom domain (e.g. kitlinq.com), so the base path is "/".
  // If you EVER host without a custom domain at
  // https://<username>.github.io/kitlinq-portfolio/ instead,
  // change this to "/kitlinq-portfolio/".
  base: "/",
});
