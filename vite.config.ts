import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "_@types": path.resolve(__dirname, "./@types"),
      _components: path.resolve(__dirname, "./src/components"),
      _hooks: path.resolve(__dirname, "./src/hooks"),
      _layouts: path.resolve(__dirname, "./src/views/_layouts"),
      _store: path.resolve(__dirname, "./src/store"),
      _views: path.resolve(__dirname, "./src/views"),
      _modules: path.resolve(__dirname, "./src/modules"),
    },
  },
});
