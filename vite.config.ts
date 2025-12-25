import { defineConfig } from "vite";
import plugin from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [plugin()],
  server: {
    port: 3000,
  },
  define: {
    "process.env.API_URL": JSON.stringify(process.env.API_URL),
  },
});
