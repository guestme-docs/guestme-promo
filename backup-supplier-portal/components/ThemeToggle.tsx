"use client";

import { IconButton, Tooltip } from '@mui/material';
import { IconSun, IconMoon } from '@tabler/icons-react';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Tooltip title={isDark ? 'Переключить на светлую тему' : 'Переключить на темную тему'}>
      <IconButton
        onClick={toggleTheme}
        sx={{
          color: isDark ? '#fbbf24' : '#6b7280',
          transition: 'all 0.3s ease',
          '&:hover': {
            color: isDark ? '#f59e0b' : 'rgb(106, 232, 197)',
            backgroundColor: isDark ? 'rgba(251, 191, 36, 0.1)' : 'rgba(106, 232, 197, 0.1)',
          },
        }}
      >
        {isDark ? <IconSun size={20} /> : <IconMoon size={20} />}
      </IconButton>
    </Tooltip>
  );
}
