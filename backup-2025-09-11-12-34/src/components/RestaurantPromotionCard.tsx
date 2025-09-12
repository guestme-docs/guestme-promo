"use client";

import { Card, CardContent, Typography, Box, Button, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  IconCalendar,
  IconCheck,
  IconCurrencyDollar,
  IconUsers,
  IconArrowRight
} from '@tabler/icons-react';

type RestaurantPromotionCardProps = {
  id: string;
  name: string;
  status: 'draft' | 'scheduled' | 'active' | 'paused' | 'finished' | 'archived';
  bannerUrl: string;
  startsAt: string;
  endsAt: string;
  salesCount: number;
  motivationToPay: { amount: number; currency: string };
  waitersCount: number;
  onClick?: () => void;
};

const GradientCard = styled(Card)(({ theme }) => ({
  width: '100%',
  minHeight: 450,
  cursor: 'pointer',
  transition: 'all 0.3s ease-in-out',
  borderRadius: 4,
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: 'var(--card-background)',
  color: 'var(--text-primary)',
  boxShadow: 'var(--shadow-light)',
  border: '1px solid var(--card-border)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: 'var(--shadow-hover)',
  },
}));

const ImageContainer = styled(Box)({
  position: 'relative',
  width: '100%',
  height: 180,
  overflow: 'hidden',
});

const StatusChip = styled(Chip, {
  shouldForwardProp: (prop) => prop !== 'status',
})<{ status: string }>(({ status }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#10b981';
      case 'scheduled': return '#f59e0b';
      case 'finished': return '#6b7280';
      case 'draft': return '#8b5cf6';
      case 'paused': return '#f97316';
      case 'archived': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Активна';
      case 'scheduled': return 'Запланирована';
      case 'finished': return 'Завершена';
      case 'draft': return 'Черновик';
      case 'paused': return 'Приостановлена';
      case 'archived': return 'Архивная';
      default: return 'Неизвестно';
    }
  };

  return {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: getStatusColor(status),
    color: 'white',
    fontSize: '0.75rem',
    fontWeight: 600,
    height: 24,
    '& .MuiChip-label': {
      padding: '0 8px',
    },
  };
});

const TitleTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1.125rem',
  color: 'var(--text-primary)',
  lineHeight: 1.3,
  marginBottom: 8,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  cursor: 'pointer',
  visibility: 'visible',
  opacity: 1,
  '&:hover': {
    color: 'var(--primary-color)',
  },
}));

const DateTypography = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  color: 'var(--text-secondary)',
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  marginBottom: 12,
}));

const StatsContainer = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 16,
  padding: '8px 0',
  borderTop: '1px solid var(--border-color)',
  borderBottom: '1px solid var(--border-color)',
});

const StatItem = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 4,
  flex: 1,
});

const StatValue = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  fontWeight: 600,
  color: 'var(--text-primary)',
}));

const StatLabel = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  color: 'var(--text-secondary)',
  textAlign: 'center',
}));

const DetailButton = styled(Button)(({ theme }) => ({
  width: '100%',
  backgroundColor: 'transparent',
  color: 'var(--primary-color)',
  border: 'none',
  borderRadius: 4,
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '0.875rem',
  padding: '8px 16px',
  '&:hover': {
    backgroundColor: 'var(--primary-color)',
    color: 'white',
  },
}));

const formatMoneyRUB = (money: { amount: number; currency: string }) => {
  return `${Math.round(money.amount).toLocaleString('ru-RU')} ₽`;
};

// Статическая функция для парсинга дат
const parseDate = (dateString: string): number => {
  return new Date(dateString).getTime();
};

const formatDate = (dateString: string) => {
  const date = parseDate(dateString);
  return new Date(date).toLocaleDateString('ru-RU', { 
    day: '2-digit', 
    month: 'long', 
    year: 'numeric',
    timeZone: 'Europe/Moscow'
  });
};

export default function RestaurantPromotionCard({
  id,
  name,
  status,
  bannerUrl,
  startsAt,
  endsAt,
  salesCount,
  motivationToPay,
  waitersCount,
  onClick
}: RestaurantPromotionCardProps) {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=200&fit=crop&crop=center';
  };

  return (
    <GradientCard onClick={onClick}>
      <ImageContainer>
        <img 
          src={bannerUrl} 
          alt={name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          onError={handleImageError}
        />
        <StatusChip 
          status={status}
          label={status === 'active' ? 'Активна' : status === 'scheduled' ? 'Запланирована' : 'Завершена'}
        />
      </ImageContainer>
      
      <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flex: 1 }}>
          <div style={{ color: 'var(--text-primary)', fontWeight: 'bold', fontSize: '18px', marginBottom: '8px' }}>
            {name || 'Название не найдено'}
          </div>
          
          <DateTypography>
            <IconCalendar size={16} />
            {formatDate(startsAt)} – {formatDate(endsAt)}
          </DateTypography>
          
          <StatsContainer>
            <StatItem>
              <IconCheck size={16} color="#10b981" />
              <StatValue>{salesCount}</StatValue>
              <StatLabel>Продаж</StatLabel>
            </StatItem>
            
            <StatItem>
              <IconCurrencyDollar size={16} color="#f59e0b" />
              <StatValue>{formatMoneyRUB(motivationToPay)}</StatValue>
              <StatLabel>К выплате</StatLabel>
            </StatItem>
            
            <StatItem>
              <IconUsers size={16} color="#8b5cf6" />
              <StatValue>{waitersCount}</StatValue>
              <StatLabel>Официантов</StatLabel>
            </StatItem>
          </StatsContainer>
        </Box>
        
        <Box sx={{ marginTop: '16px' }}>
          <DetailButton endIcon={<IconArrowRight size={16} />}>
            Подробнее
          </DetailButton>
        </Box>
      </CardContent>
    </GradientCard>
  );
}
