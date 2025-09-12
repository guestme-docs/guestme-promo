"use client";

import { useRouter } from "next/navigation";
import { useState, useMemo, use } from "react";
import { restaurants, promotions, liveSales, waiters, products } from "@/mocks/data";
import { formatMoneyRUB } from "@/mocks/types";
import { usePromotionStore } from "@/stores/promotionStore";
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button,
  IconButton,
  Select,
  MenuItem,
  FormControl
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SaleEventCard from '@/components/SaleEventCard';
import PromotionCard from '@/components/PromotionCard';
import NowUILineChart from '@/components/charts/NowUILineChart';
import { 
  IconArrowLeft,
  IconCalendar,
  IconCurrencyDollar,
  IconUsers,
  IconBuildingStore,
  IconCheck,
  IconDownload
} from '@tabler/icons-react';

const HeaderCard = styled(Card)(({ theme }) => ({
  backgroundColor: 'var(--card-background)',
  borderRadius: 4,
  boxShadow: 'var(--shadow-light)',
  border: '1px solid var(--card-border)',
}));

const StatCard = styled(Card)(({ theme }) => ({
  backgroundColor: 'var(--card-background)',
  borderRadius: 4,
  boxShadow: 'var(--shadow-light)',
  border: '1px solid var(--card-border)',
}));

const TopItemCard = styled(Card)(({ theme }) => ({
  backgroundColor: 'transparent',
  borderRadius: 4,
  border: '1px solid var(--card-border)',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: 'var(--shadow-hover)',
  },
}));

