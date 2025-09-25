import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Минимальная конфигурация для тестирования
  distDir: 'dist',
  
  // Отключаем строгие проверки для ускорения сборки
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Отключаем ESLint проверки для сборки
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;