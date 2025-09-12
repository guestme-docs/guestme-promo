"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from './ThemeProvider';
import ThemeToggle from './ThemeToggle';
import { Avatar, Chip, IconButton } from '@mui/material';
import { IconBell, IconCurrencyDollar } from '@tabler/icons-react';
import { tipsData } from '@/mocks/tips-data';

type TipsAppShellProps = {
  children: React.ReactNode;
};

export default function TipsAppShell({ children }: TipsAppShellProps) {
  const { isDark } = useTheme();
  const pathname = usePathname();
  
  // Предотвращаем проблемы с гидратацией
  if (typeof window === 'undefined') {
    return null;
  }

  const navItems = [
    { href: "/tips", label: "Дашборд" },
    { href: "/tips/finance", label: "Финансы" },
  ];

  // Функция для получения заголовка страницы
  const getPageTitle = () => {
    switch (pathname) {
      case "/tips":
        return "Дашборд";
      case "/tips/finance":
        return "Финансы";
      case "/tips/profile":
        return "Профиль";
      default:
        return "GuestMe чаевые";
    }
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: 'var(--background)' }}>
      {/* Sidebar */}
      <aside className="flex flex-col border-r" style={{ 
        width: 'var(--tips-sidebar-width)', 
        backgroundColor: 'var(--background)', 
        borderColor: 'var(--border)' 
      }}>
        {/* Logo */}
        <div className="border-b" style={{ 
          padding: 'var(--tips-spacing-xl)', 
          borderColor: 'var(--border)' 
        }}>
          <Link href="/tips" className="flex items-center gap-3" style={{ color: 'var(--foreground)' }}>
            <img 
              src="/Logo_symbol.svg" 
              alt="GuestMe чаевые" 
              style={{
                width: 'var(--tips-logo-size)',
                height: 'var(--tips-logo-size)',
                objectFit: 'contain',
                transform: `scale(var(--tips-logo-scale))`,
                transformOrigin: 'center'
              }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div>
              <div className="text-xl font-bold">GuestMe чаевые</div>
              <div className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                Личный кабинет официанта
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav style={{ padding: 'var(--tips-spacing-lg)' }}>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-md transition-colors"
                  style={{
                    padding: 'var(--tips-nav-item-padding)',
                    fontSize: 'var(--tips-nav-item-font-size)',
                    fontWeight: 'var(--tips-font-weight-medium)',
                    color: 'var(--text-secondary)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = 'var(--foreground)';
                    e.currentTarget.style.backgroundColor = 'var(--hover-light)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Profile Card */}
        <div style={{ 
          paddingLeft: 'var(--tips-spacing-lg)', 
          paddingBottom: 'var(--tips-spacing-lg)' 
        }}>
          <Link href="/tips/profile" className="block">
            <div 
              className="rounded-lg transition-colors"
              style={{
                padding: 'var(--tips-profile-card-padding)',
                backgroundColor: 'var(--muted)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--hover-light)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--muted)';
              }}
            >
              <div className="flex items-center gap-3">
                <Avatar 
                  src={tipsData.profile.avatar} 
                  alt={`${tipsData.profile.name} ${tipsData.profile.surname}`}
                  sx={{ 
                    width: 'var(--tips-profile-avatar-size)', 
                    height: 'var(--tips-profile-avatar-size)' 
                  }}
                />
                <div className="flex-1 min-w-0">
                  <div 
                    className="text-sm font-medium truncate"
                    style={{ color: 'var(--foreground)' }}
                  >
                    {tipsData.profile.name} {tipsData.profile.surname}
                  </div>
                  <Chip 
                    label={tipsData.profile.selfEmployedStatus === 'active' ? 'Самозанятый' : 'Неактивен'} 
                    color={tipsData.profile.selfEmployedStatus === 'active' ? 'success' : 'default'} 
                    size="small"
                    sx={{ 
                      fontSize: 'var(--tips-profile-chip-font-size)',
                      height: 'var(--tips-profile-chip-height)',
                      marginTop: 'var(--tips-spacing-xs)'
                    }}
                  />
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Spacer to push theme toggle to bottom */}
        <div className="flex-1"></div>

        {/* Theme Toggle */}
        <div className="border-t" style={{ 
          padding: 'var(--tips-spacing-lg)', 
          borderColor: 'var(--border)' 
        }}>
          <div className="flex items-center justify-between">
            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {isDark ? "Темная тема" : "Светлая тема"}
            </span>
            <ThemeToggle />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header 
          className="border-b flex items-center justify-between"
          style={{ 
            height: 'var(--tips-header-height)',
            backgroundColor: 'var(--background)',
            borderColor: 'var(--border)',
            paddingLeft: 'var(--tips-spacing-xl)',
            paddingRight: 'var(--tips-spacing-xl)'
          }}
        >
          <h1 
            className="font-semibold"
            style={{ 
              fontSize: 'var(--tips-balance-font-size)',
              color: 'var(--foreground)'
            }}
          >
            {getPageTitle()}
          </h1>
          
          <div className="flex items-center gap-4">
            {/* Баланс */}
            <div className="text-right">
              <div 
                className="font-semibold"
                style={{ 
                  fontSize: 'var(--tips-balance-font-size)',
                  color: 'var(--foreground)'
                }}
              >
                ₽{tipsData.stats.balance.current.toLocaleString()}
              </div>
              <div 
                style={{ 
                  fontSize: 'var(--tips-balance-label-font-size)',
                  color: 'var(--text-secondary)'
                }}
              >
                Баланс
              </div>
            </div>
            
            {/* Уведомления */}
            <IconButton sx={{ position: 'relative' }}>
              <IconBell size={20} color="var(--text-secondary)" />
              {tipsData.notifications.filter(n => !n.read).length > 0 && (
                <Chip 
                  label={tipsData.notifications.filter(n => !n.read).length} 
                  size="small" 
                  color="error"
                  sx={{ 
                    position: 'absolute', 
                    top: -8, 
                    right: -8,
                    minWidth: 'var(--tips-notification-badge-size)',
                    height: 'var(--tips-notification-badge-size)',
                    fontSize: 'var(--tips-notification-badge-font-size)'
                  }}
                />
              )}
            </IconButton>
          </div>
        </header>

        {/* Main */}
        <main 
          className="flex-1"
          style={{ 
            backgroundColor: 'var(--background)',
            padding: 'var(--tips-main-padding)'
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
