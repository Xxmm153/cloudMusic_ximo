import { defineConfig } from "vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://47.122.113.205:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  esbuild: {
    // 只删除 console.log/console.info/console.debug/console.warn，保留 console.error
    pure: ["console.log", "console.info", "console.debug"], // 删除 console.log
    drop: ["debugger"], // 删除 debugger
  },
});
