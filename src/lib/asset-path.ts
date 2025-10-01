// Утилита для правильной работы с путями к ассетам на GitHub Pages
// Next.js автоматически добавляет basePath только к Link и Image компонентам
// Для обычных <img> тегов нужно добавлять вручную

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function assetPath(path: string): string {
  // Убираем начальный слэш если есть
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // Добавляем basePath только если он есть
  return basePath ? `${basePath}/${cleanPath}` : `/${cleanPath}`;
}

