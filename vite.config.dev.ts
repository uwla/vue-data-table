import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

const basePath = process.env.APP_BASE ?? "/";

export default defineConfig({
    plugins: [vue()],
    base: basePath,
    build: {
        outDir: "demo",
    },
});
