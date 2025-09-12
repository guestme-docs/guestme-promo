"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { createAppTheme } from '@/theme';

type ThemeContextType = {
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

type ThemeProviderProps = {
  children: ReactNode;
};

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [isDark, setIsDark] = useState(true); // По умолчанию темная тема
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Проверяем только на клиенте
    if (typeof window === 'undefined') return;
    
    // Проверяем сохраненную тему, по умолчанию темная
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // По умолчанию темная тема, если не сохранена светлая
    const shouldBeDark = savedTheme === 'light' ? false : (savedTheme === 'dark' || !savedTheme);
    
    setIsDark(shouldBeDark);
    setIsHydrated(true);
    
    // Синхронизируем с уже установленным классом
    if (shouldBeDark && !document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.add('dark');
    } else if (!shouldBeDark && document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (typeof window === 'undefined') return;
    
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    // Сохраняем выбор пользователя
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    
    // Применяем тему
    document.documentElement.classList.toggle('dark', newTheme);
  };

  const theme = createAppTheme(isDark);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
}