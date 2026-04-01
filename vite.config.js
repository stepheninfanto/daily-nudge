import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "robots.txt"],
      manifest: {
        name: "Nudge - Daily Inspiration",
        short_name: "Nudge",
        description: "A gentle nudge to help you focus on what matters",
        theme_color: "#FAF8F5",
        background_color: "#FAF8F5",
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/",
        prefer_related_applications: false,
        categories: ["lifestyle", "productivity"],
        icons: [
          {
            src: "daily_nudge-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "daily_nudge-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "daily_nudge-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,woff2}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
});
