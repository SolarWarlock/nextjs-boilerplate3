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

// Viewport конфигурация для PWA
export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    themeColor: "#92400e",
};

export const metadata: Metadata = {
    title: "Исторический портал Кубани",
    description: "Изучение истории Кубани",
    manifest: "/manifest.json",
    themeColor: "#92400e",
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: "История Кубани",
    },
    // Добавляем дополнительные мета-теги для PWA
    keywords: ["история", "Кубань", "образование", "PWA"],
    authors: [{ name: "Исторический портал Кубани" }],
    openGraph: {
        type: "website",
        siteName: "Исторический портал Кубани",
        title: "Исторический портал Кубани",
        description: "Изучение истории Кубани",
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
            {/* Добавляем meta-теги для iOS */}
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="default" />
            <meta name="apple-mobile-web-app-title" content="История Кубани" />
            <link rel="apple-touch-icon" href="/icons/icon_192x192.png" />

            {/* Добавляем meta-теги для Microsoft */}
            <meta name="msapplication-TileColor" content="#92400e" />
            <meta name="msapplication-config" content="/browserconfig.xml" />

            {/* Добавляем link для манифеста */}
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