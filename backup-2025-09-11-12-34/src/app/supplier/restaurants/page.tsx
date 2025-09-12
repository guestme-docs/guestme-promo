"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { restaurants, promotions, liveSales } from "@/mocks/data";
import { formatMoneyRUB } from "@/mocks/types";

// Функция для форматирования мотивации из данных продаж (уже в рублях)
const formatMotivationRUB = (amount: number): string => {
  return new Intl.NumberFormat("ru-RU", { 
    style: "currency", 
    currency: "RUB", 
    maximumFractionDigits: 0 
  }).format(amount);
};
import { Card as MuiCard, CardContent, Typography, Box, TextField, InputAdornment } from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  IconSearch,
  IconBuildingStore,
  IconTrendingUp,
  IconCurrencyDollar,
  IconCalendar,
  IconMapPin
} from '@tabler/icons-react';

// Стилизованные компоненты в стиле Creative Tim Now UI
const RestaurantCard = styled(MuiCard)(({ theme }) => ({
  height: '100%',
  transition: 'all 0.3s ease-in-out',
  borderRadius: 4,
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: 'var(--card-background)',
  color: 'var(--text-primary)',
  boxShadow: 'var(--shadow-light)',
  border: '1px solid var(--card-border)',
  cursor: 'pointer',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: 'var(--shadow-hover)',
  },
}));

const SearchContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  marginBottom: '24px',
});

const SearchField = styled(TextField)(({ theme }) => ({
  flex: 1,
  maxWidth: 400,
  '& .MuiOutlinedInput-root': {
    borderRadius: 4,
    backgroundColor: 'var(--muted)',
    border: '1px solid var(--border)',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      backgroundColor: 'var(--hover-light)',
      borderColor: 'var(--border-light)',
    },
    '&.Mui-focused': {
      backgroundColor: 'var(--card-background)',
      borderColor: 'var(--brand)',
      boxShadow: '0 0 0 3px var(--hover-light)',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },
  },
  '& .MuiInputBase-input': {
    padding: '12px 14px',
    fontSize: '0.875rem',
    fontWeight: 500,
  },
}));

const RestaurantImage = styled(Box)({
  width: '100%',
  height: 120,
  borderRadius: 4,
  overflow: 'hidden',
  backgroundColor: 'var(--image-background)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 16,
  position: 'relative',
  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
});

const StatusChip = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '4px 8px',
  borderRadius: 4,
  fontSize: '0.75rem',
  fontWeight: 600,
  backgroundColor: 'var(--hover-light)',
  color: 'var(--brand)',
  border: '1px solid var(--brand)',
}));

const StatItem = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  fontSize: '0.75rem',
  color: 'var(--text-secondary)',
});

const StatValue = styled(Typography)({
  fontSize: '0.875rem',
  fontWeight: 600,
  color: 'var(--text-primary)',
});

// Массив уникальных изображений ресторанов
const restaurantImages = {
  "r1": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop&crop=center", // Gastropub 12 - современный ресторан
  "r2": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop&crop=center", // Bar&Kitchen - бар с кухней
  "r3": "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop&crop=center", // Sky Lounge - лаунж-зона
  "r4": "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=300&fit=crop&crop=center", // Brewery House - пивоварня
  "r5": "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=400&h=300&fit=crop&crop=center", // Wine Bar Elegance - винный бар
  "r6": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center", // Craft Cocktails - коктейль-бар
  "r7": "https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?w=400&h=300&fit=crop&crop=center", // Whiskey Corner - виски-бар
  "r8": "https://images.unsplash.com/photo-1574391884720-bbc3231989f5?w=400&h=300&fit=crop&crop=center", // Gin Palace - джин-бар
  "r9": "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=400&h=300&fit=crop&crop=center", // Rum Bar Tropical - ром-бар
  "r10": "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=400&h=300&fit=crop&crop=center", // Vodka Museum - музей водки
};

