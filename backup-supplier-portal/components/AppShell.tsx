"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from './ThemeProvider';
import ThemeToggle from './ThemeToggle';
import { useEffect } from 'react';

type AppShellProps = {
  children: React.ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  const { isDark } = useTheme();
  const pathname = usePathname();

  // Предзагрузка критических страниц
  useEffect(() => {
    const preloadCriticalPages = () => {
      // Предзагружаем только если пользователь находится на дашборде
      if (pathname === '/supplier') {
        // Предзагружаем страницы промоакций и продаж
        const link1 = document.createElement('link');
        link1.rel = 'prefetch';
        link1.href = '/supplier/promotions';
        document.head.appendChild(link1);

        const link2 = document.createElement('link');
        link2.rel = 'prefetch';
        link2.href = '/supplier/sales';
        document.head.appendChild(link2);
      }
    };

    // Небольшая задержка, чтобы не блокировать первоначальную загрузку
    const timer = setTimeout(preloadCriticalPages, 2000);
    return () => clearTimeout(timer);
  }, [pathname]);

  const navItems = [
    { href: "/supplier", label: "Дашборд" },
    { href: "/supplier/promotions", label: "Акции" },
    { href: "/supplier/sales", label: "Продажи" },
    { href: "/supplier/restaurants", label: "Рестораны" },
  ];

  // Функция для получения заголовка страницы
  const getPageTitle = () => {
    switch (pathname) {
      case "/supplier":
        return "Дашборд";
      case "/supplier/promotions":
        return "Акции";
      case "/supplier/promotions/new":
        return "Создание акции";
      case "/supplier/sales":
        return "Продажи";
      case "/supplier/restaurants":
        return "Рестораны";
      default:
        // Для страниц с ID (например, /supplier/promotions/123, /supplier/restaurants/456)
        if (pathname.startsWith("/supplier/promotions/") && pathname !== "/supplier/promotions/new") {
          return "Детализация акции";
        }
        if (pathname.startsWith("/supplier/restaurants/")) {
          return "Детализация ресторана";
        }
        return "Портал поставщика";
    }
  };

  return (
    <div className={`min-h-screen flex ${isDark ? "bg-[#111111]" : "bg-white"}`}>
      {/* Sidebar */}
      <aside className={`w-64 flex flex-col border-r ${isDark ? "bg-[#111111] border-[#2a2a2a]" : "bg-white border-gray-200"}`}>
        {/* Logo */}
        <div className={`p-6 border-b ${isDark ? "border-[#2a2a2a]" : "border-gray-200"}`}>
          <Link href="/supplier" className={`flex items-center gap-3 ${isDark ? "text-white" : "text-gray-900"}`}>
            <Image 
              src="/Logo_symbol.svg" 
              alt="GuestMe Promo" 
              width={32}
              height={32}
              style={{
                objectFit: 'contain',
                transform: 'scale(2.2)',
                transformOrigin: 'center'
              }}
              priority
            />
            <div>
              <div className="text-xl font-bold">GuestMe Promo</div>
              <div className={`text-sm mt-1 ${isDark ? "text-[#a3a3a3]" : "text-gray-600"}`}>
                Портал поставщика
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isDark
                      ? "text-[#a3a3a3] hover:text-white hover:bg-[#1a1a1a]"
                      : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Theme Toggle */}
        <div className={`p-4 border-t ${isDark ? "border-[#2a2a2a]" : "border-gray-200"}`}>
          <div className="flex items-center justify-between">
            <span className={`text-sm ${isDark ? "text-[#a3a3a3]" : "text-gray-600"}`}>
              {isDark ? "Темная тема" : "Светлая тема"}
            </span>
            <ThemeToggle />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className={`h-16 border-b flex items-center px-6 ${isDark ? "bg-[#111111] border-[#2a2a2a]" : "bg-white border-gray-200"}`}>
          <h1 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
            {getPageTitle()}
          </h1>
        </header>

        {/* Main */}
        <main className={`flex-1 p-6 ${isDark ? "bg-[#111111]" : "bg-white"}`}>
          {children}
        </main>
      </div>
    </div>
  );
}