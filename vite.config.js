import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// Remove do bundle os parceiros com `published: false`. Sem isso eles ficariam
// fora da tela, mas ainda visíveis no JavaScript entregue ao navegador.
// `enforce: "pre"` garante que o plugin recebe o JSON cru, antes do Vite
// convertê-lo em módulo.
function stripUnpublishedPartners() {
  return {
    name: "strip-unpublished-partners",
    enforce: "pre",
    transform(code, id) {
      if (!id.replace(/\\/g, "/").endsWith("/src/data/partners.json")) return null;
      const published = JSON.parse(code).filter((p) => p.published !== false);
      return { code: JSON.stringify(published), map: null };
    },
  };
}

export default defineConfig({
  plugins: [stripUnpublishedPartners(), react()],
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "src"),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