const ProductCard = styled(Card)(({ theme }) => ({
  width: '100%',
  minHeight: 400,
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

function usePromotion(id: string | undefined) {
  const promotions = usePromotionStore((state) => state.promotions);
  return promotions.find((promotion) => promotion.id === id);
}

export default function PromotionDetail({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { } = usePromotionStore();
  const resolvedParams = use(params);
  const item = usePromotion(resolvedParams?.id);
  const [salesPage, setSalesPage] = useState(1);
  const [salesPerPage] = useState(25);
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>('all');

  if (!item || !resolvedParams?.id) {
    return null;
  }

  const promotion = promotions.find(p => p.id === resolvedParams.id);
  if (!promotion) {
    return null;
  }


  // Получаем продажи по акции
  const promotionSales = useMemo(() => {
    return liveSales.filter(sale => sale.promotionId === promotion.id);
  }, [promotion.id]);

  // Вычисляем статистику
  const totalSalesCount = useMemo(() => {
    return promotionSales.reduce((sum, sale) => 
      sum + sale.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0
    );
  }, [promotionSales]);

  const totalMotivation = useMemo(() => {
    return promotionSales.reduce((sum, sale) => 
      sum + sale.items.reduce((itemSum, item) => itemSum + (item.motivation?.amount || 0) * item.quantity, 0), 0
    );
  }, [promotionSales]);

  // Топ рестораны
  const topRestaurants = useMemo(() => {
    const restaurantStats = new Map();
    
    promotionSales.forEach(sale => {
      const current = restaurantStats.get(sale.restaurantId) || { 
        restaurant: restaurants.find(r => r.id === sale.restaurantId),
        sales: 0, 
        motivation: 0 
      };
      
      const itemsSold = sale.items.reduce((sum, item) => sum + item.quantity, 0);
      const motivation = sale.items.reduce((sum, item) => sum + (item.motivation?.amount || 0) * item.quantity, 0);
      
      current.sales += itemsSold;
      current.motivation += motivation;
      
      restaurantStats.set(sale.restaurantId, current);
    });
    
    return Array.from(restaurantStats.values())
      .filter(item => item.restaurant)
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 10);
  }, [promotionSales]);

  // Топ официанты
  const topWaiters = useMemo(() => {
    const waiterStats = new Map();
    
    promotionSales.forEach(sale => {
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
  }, [promotionSales]);

  // Фильтрация продаж по ресторану
  const filteredSales = useMemo(() => {
    if (selectedRestaurant === 'all') {
      return promotionSales;
    }
    return promotionSales.filter(sale => sale.restaurantId === selectedRestaurant);
  }, [promotionSales, selectedRestaurant]);

  // Пагинация для ленты продаж
  const paginatedSales = useMemo(() => {
    const startIndex = (salesPage - 1) * salesPerPage;
    const endIndex = startIndex + salesPerPage;
    return filteredSales.slice(startIndex, endIndex);
  }, [filteredSales, salesPage, salesPerPage]);

  // Данные для графика
  const chartData = useMemo(() => {
    const dailySales = new Map();
    promotionSales.forEach(sale => {
      const date = new Date(sale.occurredAt).toISOString().split('T')[0];
      const currentCount = dailySales.get(date) || 0;
      // Считаем количество проданных позиций, а не событий
      const itemsSold = sale.items.reduce((sum, item) => sum + item.quantity, 0);
      dailySales.set(date, currentCount + itemsSold);
    });
    
    // Заполняем все дни периода акции, включая дни без продаж
    const startDate = new Date(promotion.startsAt);
    const endDate = new Date(promotion.endsAt);
    const allDates = [];
    
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      allDates.push(dateStr);
    }
    
    return allDates.map(date => ({
      x: new Date(date).getTime(),
      y: dailySales.get(date) || 0
    }));
  }, [promotionSales, promotion.startsAt, promotion.endsAt]);

  // Функция экспорта
  const exportToCSV = () => {
    const csvContent = [
      ['Дата', 'Ресторан', 'Официант', 'Продукт', 'Количество', 'Мотивация'],
      ...filteredSales.flatMap(sale => {
        const restaurant = restaurants.find(r => r.id === sale.restaurantId);
        const waiter = waiters.find(w => w.id === sale.waiterId);
        return sale.items.map(item => {
          const product = products.find(p => p.id === item.productId);
          return [
            new Date(sale.occurredAt).toLocaleDateString('ru-RU'),
            restaurant?.name || 'Неизвестный ресторан',
            waiter?.name || 'Неизвестный официант',
            product?.name || 'Неизвестный товар',
            item.quantity.toString(),
            (item.motivation?.amount || 0).toString()
          ];
        });
      })
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `promotion-${promotion?.name || 'unknown'}-sales.csv`;
    link.click();
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
          Детализация акции
        </Typography>
      </Box>

      {/* Основной контент */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 4, alignItems: 'stretch' }}>
        {/* Левая колонка - карточка акции */}
        <Box sx={{ height: '100%' }}>
          <PromotionCard
            id={promotion.id}
            name={promotion.name}
            status={promotion.status}
            bannerUrl={promotion.bannerUrl || ''}
            startsAt={promotion.startsAt}
            endsAt={promotion.endsAt}
            salesCount={totalSalesCount}
            motivationToPay={{ amount: totalMotivation, currency: 'RUB' }}
            restaurantsCount={promotion.restaurants.length}
            waitersCount={promotion.waitersCount}
            onClick={() => {}}
            hideDetailButton={true}
          />
        </Box>

        {/* Правая колонка - описание акции */}
        <Box sx={{ height: '100%' }}>
          <HeaderCard sx={{ height: '100%' }}>
            <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                    Описание
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {promotion.description}
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                    Цель акции
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {promotion.goal}
                  </Typography>
                </Box>
                
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'text.primary' }}>
                    Условия участия
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                    {promotion.conditions}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </HeaderCard>
        </Box>
      </Box>

      {/* Продвигаемые продукты */}
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: 'text.primary' }}>
          Продвигаемые продукты
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 3 }}>
            {promotion.motivations.map((motivation) => {
              const product = products.find(p => p.id === motivation.productId);
              if (!product) return null;
              
              const waiterAmount = Math.round(motivation.value * 0.6);
              const adminAmount = Math.round(motivation.value * 0.1);
              const guestmeAmount = Math.round(motivation.value * 0.3);

  return (
                <ProductCard key={motivation.productId}>
                  <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    {/* Фото продукта */}
                    <Box sx={{ 
                      width: '100%', 
                      height: 120, 
                      overflow: 'hidden',
                      mb: 3,
                      backgroundColor: 'var(--image-background)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      '& img': {
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      },
                    }}>
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                      />
                    </Box>
                    
                    {/* Название и описание */}
                    <Box sx={{ flex: 1, mb: 3 }}>
                      <Typography variant="h6" sx={{ 
                        fontWeight: 600, 
                        mb: 1, 
                        color: 'text.primary',
                        fontSize: '1.1rem'
                      }}>
                        {product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ 
                        lineHeight: 1.5,
                        fontSize: '0.875rem'
                      }}>
                        {product.description || 'Описание не указано'}
                      </Typography>
                    </Box>
                    
                    {/* Мотивация */}
                    <Box sx={{ 
                      backgroundColor: 'var(--motivation-background)', 
                      p: 2,
                      border: '1px solid var(--motivation-border)',
                      minHeight: 120,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}>
                      <Typography variant="subtitle2" sx={{ 
                        fontWeight: 600, 
                        mb: 2, 
                        color: 'text.primary',
                        fontSize: '0.9rem'
                      }}>
                        Мотивация за продажу: {formatMoneyRUB({ amount: motivation.value, currency: 'RUB' })}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                            Официанту (60%)
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#10b981', fontSize: '0.8rem' }}>
                            {formatMoneyRUB({ amount: waiterAmount, currency: 'RUB' })}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                            Администратору (10%)
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#3b82f6', fontSize: '0.8rem' }}>
                            {formatMoneyRUB({ amount: adminAmount, currency: 'RUB' })}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8rem' }}>
                            Комиссия GuestMe (30%)
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#8b5cf6', fontSize: '0.8rem' }}>
                            {formatMoneyRUB({ amount: guestmeAmount, currency: 'RUB' })}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </ProductCard>
              );
            })}
        </Box>
      </Box>

      {/* График динамики продаж */}
      <Box>
        <Box sx={{ height: 400, minHeight: 400 }}>
          {chartData.length > 0 ? (
            <NowUILineChart
              data={chartData}
            />
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              <Typography variant="body2" color="text.secondary">
                Нет данных для отображения
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* Лента продаж и топы */}
      <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 4 }}>
        {/* Лента продаж */}
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.primary' }}>
              Лента продаж ({filteredSales.reduce((sum, sale) => sum + sale.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0)})
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              {/* Фильтр по ресторану */}
              <FormControl size="small" sx={{ minWidth: 200 }}>
                <Select
                  value={selectedRestaurant}
                  onChange={(e) => setSelectedRestaurant(e.target.value)}
                  sx={{
                    borderRadius: '4px',
                    fontSize: '14px',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'var(--border-muted)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'var(--border)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'var(--brand)',
                      boxShadow: '0 0 0 3px var(--hover-light)',
                    },
                    '& .MuiSelect-select': {
                      padding: '8px 12px',
                    }
                  }}
                >
                  <MenuItem value="all">Все рестораны</MenuItem>
                  {promotion.restaurants.map(restaurantId => {
                    const restaurant = restaurants.find(r => r.id === restaurantId);
                    return (
                      <MenuItem key={restaurantId} value={restaurantId}>
                        {restaurant?.name || 'Неизвестный ресторан'}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              
              {/* Кнопка экспорта */}
              <Button
                variant="outlined"
                startIcon={<IconDownload size={16} />}
                onClick={exportToCSV}
                sx={{ 
                  borderColor: 'var(--brand)',
                  color: 'var(--brand)',
                  '&:hover': {
                    borderColor: 'var(--hover-medium)',
                    color: 'var(--hover-medium)',
                    backgroundColor: 'var(--hover-light)'
                  }
                }}
              >
                Экспорт
              </Button>
            </Box>
          </Box>
          
          <Box sx={{ space: 2 }}>
            {paginatedSales.map((sale) => {
              const restaurant = restaurants.find(r => r.id === sale.restaurantId);
              const waiter = waiters.find(w => w.id === sale.waiterId);
              
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
                  promotionName={promotion.name}
                  restaurantName={restaurant?.name || 'Неизвестный ресторан'}
                  waiterName={waiter?.name || 'Неизвестный официант'}
                  items={enrichedItems}
                  totalAmount={{ 
                    amount: enrichedItems.reduce((sum, item) => sum + (item.motivation?.amount || 0) * item.quantity, 0), 
                    currency: 'RUB' 
                  }}
                  occurredAt={sale.occurredAt}
                  promotionBannerUrl={promotion.bannerUrl}
                  onPromotionClick={() => {
                    // Можно добавить навигацию к детальной странице акции
                  }}
                  onRestaurantClick={() => {
                    router.push(`/supplier/restaurants/${sale.restaurantId}`);
                  }}
                />
              );
            })}
          </Box>
          
          {/* Пагинация */}
          {Math.ceil(filteredSales.length / salesPerPage) > 1 && (
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
                  {salesPage} из {Math.ceil(filteredSales.length / salesPerPage)}
                </Typography>
                <Button
                  variant="outlined"
                  size="small"
                  disabled={salesPage >= Math.ceil(filteredSales.length / salesPerPage)}
                  onClick={() => setSalesPage(salesPage + 1)}
                >
                  Вперед
                </Button>
              </Box>
            </Box>
          )}
        </Box>

        {/* Правая колонка - Топы */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {/* Топ рестораны */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: 'text.primary' }}>
              Топ-10 ресторанов
            </Typography>
            <Box sx={{ space: 2 }}>
              {topRestaurants.map(({ restaurant, sales, motivation }, index) => (
                <TopItemCard key={restaurant.id} sx={{ mb: 2 }} onClick={() => router.push(`/supplier/restaurants/${restaurant.id}`)}>
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      {/* Фото ресторана */}
                      <Box sx={{ 
                        width: 40, 
                        height: 40, 
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
                          <Typography variant="caption" color="text.secondary">
                            {restaurant.name.charAt(0)}
                          </Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                              #{index + 1} {restaurant.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {sales} продаж
                            </Typography>
                          </Box>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: 'var(--brand)' }}>
                            {formatMoneyRUB({ amount: motivation, currency: 'RUB' })}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </TopItemCard>
              ))}
            </Box>
          </Box>

          {/* Топ официанты */}
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: 'text.primary' }}>
              Топ-10 официантов
            </Typography>
            <Box sx={{ space: 2 }}>
              {topWaiters.map(({ waiter, sales, motivation }, index) => {
                const waiterRestaurant = restaurants.find(r => r.id === waiter.restaurantId);
                return (
                  <TopItemCard key={waiter.id} sx={{ mb: 2 }}>
                    <CardContent sx={{ p: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                            #{index + 1} {waiter.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {waiterRestaurant?.name || 'Неизвестный ресторан'} • {sales} продаж
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: 'var(--brand)' }}>
                          {formatMoneyRUB({ amount: motivation, currency: 'RUB' })}
                        </Typography>
                      </Box>
                    </CardContent>
                  </TopItemCard>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Box>
    </div>
  );
}
