"use client";

import { Card, CardContent, Typography, Box, Chip, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  IconTrendingUp, 
  IconTrendingDown, 
  IconCalendar, 
  IconShoppingCart, 
  IconBuildingStore, 
  IconUsers, 
  IconCurrencyDollar,
  IconCheck
} from '@tabler/icons-react';

type TablerStatCardProps = {
  title: string;
  value: string | number;
  growth?: number;
  icon?: React.ReactNode;
  color?: 'primary' | 'success' | 'warning' | 'info' | 'error';
  onClick?: () => void;
};

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  border: `1px solid ${theme.palette.divider}`,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  },
}));

const IconContainer = styled(Avatar, {
  shouldForwardProp: (prop) => prop !== 'color',
})<{ color?: string }>(({ theme, color = 'primary' }) => {
  const getColor = (colorName: string) => {
    switch (colorName) {
      case 'primary': return theme.palette.primary.main;
      case 'secondary': return theme.palette.secondary.main;
      case 'success': return theme.palette.success.main;
      case 'warning': return theme.palette.warning.main;
      case 'error': return theme.palette.error.main;
      case 'info': return theme.palette.info.main;
      default: return theme.palette.primary.main;
    }
  };
  
  return {
    width: 48,
    height: 48,
    backgroundColor: getColor(color),
    color: 'white',
    marginBottom: theme.spacing(1),
  };
});

const ValueTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.75rem',
  lineHeight: 1.2,
  color: theme.palette.text.primary,
}));

const GrowthChip = styled(Chip)(({ theme }) => ({
  fontSize: '0.75rem',
  height: 20,
  fontWeight: 600,
}));

export default function TablerStatCard({ 
  title, 
  value, 
  growth,
  icon,
  color = 'primary',
  onClick
}: TablerStatCardProps) {
  const getDefaultIcon = () => {
    switch (title.toLowerCase()) {
      case 'активные акции':
        return <IconCheck size={24} />;
      case 'запланированные акции':
        return <IconCalendar size={24} />;
      case 'всего продаж':
        return <IconShoppingCart size={24} />;
      case 'рестораны в акциях':
        return <IconBuildingStore size={24} />;
      case 'официанты в акциях':
        return <IconUsers size={24} />;
      case 'к выплате':
        return <IconCurrencyDollar size={24} />;
      default:
        return <IconTrendingUp size={24} />;
    }
  };

  return (
    <StyledCard onClick={onClick}>
      <CardContent sx={{ p: 3, textAlign: 'center' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <IconContainer color={color}>
            {icon || getDefaultIcon()}
          </IconContainer>
          
          <ValueTypography variant="h4">
            {value}
          </ValueTypography>
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
            {title}
          </Typography>
          
          {growth !== undefined && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {growth >= 0 ? (
                <IconTrendingUp size={16} color="#2e7d32" />
              ) : (
                <IconTrendingDown size={16} color="#d32f2f" />
              )}
              <GrowthChip
                label={`${growth >= 0 ? '+' : ''}${growth.toFixed(1)}%`}
                color={growth >= 0 ? 'success' : 'error'}
                size="small"
              />
            </Box>
          )}
        </Box>
      </CardContent>
    </StyledCard>
  );
}

