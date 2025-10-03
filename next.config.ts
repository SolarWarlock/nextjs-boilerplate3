import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Включим поддержку PWA
    experimental: {
        esmExternals: true
    }
};

const withPWA = require("next-pwa")({
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development", // Отключаем в development для удобства
});

module.exports = withPWA(nextConfig);