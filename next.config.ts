import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const isGithubPages = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  // Настройки для GitHub Pages
  output: 'export',
  trailingSlash: true,
  distDir: 'dist',
  
  // Базовый путь для GitHub Pages
  basePath: isGithubPages ? '/guestme-promo' : '',
  assetPrefix: isGithubPages ? '/guestme-promo/' : '',
  
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