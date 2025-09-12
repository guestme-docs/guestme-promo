import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === 'production';
const isGithubPages = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  // Настройки для GitHub Pages
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'dist',
  
  // Базовый путь для GitHub Pages (замените на имя вашего репозитория)
  basePath: isGithubPages ? '/guestme-promo' : '',
  assetPrefix: isGithubPages ? '/guestme-promo/' : '',
  
  // Оптимизации для ускорения загрузки
  experimental: {
    optimizePackageImports: ['@tabler/icons-react', '@mui/material'],
  },
  
  // Оптимизация изображений (отключена для статического экспорта)
  images: {
    unoptimized: true,
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Компрессия
  compress: true,
  
  // Оптимизация бандла
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          mui: {
            test: /[\\/]node_modules[\\/]@mui[\\/]/,
            name: 'mui',
            chunks: 'all',
          },
          tabler: {
            test: /[\\/]node_modules[\\/]@tabler[\\/]/,
            name: 'tabler',
            chunks: 'all',
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;
