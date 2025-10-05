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
    viewportFit: "cover",
};

export const metadata: Metadata = {
    title: {
        default: "Исторический портал Кубани",
        template: "%s | История Кубани"
    },
    description: "История Кубани - от зарождения цивилизации до новейшего времени",
    manifest: "/manifest.json",
    themeColor: "#92400e",
    appleWebApp: {
        capable: true,
        statusBarStyle: "black-translucent", // Измените это!
        title: "История Кубани",
    },
    applicationName: "Исторический портал Кубани",
    formatDetection: {
        telephone: false,
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
            {/* Критически важные мета-теги для мобильных */}
            <meta name="mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
            <meta name="apple-mobile-web-app-title" content="История Кубани" />

            {/* Иконки для iOS */}
            <link rel="apple-touch-icon" href="/icons/icon_192x192.png" />
            <link rel="apple-touch-startup-image" href="/icons/icon_512x512.png" />

            {/* Мета-теги для полноэкранного режима */}
            <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />

            {/* Цвета */}
            <meta name="theme-color" content="#92400e" media="(prefers-color-scheme: light)" />
            <meta name="theme-color" content="#92400e" media="(prefers-color-scheme: dark)" />
            <meta name="msapplication-TileColor" content="#92400e" />
            <meta name="msapplication-tap-highlight" content="no" />

            {/* Манифест */}
            <link rel="manifest" href="/manifest.json" crossOrigin="use-credentials" />
        </head>
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            style={{
                WebkitTouchCallout: 'none',
                WebkitUserSelect: 'none',
                KhtmlUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none',
                userSelect: 'none'
            }}
        >
        {children}
        </body>
        </html>
    );
}