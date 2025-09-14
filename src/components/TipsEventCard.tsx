"use client";

import { Card, CardContent, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  IconCurrencyDollar,
  IconStar,
  IconGift,
  IconClock,
  IconBuildingStore,
  IconUser,
  IconMessageCircle
} from '@tabler/icons-react';
import { EventType } from '@/mocks/tips-types';

type TipsEventCardProps = {
  event: EventType;
};

// Копируем стили из SaleEventCard
const SaleCard = styled(Card)(({ theme }) => ({
  width: '100%',
  minHeight: 90,
  maxHeight: 110,
  cursor: 'default',
  transition: 'all 0.2s ease-in-out',
  borderRadius: 4,
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: 'var(--card-background)',
  color: 'var(--text-primary)',
  boxShadow: 'var(--shadow-light)',
  border: '1px solid var(--card-border)',
  marginBottom: 8,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: 'var(--shadow-hover)',
  },
}));

const PromotionImage = styled(Box)({
  width: 60,
  height: 60,
  borderRadius: 4,
  overflow: 'hidden',
  flexShrink: 0,
  backgroundColor: 'var(--image-background)',
});

const PromotionNameTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '0.875rem',
  color: 'var(--text-primary)',
  lineHeight: 1.3,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  cursor: 'pointer',
  '&:hover': {
    color: 'var(--brand)',
  },
}));

const TimeTypography = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  color: 'var(--text-secondary)',
  display: 'flex',
  alignItems: 'center',
  gap: 4,
  flexShrink: 0,
}));

const RestaurantTypography = styled(Typography)(({ theme }) => ({
  fontSize: '0.8rem',
  color: 'var(--brand)',
  fontWeight: 500,
  cursor: 'pointer',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const ProductTypography = styled(Typography)(({ theme }) => ({
  fontSize: '0.75rem',
  color: 'var(--text-secondary)',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

const AmountTypography = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  fontWeight: 600,
  color: 'var(--brand)',
  backgroundColor: 'var(--hover-light)',
  padding: '4px 8px',
  borderRadius: 4,
  flexShrink: 0,
}));

const RatingTypography = styled(Typography)(({ theme }) => ({
  fontSize: '0.875rem',
  fontWeight: 600,
  color: 'var(--warning-color)',
  backgroundColor: 'var(--hover-light)',
  padding: '4px 8px',
  borderRadius: 4,
  flexShrink: 0,
}));

const StarsContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  marginBottom: 4,
});

const StarIcon = styled(Box)({
  width: 12,
  height: 12,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '2px',
  border: '1px solid var(--border)',
});

export default function TipsEventCard({ event }: TipsEventCardProps) {
  // Копируем функции форматирования из SaleEventCard
  const formatMoneyRUB = (money: { amount: number; currency: string } | undefined) => {
    if (!money || typeof money.amount !== 'number') {
      return '+0 ₽';
    }
    return `+${Math.round(money.amount).toLocaleString('ru-RU')} ₽`;
  };

  const parseDate = (dateString: string): number => {
    return new Date(dateString).getTime();
  };

  const formatTime = (dateString: string) => {
    const now = 1757548800000; // 2025-09-09T15:30:00Z
    const date = parseDate(dateString);
    const diffMs = now - date;
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    
    if (diffMinutes < 1) {
      return 'Только что';
    } else if (diffMinutes < 60) {
      return `${diffMinutes} мин назад`;
    } else if (diffMinutes < 1440) {
      const diffHours = Math.floor(diffMinutes / 60);
      return `${diffHours} ч назад`;
    } else {
      // Используем статическое форматирование без toLocaleTimeString
      const dateObj = new Date(date);
      const hours = dateObj.getHours().toString().padStart(2, '0');
      const minutes = dateObj.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <StarIcon key={i}>
          <IconStar 
            size={12} 
            color={i <= rating ? "#FFD700" : "var(--text-secondary)"}
            fill={i <= rating ? "#FFD700" : "none"}
            stroke={i <= rating ? "#FFD700" : "var(--text-secondary)"}
            strokeWidth={1}
          />
        </StarIcon>
      );
    }
    return <StarsContainer>{stars}</StarsContainer>;
  };

  // Убираем handleImageError чтобы избежать проблем с гидратацией

  return (
    <SaleCard>
      <CardContent sx={{ padding: '16px !important', height: '100%', display: 'flex', gap: 2 }}>
        {/* Первая колонка: Фото акции или иконка */}
        {event.type === 'promo_sale' ? (
          <Box sx={{ width: 60, height: 60, flexShrink: 0 }}>
            {event.promotionBannerUrl ? (
              <img
                src={event.promotionBannerUrl}
                alt={event.promotionName}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '4px',
                  border: '1px solid var(--border)'
                }}
              />
            ) : (
              <Box sx={{ 
                width: '100%', 
                height: '100%', 
                backgroundColor: 'var(--image-background)', 
                borderRadius: '4px',
                border: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <IconGift size={24} color="var(--brand)" />
              </Box>
            )}
          </Box>
        ) : (
          <Box sx={{ 
            width: 60, 
            height: 60, 
            flexShrink: 0, 
            backgroundColor: 'var(--image-background)', 
            borderRadius: '4px',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {event.type === 'review_only' ? (
              <IconMessageCircle size={24} color="var(--brand)" />
            ) : (
              <IconCurrencyDollar size={24} color="var(--brand)" />
            )}
          </Box>
        )}

        {/* Вторая колонка: Заголовок и основная информация */}
        <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {/* Заголовок */}
          <PromotionNameTypography>
            {event.type === 'promo_sale' ? event.promotionName : 
             event.type === 'tip_with_review' ? 'Чаевые с отзывом' :
             event.type === 'tip_only' ? 'Чаевые' : 'Отзыв'}
          </PromotionNameTypography>

          {/* Основная информация */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            {/* Левая подколонка: Ресторан и гость */}
            <Box sx={{ flex: '0 0 250px', minWidth: 0 }}>
              <RestaurantTypography>
                {event.restaurantName}
              </RestaurantTypography>
              {event.guestName && (
                <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', mt: 0.25 }}>
                  От: {event.guestName}
                </Typography>
              )}
            </Box>

            {/* Правая подколонка: Список позиций или звезды с отзывом */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              {event.type === 'promo_sale' ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
                  <Typography sx={{ fontSize: '0.75rem', fontWeight: 500, color: 'text.primary' }}>
                    {event.productName} × {event.quantity}
                  </Typography>
                </Box>
              ) : (
                <Box>
                  {(event.type === 'tip_with_review' || event.type === 'review_only') && event.rating && (
                    <Box sx={{ mb: 0.5 }}>
                      {renderStars(event.rating)}
                    </Box>
                  )}
                  {event.review && (
                    <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', fontStyle: 'italic' }}>
                      &quot;{event.review}&quot;
                    </Typography>
                  )}
                </Box>
              )}
            </Box>
          </Box>
        </Box>

        {/* Третья колонка: Время и сумма */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
          <TimeTypography>
            <IconClock size={14} />
            {formatTime(event.date)}
          </TimeTypography>
          
          {event.type === 'promo_sale' ? (
            <AmountTypography>
              {formatMoneyRUB(event.motivation)}
            </AmountTypography>
          ) : event.type === 'review_only' ? (
            // Для отзывов без чаевых показываем только время
            null
          ) : (
            <AmountTypography>
              {formatMoneyRUB({ amount: event.amount || 0, currency: 'RUB' })}
            </AmountTypography>
          )}
        </Box>
      </CardContent>
    </SaleCard>
  );
}
