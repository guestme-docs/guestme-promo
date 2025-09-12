"use client";

import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  IconTrendingUp, 
  IconTrendingDown
} from '@tabler/icons-react';

type NowUIStatCardProps = {
  title: string;
  value: string | number;
  growth?: number;
  icon?: React.ReactNode;
  color?: 'primary' | 'success' | 'warning' | 'info' | 'error';
  onClick?: () => void;
  isAccent?: boolean;
};

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  cursor: 'pointer',
  transition: 'all 0.3s ease-in-out',
  borderRadius: 4,
  overflow: 'hidden',
  position: 'relative',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
  },
}));

const GradientCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'color' && prop !== 'isAccent',
})<{ color?: string; isAccent?: boolean }>(({ theme, color = 'primary', isAccent = false }) => {
  const getColorStyles = (color: string) => {
    switch (color) {
      case 'success':
        return {
          backgroundColor: 'var(--kpi-success)',
          color: 'var(--kpi-success-text)',
        };
      default:
        return {
          backgroundColor: 'var(--kpi-background)',
          color: 'var(--kpi-text)',
        };
    }
  };

  const colorStyles = getColorStyles(color);

  return {
    height: '100%',
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out',
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
    ...colorStyles,
    boxShadow: 'var(--shadow-light)',
    border: '1px solid var(--card-border)',
    ...(isAccent && {
      backgroundColor: 'var(--kpi-background)',
      border: '1px solid var(--card-border)',
    }),
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: 'var(--shadow-hover)',
    },
  };
});


const ValueTypography = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'color',
})<{ color?: string }>(({ theme, color = 'primary' }) => {
  return {
    fontWeight: 700,
    fontSize: '2.5rem',
    lineHeight: 1.2,
    color: 'inherit', // Используем цвет от родительского элемента
  };
});

const TitleTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  fontSize: '0.875rem',
  color: 'inherit', // Используем цвет от родительского элемента
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  opacity: 0.8, // Немного прозрачности для вторичного текста
}));

const GrowthChip = styled(Chip)(({ theme }) => ({
  fontSize: '0.75rem',
  height: 24,
  fontWeight: 600,
}));

export default function NowUIStatCard({ 
  title, 
  value, 
  growth,
  icon,
  color = 'primary',
  onClick,
  isAccent = false
}: NowUIStatCardProps) {

  return (
    <GradientCard color={color} isAccent={isAccent} onClick={onClick}>
      <CardContent sx={{ p: 3, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <ValueTypography variant="h3" color={color} sx={{ mb: 1 }}>
            {value}
          </ValueTypography>
          
          <TitleTypography variant="body2" sx={{ mb: 2 }}>
            {title}
          </TitleTypography>
          
          {growth !== undefined && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {growth >= 0 ? (
                <IconTrendingUp size={16} color="var(--growth-icon-positive)" />
              ) : (
                <IconTrendingDown size={16} color="var(--growth-icon-negative)" />
              )}
              <GrowthChip
                label={`${growth >= 0 ? '+' : ''}${growth.toFixed(1)}%`}
                sx={{
                  backgroundColor: growth >= 0 ? 'var(--growth-chip-positive)' : 'var(--growth-chip-negative)',
                  color: growth >= 0 ? 'var(--kpi-success-text)' : 'white',
                  '& .MuiChip-label': {
                    color: growth >= 0 ? 'var(--kpi-success-text)' : 'white',
                  },
                }}
                size="small"
              />
            </Box>
          )}
        </Box>
      </CardContent>
    </GradientCard>
  );
}
