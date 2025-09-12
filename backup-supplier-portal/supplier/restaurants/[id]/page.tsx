"use client";

import { useRouter } from "next/navigation";
import { useState, useMemo, use } from "react";
import { restaurants, promotions, liveSales, waiters, products } from "@/mocks/data";
import { formatMoneyRUB } from "@/mocks/types";
import { Card as MuiCard, CardContent, Typography, Box, Tabs, Tab, Chip, IconButton } from '@mui/material';
import RestaurantPromotionCard from '@/components/RestaurantPromotionCard';
import SaleEventCard from '@/components/SaleEventCard';
import { styled } from '@mui/material/styles';
import { 
  IconPhone,
  IconMail,
  IconMapPin,
  IconBuildingStore,
  IconTrendingUp,
  IconCurrencyDollar,
  IconCalendar,
  IconArrowLeft
} from '@tabler/icons-react';

// Стилизованные компоненты
const HeaderCard = styled(MuiCard)(({ theme }) => ({
  borderRadius: 4,
  backgroundColor: 'var(--card-background)',
  boxShadow: 'var(--shadow-light)',
  border: '1px solid var(--card-border)',
  marginBottom: 24,
}));

const StatCard = styled(MuiCard)(({ theme }) => ({
  borderRadius: 4,
  backgroundColor: 'var(--card-background)',
  boxShadow: 'var(--shadow-light)',
  border: '1px solid var(--card-border)',
  height: '100%',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: 'var(--shadow-hover)',
  },
}));



const StatusChip = styled(Chip)(({ theme }) => ({
  fontSize: '0.75rem',
  height: 24,
  fontWeight: 600,
}));

const RestaurantImage = styled(Box)({
  width: 80,
  height: 80,
  borderRadius: 4,
  overflow: 'hidden',
  backgroundColor: 'var(--image-background)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
});

// Функция для форматирования мотивации из данных продаж (уже в рублях)
const formatMotivationRUB = (amount: number): string => {
  return new Intl.NumberFormat("ru-RU", { 
    style: "currency", 
    currency: "RUB", 
    maximumFractionDigits: 0 
  }).format(amount);
};

// Массив изображений ресторанов
const restaurantImages = {
  "r1": "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=300&fit=crop&crop=center",
  "r2": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop&crop=center",
  "r3": "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop&crop=center",
  "r4": "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=300&fit=crop&crop=center",
  "r5": "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=400&h=300&fit=crop&crop=center",
  "r6": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center",
  "r7": "https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?w=400&h=300&fit=crop&crop=center",
  "r8": "https://images.unsplash.com/photo-1574391884720-bbc3231989f5?w=400&h=300&fit=crop&crop=center",
  "r9": "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=400&h=300&fit=crop&crop=center",
  "r10": "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=400&h=300&fit=crop&crop=center",
};

