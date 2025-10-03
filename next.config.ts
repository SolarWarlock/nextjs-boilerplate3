import type { NextConfig } from "next";

import next_pwa from "next-pwa";

const nextConfig: NextConfig = {
    //eslint: {
        // ⚠️ Внимание: это позволяет сборке завершиться успешно даже при ошибках ESLint
        //ignoreDuringBuilds: true,
    //},
};

export default nextConfig;

const withPWA = next_pwa({
    dest: 'public', // сюда генерится service worker
    register: true,
    skipWaiting: true
})

module.exports = withPWA({
    reactStrictMode: true
})

