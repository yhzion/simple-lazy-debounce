import { defineConfig } from "vite";
import eslintPlugin from "vite-plugin-eslint";
import { resolve } from "path";

export default defineConfig({
  plugins: [eslintPlugin()],
  build: {
    lib: {
      entry: resolve(__dirname, "index.ts"), // 변경된 entry 파일 확장자
      name: "simple-lazy-debounce",
      fileName: "index",
      formats: ["es", "umd", "cjs"],
    },
  },
});
