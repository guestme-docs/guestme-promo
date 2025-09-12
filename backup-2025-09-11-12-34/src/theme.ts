import { createTheme } from '@mui/material/styles';

// Функция для создания темы
export const createAppTheme = (isDark: boolean) => createTheme({
  palette: {
    mode: isDark ? 'dark' : 'light',
    primary: {
      main: 'rgb(106, 232, 197)', // Мятный цвет бренда
      contrastText: isDark ? '#111111' : '#292929', // Темный текст
    },
    secondary: {
      main: isDark ? '#ffffff' : '#292929', // Белый/темный
      contrastText: isDark ? '#111111' : '#ffffff', // Контрастный текст
    },
    background: {
      default: isDark ? '#111111' : '#ffffff',
      paper: isDark ? '#1a1a1a' : '#ffffff',
    },
    text: {
      primary: isDark ? '#ffffff' : '#171717',
      secondary: isDark ? '#a3a3a3' : '#6b7280',
    },
    success: {
      main: '#10b981',
    },
    warning: {
      main: '#f59e0b',
    },
    info: {
      main: 'rgb(106, 232, 197)',
    },
    error: {
      main: '#ef4444',
    },
  },
  typography: {
    fontFamily: 'var(--font-geist-sans), sans-serif',
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          backgroundColor: isDark ? '#1a1a1a' : '#ffffff',
          border: isDark ? '1px solid #2a2a2a' : '1px solid #e2e8f0',
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 4,
            backgroundColor: isDark ? '#1a1a1a' : '#f8fafc',
            border: isDark ? '1px solid #2a2a2a' : '1px solid #e2e8f0',
            '&:hover': {
              borderColor: isDark ? '#333333' : '#cbd5e1',
            },
            '&.Mui-focused': {
              borderColor: 'rgb(106, 232, 197)',
              boxShadow: '0 0 0 3px rgba(106, 232, 197, 0.1)',
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderRadius: 4,
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: 'var(--hover)',
            '&:hover': {
              backgroundColor: 'var(--hover-medium)',
            },
          },
          '&:hover': {
            backgroundColor: 'var(--hover-light)',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          '& .MuiTab-root': {
            borderRadius: 4,
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 4,
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          borderRadius: 4,
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          borderRadius: 4,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          borderRadius: 4,
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          '& .MuiAlert-root': {
            borderRadius: 4,
          },
        },
      },
    },
  },
});