export default function RestaurantDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [salesPage, setSalesPage] = useState(1);
  const [salesPerPage] = useState(25);

  const resolvedParams = use(params);
  const restaurant = restaurants.find((x) => x.id === resolvedParams.id);
  if (!restaurant) {
    router.replace("/restaurants");
  }

  // Получаем все акции ресторана
  const restaurantPromotions = restaurant ? promotions.filter((p) => p.restaurants.includes(restaurant.id)) : [];
  
  // Разделяем по статусам
  const activePromotions = restaurantPromotions.filter(p => p.status === 'active');
  const scheduledPromotions = restaurantPromotions.filter(p => p.status === 'scheduled');
  const finishedPromotions = restaurantPromotions.filter(p => p.status === 'finished');

  // Получаем продажи ресторана
  const restaurantSales = restaurant ? liveSales.filter(sale => sale.restaurantId === restaurant.id) : [];

  // Вычисляем статистику по активным акциям
  const activeStats = useMemo(() => {
    const activeSales = restaurantSales.filter(sale => 
      activePromotions.some(p => p.id === sale.promotionId)
    );
    const totalMotivation = activeSales.reduce((sum, sale) => 
      sum + sale.items.reduce((itemSum, item) => itemSum + (item.motivation?.amount || 0), 0), 0
    );
    return {
      count: activePromotions.length,
      sales: activeSales.length,
      motivation: totalMotivation
    };
  }, [activePromotions, restaurantSales]);

  // Вычисляем статистику по завершенным акциям
  const finishedStats = useMemo(() => {
    const finishedSales = restaurantSales.filter(sale => 
      finishedPromotions.some(p => p.id === sale.promotionId)
    );
    const totalMotivation = finishedSales.reduce((sum, sale) => 
      sum + sale.items.reduce((itemSum, item) => itemSum + (item.motivation?.amount || 0), 0), 0
    );
    return {
      count: finishedPromotions.length,
      sales: finishedSales.length,
      motivation: totalMotivation
    };
  }, [finishedPromotions, restaurantSales]);


  const getCurrentPromotions = () => {
    switch (activeTab) {
      case 0: return activePromotions;
      case 1: return scheduledPromotions;
      case 2: return finishedPromotions;
      default: return [];
    }
  };

  const currentPromotions = getCurrentPromotions();

  // Вычисления для ленты продаж
  const allRestaurantSales = useMemo(() => {
    if (!restaurant) return [];
    return liveSales.filter(sale => sale.restaurantId === restaurant.id);
  }, [restaurant]);

  // Вычисления для официантов
  const restaurantWaiters = useMemo(() => {
    if (!restaurant) return [];
    return waiters.filter(waiter => waiter.restaurantId === restaurant.id);
  }, [restaurant]);

  // Статистика по официантам
  const waiterStats = useMemo(() => {
    return restaurantWaiters.map(waiter => {
      const waiterSales = allRestaurantSales.filter(sale => sale.waiterId === waiter.id);
      
      // Разделяем продажи по статусу акций
      const activeSales = waiterSales.filter(sale => {
        const promotion = promotions.find(p => p.id === sale.promotionId);
        return promotion?.status === 'active';
      });
      
      const finishedSales = waiterSales.filter(sale => {
        const promotion = promotions.find(p => p.id === sale.promotionId);
        return promotion?.status === 'finished';
      });
      
      // Вычисляем мотивацию для активных и завершенных акций
      const activeMotivation = activeSales.reduce((sum, sale) => 
        sum + sale.items.reduce((itemSum, item) => itemSum + (item.motivation?.amount || 0), 0), 0
      );
      
      const finishedMotivation = finishedSales.reduce((sum, sale) => 
        sum + sale.items.reduce((itemSum, item) => itemSum + (item.motivation?.amount || 0), 0), 0
      );
      
      return {
        waiter,
        activeSales: activeSales.reduce((sum, sale) => sum + sale.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0),
        finishedSales: finishedSales.reduce((sum, sale) => sum + sale.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0),
        activeMotivation,
        finishedMotivation
      };
    }).sort((a, b) => (b.activeSales + b.finishedSales) - (a.activeSales + a.finishedSales));
  }, [restaurantWaiters, allRestaurantSales, promotions]);

  // Пагинация для ленты продаж
  const paginatedSales = useMemo(() => {
    const startIndex = (salesPage - 1) * salesPerPage;
    const endIndex = startIndex + salesPerPage;
    return allRestaurantSales.slice(startIndex, endIndex);
  }, [allRestaurantSales, salesPage, salesPerPage]);

  const totalSalesPages = Math.ceil(allRestaurantSales.length / salesPerPage);

  if (!restaurant) return null;

  return (
    <div className="space-y-6">
      {/* Кнопка назад */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <IconButton onClick={() => router.back()} sx={{ color: 'var(--brand)' }}>
          <IconArrowLeft size={20} />
        </IconButton>
        <Typography variant="h6" color="text.secondary">
          Назад к ресторанам
        </Typography>
      </Box>

      {/* Блоки информации и метрик */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, mb: 4, alignItems: 'stretch' }}>
        {/* Левая половина - информация о ресторане */}
        <Box sx={{ display: 'flex' }}>
          <HeaderCard sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ p: 4, flex: 1, display: 'flex', flexDirection: 'column' }}>
              {/* Фото ресторана */}
              <RestaurantImage sx={{ mb: 3, width: '100%', maxWidth: 400 }}>
                <img
                  src={restaurantImages[restaurant.id as keyof typeof restaurantImages]}
                  alt={restaurant.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                    (e.currentTarget.nextElementSibling as HTMLElement)!.style.display = 'flex';
                  }}
                />
                <Box sx={{ 
                  display: 'none', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  width: '100%',
                  height: '100%'
                }}>
                  <IconBuildingStore size={32} color="var(--text-muted)" />
                </Box>
              </RestaurantImage>

              {/* Название ресторана */}
              <Typography variant="h4" sx={{ fontWeight: 600, mb: 2, color: 'var(--text-primary)' }}>
                {restaurant.name}
              </Typography>
              
              {/* Адрес */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <IconMapPin size={16} color="var(--text-secondary)" />
                <Typography variant="body1" color="text.secondary">
                  {restaurant.address}
                </Typography>
              </Box>

              {/* Телефон ресторана */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <IconPhone size={16} color="var(--brand)" />
                <Typography variant="body1" sx={{ color: 'var(--brand)', cursor: 'pointer' }}>
                  {restaurant.phone}
                </Typography>
              </Box>

              {/* ИНН */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                  ИНН
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {restaurant.inn}
                </Typography>
              </Box>

              {/* Контактная информация администратора */}
              <Box sx={{ 
                p: 3, 
                backgroundColor: 'var(--muted)', 
                borderRadius: 4, 
                border: '1px solid var(--border)',
                flex: 1
              }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'var(--text-primary)' }}>
                  Контактная информация администратора
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {/* ФИО администратора */}
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      ФИО
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {restaurant.adminFullName}
                    </Typography>
                  </Box>

                  {/* Телефон администратора */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconPhone size={16} color="var(--brand)" />
                    <Typography variant="body1" sx={{ color: 'var(--brand)', cursor: 'pointer' }}>
                      {restaurant.adminPhone}
                    </Typography>
                  </Box>

                  {/* Email администратора */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconMail size={16} color="var(--brand)" />
                    <Typography variant="body1" sx={{ color: 'var(--brand)', cursor: 'pointer' }}>
                      {restaurant.adminEmail}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </HeaderCard>
        </Box>
        
        {/* Правая половина - метрики по акциям */}
        <Box sx={{ display: 'flex' }}>
          <HeaderCard sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ p: 4, flex: 1, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: 'var(--text-primary)' }}>
                Статистика по акциям
              </Typography>

              {/* Статус участия */}
              <Box sx={{ mb: 3 }}>
                {activeStats.count > 0 ? (
                  <StatusChip 
                    label="Активно участвует" 
                    color="success" 
                    sx={{ backgroundColor: 'var(--hover-light)', color: 'var(--brand)' }}
                  />
                ) : (
                  <StatusChip 
                    label="Не участвует" 
                    sx={{ backgroundColor: 'var(--muted)', color: 'var(--text-secondary)' }}
                  />
                )}
              </Box>

              {/* Компактная статистика */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, flex: 1 }}>
                {/* Акции */}
                <Box sx={{ 
                  p: 3, 
                  backgroundColor: 'var(--muted)', 
                  borderRadius: 4, 
                  border: '1px solid var(--border)' 
                }}>
                  <Typography variant="body2" color="text.secondary" sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1, 
                    mb: 1 
                  }}>
                    <IconCalendar size={16} />
                    Акции
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    <span style={{ color: 'var(--brand)' }}>{activeStats.count}</span>
                    <span style={{ color: 'var(--text-secondary)', margin: '0 8px', fontSize: '1.2em' }}>/</span>
                    <span style={{ color: 'var(--warning)' }}>{scheduledPromotions.length}</span>
                    <span style={{ color: 'var(--text-secondary)', margin: '0 8px', fontSize: '1.2em' }}>/</span>
                    <span style={{ color: 'var(--text-secondary)' }}>{finishedStats.count}</span>
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    активные / запланированные / завершенные
                  </Typography>
                </Box>

                {/* Продажи */}
                <Box sx={{ 
                  p: 3, 
                  backgroundColor: 'var(--muted)', 
                  borderRadius: 4, 
                  border: '1px solid var(--border)' 
                }}>
                  <Typography variant="body2" color="text.secondary" sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1, 
                    mb: 1 
                  }}>
                    <IconTrendingUp size={16} />
                    Продажи
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    <span style={{ color: 'var(--brand)' }}>{activeStats.sales}</span>
                    <span style={{ color: 'var(--text-secondary)', margin: '0 8px', fontSize: '1.2em' }}>/</span>
                    <span style={{ color: 'var(--text-secondary)' }}>{finishedStats.sales}</span>
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    активные / завершенные
                  </Typography>
                </Box>

                {/* Мотивация */}
                <Box sx={{ 
                  p: 3, 
                  backgroundColor: 'var(--muted)', 
                  borderRadius: 4, 
                  border: '1px solid var(--border)' 
                }}>
                  <Typography variant="body2" color="text.secondary" sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1, 
                    mb: 1 
                  }}>
                    <IconCurrencyDollar size={16} />
                    Мотивация
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    <span style={{ color: 'var(--brand)' }}>{formatMotivationRUB(activeStats.motivation)}</span>
                    <span style={{ color: 'var(--text-secondary)', margin: '0 8px', fontSize: '1.2em' }}>/</span>
                    <span style={{ color: 'var(--text-secondary)' }}>{formatMotivationRUB(finishedStats.motivation)}</span>
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    активные / завершенные
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </HeaderCard>
        </Box>
      </Box>

      {/* Вкладки с акциями и официантами */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
          <Tab label={`Активные (${activePromotions.length})`} />
          <Tab label={`Запланированные (${scheduledPromotions.length})`} />
          <Tab label={`Завершенные (${finishedPromotions.length})`} />
        </Tabs>
      </Box>


      {/* Карточки акций */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
          Акции
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3 }}>
          {currentPromotions.map((promotion) => {
            const promotionSales = restaurantSales.filter(sale => sale.promotionId === promotion.id);
            const promotionMotivation = promotionSales.reduce((sum, sale) => 
              sum + sale.items.reduce((itemSum, item) => itemSum + (item.motivation?.amount || 0), 0), 0
            );
            
            // Количество уникальных официантов этого ресторана в акции
            const restaurantWaitersInPromotion = new Set(
              promotionSales.map(sale => sale.waiterId)
            ).size;

            return (
              <RestaurantPromotionCard
                key={promotion.id}
                id={promotion.id}
                name={promotion.name}
                status={promotion.status}
                bannerUrl={promotion.bannerUrl || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=200&fit=crop&crop=center'}
                startsAt={promotion.startsAt}
                endsAt={promotion.endsAt}
                salesCount={promotionSales.length}
                motivationToPay={{ amount: promotionMotivation, currency: 'RUB' }}
                waitersCount={restaurantWaitersInPromotion}
                onClick={() => {
                  // Можно добавить навигацию к детальной странице акции
                }}
              />
            );
          })}
        </Box>
      </Box>

      {/* Лента продаж и официанты */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 4, mb: 4 }}>
        {/* Лента продаж */}
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: 'var(--text-primary)' }}>
            Лента продаж ({allRestaurantSales.reduce((sum, sale) => sum + sale.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0)})
          </Typography>
          
          <Box sx={{ space: 2 }}>
            {paginatedSales.map((sale) => {
              const promotion = promotions.find(p => p.id === sale.promotionId);
              const waiter = waiters.find(w => w.id === sale.waiterId);
              
              // Обогащаем данные позиций информацией о продуктах
              const enrichedItems = sale.items.map(item => {
                const product = products.find(p => p.id === item.productId);
                return {
                  ...item,
                  productName: product?.name || 'Неизвестный товар'
                };
              });
              
              // Вычисляем общую сумму мотивации из items
              const totalAmount = sale.items.reduce((sum, item) => sum + (item.motivation?.amount || 0) * item.quantity, 0);

  return (
                <SaleEventCard
                  key={sale.id}
                  id={sale.id}
                  promotionId={sale.promotionId}
                  promotionName={promotion?.name || 'Неизвестная акция'}
                  restaurantName={restaurant.name}
                  waiterName={waiter?.name || 'Неизвестный официант'}
                  items={enrichedItems}
                  totalAmount={{ amount: totalAmount, currency: "RUB" }}
                  occurredAt={sale.occurredAt}
                  promotionBannerUrl={promotion?.bannerUrl}
                  onPromotionClick={(promotionId) => router.push(`/supplier/promotions/${promotionId}`)}
                  onRestaurantClick={() => {}}
                />
              );
            })}
          </Box>
          
          {/* Пагинация */}
          {totalSalesPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
              <IconButton 
                onClick={() => setSalesPage(prev => Math.max(1, prev - 1))}
                disabled={salesPage === 1}
                sx={{ color: 'var(--brand)' }}
              >
                ←
              </IconButton>
              <Typography sx={{ display: 'flex', alignItems: 'center', color: 'var(--text-secondary)' }}>
                {salesPage} из {totalSalesPages}
              </Typography>
              <IconButton 
                onClick={() => setSalesPage(prev => Math.min(totalSalesPages, prev + 1))}
                disabled={salesPage === totalSalesPages}
                sx={{ color: 'var(--brand)' }}
              >
                →
              </IconButton>
            </Box>
          )}
        </Box>

        {/* Список официантов */}
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 600, mb: 3, color: 'var(--text-primary)' }}>
            Официанты ({restaurantWaiters.length})
          </Typography>
          
          <Box sx={{ space: 2 }}>
            {waiterStats.map(({ waiter, activeSales, finishedSales, activeMotivation, finishedMotivation }) => (
              <MuiCard key={waiter.id} sx={{ mb: 2, borderRadius: 4, boxShadow: 'var(--shadow-light)', backgroundColor: 'var(--card-background)', border: '1px solid var(--card-border)' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'var(--text-primary)' }}>
                    {waiter.name}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Продаж:
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      <span style={{ color: 'var(--brand)' }}>{activeSales}</span> / <span style={{ color: 'var(--text-secondary)' }}>{finishedSales}</span>
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Мотивация:
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      <span style={{ color: 'var(--brand)' }}>{formatMoneyRUB({ amount: activeMotivation, currency: 'RUB' })}</span> / <span style={{ color: 'var(--text-secondary)' }}>{formatMoneyRUB({ amount: finishedMotivation, currency: 'RUB' })}</span>
                    </Typography>
                  </Box>
                </CardContent>
              </MuiCard>
            ))}
          </Box>
        </Box>
      </Box>

    </div>
  );
}
