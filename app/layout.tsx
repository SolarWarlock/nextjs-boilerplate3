import type {Metadata, Viewport} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import './custom.css';

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: "#92400e",
};

export const metadata: Metadata = {
    title: "Исторический портал Кубани",
    description: "Изучение истории Кубани - от древних цивилизаций до современности",
    manifest: "/manifest.json",
    themeColor: "#92400e",
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: "История Кубани",
    },
    // Добавьте для лучшего отображения в магазинах приложений
    applicationName: "Исторический портал Кубани",
    keywords: ["история", "Кубань", "образование", "учеба", "культура"],
    authors: [{ name: "Исторический портал Кубани" }],
    openGraph: {
        type: "website",
        siteName: "Исторический портал Кубани",
        title: "Исторический портал Кубани",
        description: "Изучение истории Кубани - интерактивные материалы и тесты",
        images: [
            {
                url: "/images/screen.png",
                width: 717,
                height: 1280,
                alt: "Исторический портал Кубани",
            },
        ],
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru">
        <head>
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            <meta name="apple-mobile-web-app-title" content="История Кубани" />
            <link rel="apple-touch-icon" href="/icons/icon_192x192.png" />

            <meta name="msapplication-TileColor" content="#92400e" />
            <meta name="msapplication-config" content="/browserconfig.xml" />

            {/* Убедитесь, что ссылка на манифест правильная */}
            <link rel="manifest" href="/manifest.json" />
        </head>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        {children}
        </body>
        </html>
    );
}