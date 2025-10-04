import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Исторический портал Кубани",
        short_name: "История Кубани",
        description: "Изучение истории Кубани",
        start_url: "/",
        display: "standalone",
        background_color: "#fefce8",
        theme_color: "#92400e",
        orientation: "portrait",
        categories: ["education", "history"],
        id: "/",
        icons: [
            {
                src: "/icons/icon_72x72.png",
                sizes: "72x72",
                type: "image/png",
                purpose: "maskable" // Исправлено: убрал "any"
            },
            {
                src: "/icons/icon_96x96.png",
                sizes: "96x96",
                type: "image/png",
                purpose: "maskable" // Исправлено: убрал "any"
            },
            {
                src: "/icons/icon_128x128.png",
                sizes: "128x128",
                type: "image/png",
                purpose: "maskable" // Исправлено: убрал "any"
            },
            {
                src: "/icons/icon_144x144.png",
                sizes: "144x144",
                type: "image/png",
                purpose: "maskable" // Исправлено: убрал "any"
            },
            {
                src: "/icons/icon_152x152.png",
                sizes: "152x152",
                type: "image/png",
                purpose: "maskable" // Исправлено: убрал "any"
            },
            {
                src: "/icons/icon_192x192.png",
                sizes: "192x192",
                type: "image/png",
                purpose: "maskable" // Исправлено: убрал "any"
            },
            {
                src: "/icons/icon_384x384.png",
                sizes: "384x384",
                type: "image/png",
                purpose: "maskable" // Исправлено: убрал "any"
            },
            {
                src: "/icons/icon_512x512.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "maskable" // Исправлено: убрал "any"
            },
        ],
        screenshots: [
            {
                src: "/screenshots/desktop.png",
                sizes: "1280x720",
                type: "image/png",
                form_factor: "wide",
                label: "Исторический портал Кубани - десктоп версия"
            },
            {
                src: "/screenshots/mobile.png",
                sizes: "375x667",
                type: "image/png",
                form_factor: "narrow",
                label: "Исторический портал Кубани - мобильная версия"
            }
        ]
    }
}