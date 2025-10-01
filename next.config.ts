import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_ACTIONS === 'true';
const basePath = isGithubPages ? '/guestme-promo' : '';

const nextConfig: NextConfig = {
  // Настройки для GitHub Pages
  output: 'export',
  trailingSlash: true,
  distDir: 'dist',
  
  // Базовый путь для GitHub Pages (активен при GITHUB_ACTIONS=true)
  basePath: basePath,
  assetPrefix: isGithubPages ? '/guestme-promo/' : '',
  
  // Переменные окружения для клиента
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  
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