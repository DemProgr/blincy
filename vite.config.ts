import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tanstackStart from "@tanstack/router-plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

export default defineConfig({
  plugins: [react(), tanstackStart(), tailwindcss(), tsconfigPaths()],
  tanstackStart: {
    server: { entry: "server" },
  },
  resolve: {
    alias: {
      "node:async_hooks": path.resolve(__dirname, "src/polyfills/node-async-hooks.js"),
    },
  },
  server: {
    port: 5173,
    host: true,
  },
});
