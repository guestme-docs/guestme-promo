"use client";

import { Card, CardContent, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState, useEffect } from 'react';
import { 
  IconClock,
  IconBuildingStore,
  IconCurrencyDollar
} from '@tabler/icons-react';

type SaleItem = {
  productId: string;
  quantity: number;
  motivation: { amount: number; currency: string };
  productName: string;
  paymentBreakdown: {
    totalAmount: { amount: number; currency: string };
    guestmeCommission: { amount: number; currency: string };
    adminPayment: { amount: number; currency: string };
    waiterPayment: { amount: number; currency: string };
  };
};

type SaleEventCardProps = {
  id: string;
  promotionId: string;
  promotionName: string;
  restaurantName: string;
  waiterName: string;
  items: SaleItem[];
  totalAmount: { amount: number; currency: string };
  occurredAt: string;
  promotionBannerUrl?: string;
  onPromotionClick?: (promotionId: string) => void;
  onRestaurantClick?: () => void;
};

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
  width: 40,
  height: 40,
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

const formatMoneyRUB = (money: { amount: number; currency: string } | undefined) => {
  if (!money || typeof money.amount !== 'number') {
    return '+0 ₽';
  }
  return `+${Math.round(money.amount).toLocaleString('ru-RU')} ₽`;
};

// Статическая функция для парсинга дат
const parseDate = (dateString: string): number => {
  return new Date(dateString).getTime();
};

const formatTime = (dateString: string) => {
  // Используем статическое время для отображения
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
    return new Date(date).toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit',
      timeZone: 'Europe/Moscow'
    });
  }
};

export default function SaleEventCard({
  id,
  promotionId,
  promotionName,
  restaurantName,
  waiterName,
  items,
  totalAmount,
  occurredAt,
  promotionBannerUrl,
  onPromotionClick,
  onRestaurantClick
}: SaleEventCardProps) {
  // Убираем currentTime, так как теперь formatTime не требует его

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=80&h=80&fit=crop&crop=center';
  };

  return (
    <SaleCard>
      <CardContent sx={{ padding: '16px !important', height: '100%', display: 'flex', gap: 2 }}>
        {/* Первая колонка: Фото акции */}
        {promotionBannerUrl ? (
          <Box sx={{ width: 60, height: 60, flexShrink: 0 }}>
            <img
              src={promotionBannerUrl}
              alt={promotionName}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '4px',
                border: '1px solid var(--border)'
              }}
              onError={handleImageError}
            />
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
            <Typography variant="caption" color="text.secondary">
              Нет фото
            </Typography>
          </Box>
        )}

        {/* Вторая колонка: Заголовок (название акции) */}
        <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {/* Название акции */}
          <Typography 
            sx={{ 
              fontSize: '0.875rem', 
              fontWeight: 600, 
              color: 'text.primary',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
            onClick={() => onPromotionClick?.(promotionId)}
          >
            {promotionName}
          </Typography>

          {/* Основная информация: ресторан и официант */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            {/* Левая подколонка: Ресторан и официант */}
            <Box sx={{ flex: '0 0 250px', minWidth: 0 }}>
              <RestaurantTypography onClick={onRestaurantClick}>
                {restaurantName}
              </RestaurantTypography>
              <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', mt: 0.25 }}>
                Официант: {waiterName}
              </Typography>
            </Box>

            {/* Правая подколонка: Список позиций */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              {(() => {
                // Объединяем одинаковые позиции
                if (!items || !Array.isArray(items)) {
                  return <Typography variant="body2" color="text.secondary">Нет данных о позициях</Typography>;
                }
                const groupedItems = items.reduce((acc, item) => {
                  const key = item.productId;
                  if (acc[key]) {
                    acc[key].quantity += item.quantity;
                    acc[key].totalMotivation += (item.motivation?.amount || 0);
                    acc[key].totalGuestmeCommission += (item.paymentBreakdown?.guestmeCommission?.amount || 0);
                    acc[key].totalAdminPayment += (item.paymentBreakdown?.adminPayment?.amount || 0);
                    acc[key].totalWaiterPayment += (item.paymentBreakdown?.waiterPayment?.amount || 0);
                  } else {
                    acc[key] = {
                      productName: item.productName,
                      quantity: item.quantity,
                      totalMotivation: (item.motivation?.amount || 0),
                      motivationPerUnit: item.motivation?.amount || 0,
                      totalGuestmeCommission: (item.paymentBreakdown?.guestmeCommission?.amount || 0),
                      totalAdminPayment: (item.paymentBreakdown?.adminPayment?.amount || 0),
                      totalWaiterPayment: (item.paymentBreakdown?.waiterPayment?.amount || 0)
                    };
                  }
                  return acc;
                }, {} as Record<string, { 
                  productName: string; 
                  quantity: number; 
                  totalMotivation: number; 
                  motivationPerUnit: number;
                  totalGuestmeCommission: number;
                  totalAdminPayment: number;
                  totalWaiterPayment: number;
                }>);

                return Object.values(groupedItems).map((item, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <Typography sx={{ fontSize: '0.75rem', fontWeight: 500, color: 'text.primary' }}>
                      {item.productName} × {item.quantity}
                    </Typography>
                    <Typography sx={{ fontSize: '0.6875rem', color: 'text.secondary' }}>
                      ({formatMoneyRUB({ amount: item.totalMotivation, currency: 'RUB' })})
                    </Typography>
                  </Box>
                ));
              })()}
            </Box>
          </Box>
        </Box>

        {/* Третья колонка: Время и сумма */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
          <TimeTypography>
            <IconClock size={14} />
            {formatTime(occurredAt)}
          </TimeTypography>
          
          <AmountTypography>
            {formatMoneyRUB(totalAmount)}
          </AmountTypography>
        </Box>
      </CardContent>
    </SaleCard>
  );
}

