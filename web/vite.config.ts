import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src") },
      { find: "@pages", replacement: path.resolve(__dirname, "src/pages") },
      { find: "@redux", replacement: path.resolve(__dirname, "src/redux") },
      {
        find: "@components",
        replacement: path.resolve(__dirname, "src/components"),
      },
    ],
  },
  build: {
    outDir: "../apis/static",
    chunkSizeWarningLimit: 1600,
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000", // local nest app
        changeOrigin: true,
      },
    },
  },
});
