"use client";

import { Card, CardContent, Typography, Box, Button, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  IconCalendar,
  IconCheck,
  IconCurrencyDollar,
  IconArrowRight
} from '@tabler/icons-react';

type TipsPromotionCardProps = {
  id: string;
  name: string;
  status: 'draft' | 'scheduled' | 'active' | 'paused' | 'finished' | 'archived';
  bannerUrl: string;
  startsAt: string;
  endsAt: string;
  salesCount: number;
  motivationToPay: { amount: number; currency: string } | undefined;
  onClick?: () => void;
  hideDetailButton?: boolean;
};

const GradientCard = styled(Card)(({ theme }) => ({
  width: '100%',
  height: '100%',
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
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: 'var(--shadow-hover)',
  },
}));

const ImageContainer = styled(Box)({
  position: 'relative',
  height: 120,
  overflow: 'hidden',
  backgroundColor: 'var(--image-background)',
});

const StatusChip = styled(Chip)<{ status: string }>(({ theme, status }) => ({
  position: 'absolute',
  top: 12,
  right: 12,
  fontSize: '0.75rem',
  height: 24,
  fontWeight: 600,
  backgroundColor: status === 'active' ? '#10b981' : status === 'scheduled' ? '#f59e0b' : '#6b7280',
  color: 'white',
  '& .MuiChip-label': {
    padding: '0 8px',
  },
}));

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
    color: 'var(--brand)',
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
  borderTop: '1px solid var(--border-light)',
  borderBottom: '1px solid var(--border-light)',
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
  color: theme.palette.primary.main,
  border: 'none',
  borderRadius: 4,
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '0.875rem',
  padding: '8px 16px',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
  },
}));

const formatMoneyRUB = (money: { amount: number; currency: string } | undefined) => {
  if (!money) return '0 ₽';
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

export default function TipsPromotionCard({
  id,
  name,
  status,
  bannerUrl,
  startsAt,
  endsAt,
  salesCount,
  motivationToPay,
  onClick,
  hideDetailButton = false
}: TipsPromotionCardProps) {
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
          <Typography sx={{ 
            color: 'text.primary', 
            fontWeight: 'bold', 
            fontSize: '18px', 
            marginBottom: '8px' 
          }}>
            {name || 'Название не найдено'}
          </Typography>
          
          <DateTypography>
            <IconCalendar size={16} />
            {formatDate(startsAt)} – {formatDate(endsAt)}
          </DateTypography>
          
          <StatsContainer>
            <StatItem>
              <IconCheck size={16} color="var(--brand)" />
              <StatValue>{salesCount}</StatValue>
              <StatLabel>Продаж</StatLabel>
            </StatItem>
            
            <StatItem>
              <IconCurrencyDollar size={16} color="var(--warning)" />
              <StatValue>{formatMoneyRUB(motivationToPay)}</StatValue>
              <StatLabel>К выплате</StatLabel>
            </StatItem>
          </StatsContainer>
        </Box>
        
        {!hideDetailButton && (
          <Box sx={{ marginTop: '16px' }}>
            <DetailButton endIcon={<IconArrowRight size={16} />}>
              Подробнее
            </DetailButton>
          </Box>
        )}
      </CardContent>
    </GradientCard>
  );
}