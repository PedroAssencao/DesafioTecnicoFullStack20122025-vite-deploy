import { defineConfig } from "vite";
import plugin from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [plugin()],
  server: {
    port: 3000,
  },
  base: process.env.VITE_BASE_PATH || "/DesafioTecnicoFullStack20122025-vite-deploy",
  define: {
    "process.env.VITE_API_URL": JSON.stringify(process.env.VITE_API_URL),
  },
});
