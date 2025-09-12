"use client";

import { useRouter } from "next/navigation";
import { useState, useMemo, use } from "react";
import { restaurants, promotions, liveSales, waiters, products } from "@/mocks/data";
import { formatMoneyRUB } from "@/mocks/types";
import { Card as MuiCard, CardContent, Typography, Box, Tabs, Tab, Chip, IconButton, Button } from '@mui/material';
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

export default function RestaurantDetailClient({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const [activeTab, setActiveTab] = useState(0);
  const [salesPage, setSalesPage] = useState(1);
  const [salesPerPage] = useState(25);

  if (!resolvedParams?.id) {
    return null;
  }

  const restaurant = restaurants.find(r => r.id === resolvedParams.id);
  if (!restaurant) {
    return null;
  }

  // Получаем акции ресторана
  const restaurantPromotions = useMemo(() => {
    return promotions.filter(promotion => 
      promotion.restaurants.includes(restaurant.id)
    );
  }, [restaurant.id]);

  // Получаем продажи ресторана
  const restaurantSales = useMemo(() => {
    return liveSales.filter(sale => sale.restaurantId === restaurant.id);
  }, [restaurant.id]);

  // Получаем официантов ресторана
  const restaurantWaiters = useMemo(() => {
    return waiters.filter(waiter => waiter.restaurantId === restaurant.id);
  }, [restaurant.id]);

  // Вычисляем статистику
  const totalSalesCount = useMemo(() => {
    return restaurantSales.reduce((sum, sale) => 
      sum + sale.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0
    );
  }, [restaurantSales]);

  const totalMotivation = useMemo(() => {
    return restaurantSales.reduce((sum, sale) => 
      sum + sale.items.reduce((itemSum, item) => itemSum + (item.motivation?.amount || 0) * item.quantity, 0), 0
    );
  }, [restaurantSales]);

  // Топ официанты ресторана
  const topWaiters = useMemo(() => {
    const waiterStats = new Map();
    
    restaurantSales.forEach(sale => {
      const current = waiterStats.get(sale.waiterId) || { 
        waiter: waiters.find(w => w.id === sale.waiterId),
        sales: 0, 
        motivation: 0 
      };
      
      const itemsSold = sale.items.reduce((sum, item) => sum + item.quantity, 0);
      const motivation = sale.items.reduce((sum, item) => sum + (item.motivation?.amount || 0) * item.quantity, 0);
      
      current.sales += itemsSold;
      current.motivation += motivation;
      
      waiterStats.set(sale.waiterId, current);
    });
    
    return Array.from(waiterStats.values())
      .filter(item => item.waiter)
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 10);
  }, [restaurantSales]);

  // Пагинация для ленты продаж
  const paginatedSales = useMemo(() => {
    const startIndex = (salesPage - 1) * salesPerPage;
    const endIndex = startIndex + salesPerPage;
    return restaurantSales.slice(startIndex, endIndex);
  }, [restaurantSales, salesPage, salesPerPage]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <div className="space-y-6">
      {/* Хедер */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <IconButton 
          onClick={() => router.back()}
          sx={{ 
            backgroundColor: 'var(--brand)', 
            color: 'var(--brand-foreground)',
            '&:hover': { 
              backgroundColor: 'var(--hover-medium)' 
            }
          }}
        >
          <IconArrowLeft size={20} />
        </IconButton>
        <Typography variant="h4" sx={{ fontWeight: 600, color: 'text.primary' }}>
          Детализация ресторана
        </Typography>
      </Box>

      {/* Информация о ресторане */}
      <HeaderCard>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 4, alignItems: 'start' }}>
            {/* Фото ресторана */}
            <Box sx={{ 
              width: 120, 
              height: 120, 
              borderRadius: 4, 
              overflow: 'hidden', 
              flexShrink: 0,
              backgroundColor: 'var(--image-background)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {restaurant.imageUrl ? (
                <img 
                  src={restaurant.imageUrl} 
                  alt={restaurant.name}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover' 
                  }}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                    if (nextElement) {
                      nextElement.style.display = 'flex';
                    }
                  }}
                />
              ) : null}
              <Box sx={{ 
                display: restaurant.imageUrl ? 'none' : 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%'
              }}>
                <Typography variant="h4" color="text.secondary">
                  {restaurant.name.charAt(0)}
                </Typography>
              </Box>
            </Box>

            {/* Информация */}
            <Box sx={{ flex: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {restaurant.name}
                </Typography>
                <StatusChip 
                  label="Активен" 
                  color="success" 
                  size="small"
                />
              </Box>
              
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2, mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconMapPin size={16} color="var(--text-secondary)" />
                  <Typography variant="body2" color="text.secondary">
                    {restaurant.address}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconPhone size={16} color="var(--text-secondary)" />
                  <Typography variant="body2" color="text.secondary">
                    {restaurant.phone}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconBuildingStore size={16} color="var(--text-secondary)" />
                  <Typography variant="body2" color="text.secondary">
                    ИНН: {restaurant.inn}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconMail size={16} color="var(--text-secondary)" />
                  <Typography variant="body2" color="text.secondary">
                    {restaurant.adminEmail}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ backgroundColor: 'var(--background-muted)', p: 2, borderRadius: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>
                  Администратор
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {restaurant.adminFullName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {restaurant.adminPhone}
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </HeaderCard>

      {/* Статистика */}
      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3, mb: 4 }}>
        <StatCard>
          <CardContent sx={{ p: 3, textAlign: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
              <IconTrendingUp size={24} color="var(--brand)" />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>
              {totalSalesCount}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Всего продаж
            </Typography>
          </CardContent>
        </StatCard>

        <StatCard>
          <CardContent sx={{ p: 3, textAlign: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
              <IconCurrencyDollar size={24} color="var(--brand)" />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>
              {formatMoneyRUB({ amount: totalMotivation, currency: 'RUB' })}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Мотивация
            </Typography>
          </CardContent>
        </StatCard>

        <StatCard>
          <CardContent sx={{ p: 3, textAlign: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
              <IconCalendar size={24} color="var(--brand)" />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>
              {restaurantPromotions.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Активных акций
            </Typography>
          </CardContent>
        </StatCard>

        <StatCard>
          <CardContent sx={{ p: 3, textAlign: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
              <IconBuildingStore size={24} color="var(--brand)" />
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary', mb: 1 }}>
              {restaurantWaiters.length}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Официантов
            </Typography>
          </CardContent>
        </StatCard>
      </Box>

      {/* Табы */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Акции" />
          <Tab label="Лента продаж" />
          <Tab label="Официанты" />
        </Tabs>
      </Box>

      {/* Контент табов */}
      {activeTab === 0 && (
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: 'text.primary' }}>
            Активные акции ({restaurantPromotions.length})
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 3 }}>
            {restaurantPromotions.map((promotion) => (
              <RestaurantPromotionCard
                key={promotion.id}
                id={promotion.id}
                name={promotion.name}
                status={promotion.status}
                bannerUrl={promotion.bannerUrl || ''}
                startsAt={promotion.startsAt}
                endsAt={promotion.endsAt}
                salesCount={promotion.salesCount}
                motivationToPay={promotion.motivationToPay}
                restaurantsCount={promotion.restaurants.length}
                waitersCount={promotion.waitersCount}
                onClick={() => router.push(`/supplier/promotions/${promotion.id}`)}
              />
            ))}
          </Box>
        </Box>
      )}

      {activeTab === 1 && (
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: 'text.primary' }}>
            Лента продаж ({restaurantSales.length})
          </Typography>
          <Box sx={{ space: 2 }}>
            {paginatedSales.map((sale) => {
              const waiter = waiters.find(w => w.id === sale.waiterId);
              const promotion = promotions.find(p => p.id === sale.promotionId);
              
              // Обогащаем данные позиций информацией о продуктах
              const enrichedItems = sale.items.map(item => {
                const product = products.find(p => p.id === item.productId);
                return {
                  ...item,
                  product: product || { name: 'Неизвестный товар', imageUrl: '' }
                };
              });
              
              return (
                <SaleEventCard
                  key={sale.id}
                  id={sale.id}
                  promotionId={sale.promotionId}
                  promotionName={promotion?.name || 'Неизвестная акция'}
                  restaurantName={restaurant.name}
                  waiterName={waiter?.name || 'Неизвестный официант'}
                  items={enrichedItems}
                  totalAmount={{ 
                    amount: enrichedItems.reduce((sum, item) => sum + (item.motivation?.amount || 0) * item.quantity, 0), 
                    currency: 'RUB' 
                  }}
                  occurredAt={sale.occurredAt}
                  promotionBannerUrl={promotion?.bannerUrl}
                  onPromotionClick={() => {
                    if (promotion) {
                      router.push(`/supplier/promotions/${promotion.id}`);
                    }
                  }}
                  onRestaurantClick={() => {
                    // Уже на странице ресторана
                  }}
                />
              );
            })}
          </Box>
          
          {/* Пагинация */}
          {Math.ceil(restaurantSales.length / salesPerPage) > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="outlined"
                  size="small"
                  disabled={salesPage === 1}
                  onClick={() => setSalesPage(salesPage - 1)}
                >
                  Назад
                </Button>
                <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', px: 2 }}>
                  {salesPage} из {Math.ceil(restaurantSales.length / salesPerPage)}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  disabled={salesPage >= Math.ceil(restaurantSales.length / salesPerPage)}
                  onClick={() => setSalesPage(salesPage + 1)}
                >
                  Вперед
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      )}

      {activeTab === 2 && (
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: 'text.primary' }}>
            Официанты ({restaurantWaiters.length})
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 3 }}>
            {topWaiters.map(({ waiter, sales, motivation }, index) => (
              <StatCard key={waiter.id}>
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Box sx={{ 
                      width: 40, 
                      height: 40, 
                      borderRadius: '50%', 
                      backgroundColor: 'var(--brand)', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 600
                    }}>
                      {waiter.name.charAt(0)}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                        #{index + 1} {waiter.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {sales} продаж
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Мотивация:
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'var(--brand)' }}>
                      {formatMoneyRUB({ amount: motivation, currency: 'RUB' })}
                    </Typography>
                  </Box>
                </CardContent>
              </StatCard>
            ))}
          </Box>
        </Box>
      )}
    </div>
  );
}
