import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Настройки для GitHub Pages
  output: 'export',
  trailingSlash: true,
  distDir: 'dist',
  
  // Базовый путь для GitHub Pages (активен при GITHUB_ACTIONS=true)
  basePath: process.env.GITHUB_ACTIONS === 'true' ? '/guestme-promo' : '',
  assetPrefix: process.env.GITHUB_ACTIONS === 'true' ? '/guestme-promo/' : '',
  
  // Отключаем строгие проверки для ускорения сборки
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Отключаем ESLint проверки для сборки
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Оптимизация изображений (отключена для статического экспорта)
  images: {
    unoptimized: true,
  },
};

export default nextConfig;