export default function RestaurantsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  // Фильтрация ресторанов по поисковому запросу
  const filteredRestaurants = useMemo(() => {
    if (!searchQuery.trim()) return restaurants;
    
    const query = searchQuery.toLowerCase();
    return restaurants.filter((restaurant) =>
      restaurant.name.toLowerCase().includes(query) ||
      restaurant.address.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Вычисление статистики для каждого ресторана
  const restaurantsWithStats = useMemo(() => {
    return filteredRestaurants.map(restaurant => {
      // Находим все акции, в которых участвует ресторан
      const restaurantPromotions = promotions.filter(promotion => 
        promotion.restaurants.includes(restaurant.id)
      );
      
      // Активные акции
      const activePromotions = restaurantPromotions.filter(p => p.status === 'active');
      
      // Завершенные акции
      const finishedPromotions = restaurantPromotions.filter(p => p.status === 'finished');
      
      // Продажи ресторана
      const restaurantSales = liveSales.filter(sale => sale.restaurantId === restaurant.id);
      
      // Продажи по активным акциям
      const activeSales = restaurantSales.filter(sale => 
        activePromotions.some(p => p.id === sale.promotionId)
      );
      
      // Продажи по завершенным акциям
      const finishedSales = restaurantSales.filter(sale => 
        finishedPromotions.some(p => p.id === sale.promotionId)
      );
      
      // Мотивация по активным акциям
      const activeMotivation = activeSales.reduce((sum, sale) => 
        sum + sale.items.reduce((itemSum, item) => itemSum + item.motivation.amount, 0), 0
      );
      
      // Мотивация по завершенным акциям
      const finishedMotivation = finishedSales.reduce((sum, sale) => 
        sum + sale.items.reduce((itemSum, item) => itemSum + item.motivation.amount, 0), 0
      );
      
      return {
        ...restaurant,
        activePromotionsCount: activePromotions.length,
        finishedPromotionsCount: finishedPromotions.length,
        activeSalesCount: activeSales.length,
        finishedSalesCount: finishedSales.length,
        activeMotivation,
        finishedMotivation,
        totalSalesCount: restaurantSales.length,
        totalMotivation: activeMotivation + finishedMotivation,
        isInPromotion: activePromotions.length > 0
      };
    });
  }, [filteredRestaurants]);

  return (
    <div className="space-y-6">
      {/* Шапка с поиском */}
      <div className="flex items-center justify-between">
      </div>

      <SearchContainer>
        <SearchField
          placeholder="Поиск по названию или адресу ресторана"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconSearch size={20} color="var(--brand)" />
              </InputAdornment>
            ),
          }}
        />
      </SearchContainer>

      {/* Сетка карточек ресторанов */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {restaurantsWithStats.map((restaurant) => (
          <Link key={restaurant.id} href={`/supplier/restaurants/${restaurant.id}`}>
            <RestaurantCard>
              <CardContent sx={{ p: 3 }}>
                {/* Фото ресторана */}
                <RestaurantImage>
                  <img
                    src={restaurantImages[restaurant.id as keyof typeof restaurantImages]}
                    alt={restaurant.name}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling!.style.display = 'flex';
                    }}
                  />
                  <Box sx={{ 
                    display: 'none', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%'
                  }}>
                    <IconBuildingStore size={48} color="var(--text-muted)" />
                  </Box>
                </RestaurantImage>

                {/* Название ресторана */}
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600, 
                    mb: 1, 
                    color: 'var(--text-primary)',
                    cursor: 'pointer',
                    '&:hover': {
                      color: 'var(--brand)',
                    }
                  }}
                >
                  {restaurant.name}
                </Typography>

                {/* Адрес */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <IconMapPin size={14} color="var(--text-secondary)" />
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                    {restaurant.address}
                  </Typography>
                </Box>

                {/* Статус участия */}
                <Box sx={{ mb: 2 }}>
                  {restaurant.isInPromotion ? (
                    <StatusChip>
                      В акции
                    </StatusChip>
                  ) : (
                    <Box sx={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      padding: '4px 8px', 
                      borderRadius: 4, 
                      fontSize: '0.75rem', 
                      fontWeight: 600, 
                      backgroundColor: 'var(--muted)', 
                      color: 'var(--text-secondary)',
                      border: '1px solid var(--border)'
                    }}>
                      Не участвует
                    </Box>
                  )}
                </Box>

                {/* Статистика */}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {/* Акции */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <StatItem>
                      <IconCalendar size={14} />
                      <span>Акции</span>
                    </StatItem>
                    <StatValue>
                      <span style={{ color: 'var(--brand)' }}>{restaurant.activePromotionsCount}</span>
                      <span style={{ color: 'var(--text-secondary)', margin: '0 4px' }}>/</span>
                      <span style={{ color: 'var(--text-secondary)' }}>{restaurant.finishedPromotionsCount}</span>
                    </StatValue>
                  </Box>

                  {/* Продажи */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <StatItem>
                      <IconTrendingUp size={14} />
                      <span>Продажи</span>
                    </StatItem>
                    <StatValue>
                      <span style={{ color: 'var(--brand)' }}>{restaurant.activeSalesCount}</span>
                      <span style={{ color: 'var(--text-secondary)', margin: '0 4px' }}>/</span>
                      <span style={{ color: 'var(--text-secondary)' }}>{restaurant.finishedSalesCount}</span>
                    </StatValue>
                  </Box>

                  {/* Мотивация */}
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <StatItem>
                      <IconCurrencyDollar size={14} />
                      <span>Мотивация</span>
                    </StatItem>
                    <StatValue>
                      <span style={{ color: 'var(--brand)' }}>{formatMotivationRUB(restaurant.activeMotivation)}</span>
                      <span style={{ color: 'var(--text-secondary)', margin: '0 4px' }}>/</span>
                      <span style={{ color: 'var(--text-secondary)' }}>{formatMotivationRUB(restaurant.finishedMotivation)}</span>
                    </StatValue>
                  </Box>
                </Box>
              </CardContent>
            </RestaurantCard>
          </Link>
        ))}
      </div>

      {/* Сообщение, если ничего не найдено */}
      {restaurantsWithStats.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            Рестораны не найдены
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Попробуйте изменить поисковый запрос
          </Typography>
        </Box>
      )}
    </div>
  );
}


