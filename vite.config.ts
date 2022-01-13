import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        VitePWA({
            mode: "development",
            base: "/",
            strategies: "generateSW",
            injectRegister: "script",
            includeAssets: ["favicon.ico"],
            manifest: {
                name: "RPG Plus",
                short_name: "RPG+",
                theme_color: "#a78bfa",
                background_color: "#a78bfa",
                display: "standalone",
                scope: "/",
                start_url: "/?mode=standalone",
                icons: [
                    {
                        src: "/icon/192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                        purpose: "any maskable",
                    },
                    {
                        src: "/icon/256x256.png",
                        sizes: "256x256",
                        type: "image/png",
                        purpose: "any maskable",
                    },
                    {
                        src: "/icon/384x384.png",
                        sizes: "384x384",
                        type: "image/png",
                        purpose: "any maskable",
                    },
                    {
                        src: "/icon/512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "any maskable",
                    },
                ],
            },
        }),
    ],
});
