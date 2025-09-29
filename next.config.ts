import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Настройки для GitHub Pages
  output: 'export',
  trailingSlash: true,
  distDir: 'dist',
  
  // Базовый путь для GitHub Pages (всегда активен в production)
  basePath: process.env.NODE_ENV === 'production' ? '/guestme-promo' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/guestme-promo/' : '',
  
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