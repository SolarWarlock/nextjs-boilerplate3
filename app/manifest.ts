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
        icons: [
            {
                src: "/icons/icon_192x192.png",
                sizes: "192x192",
                type: "image/png",
            },
            {
                src: "/icons/icon_512x512.png",
                sizes: "512x512",
                type: "image/png",
            },
        ],
    }
}