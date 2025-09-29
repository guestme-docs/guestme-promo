"use client";

import { useRouter } from "next/navigation";
import { useState, useMemo, use } from "react";
import { restaurants, promotions, liveSales, waiters, products } from "@/mocks/data";
import { staticPromoSaleEvents } from "@/mocks/static_tips_events";
import { formatMoneyRUB } from "@/mocks/types";
import { usePromotionStore } from "@/stores/promotionStore";
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Button,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import TipsEventCard from '@/components/TipsEventCard';
import TipsPromotionCard from '@/components/TipsPromotionCard';
import NowUILineChart from '@/components/charts/NowUILineChart';
import { 
  IconArrowLeft
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


const ProductCard = styled(Card)(({ theme }) => ({
  width: '100%',
  minHeight: 320,
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

export default function TipsPromotionDetailClient({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { } = usePromotionStore();
  const resolvedParams = use(params);
  const item = usePromotion(resolvedParams?.id);
  const [salesPage, setSalesPage] = useState(1);
  const [salesPerPage] = useState(25);

  if (!item || !resolvedParams?.id) {
    return null;
  }

  const promotion = promotions.find(p => p.id === resolvedParams.id);
  if (!promotion) {
    return null;
  }


  // Получаем продажи по акции из данных портала официанта
  const promotionSales = useMemo(() => {
    return staticPromoSaleEvents.filter(sale => sale.promotionId === promotion.id);
  }, [promotion.id]);

  // Вычисляем статистику для данных портала официанта
  const totalSalesCount = useMemo(() => {
    return promotionSales.reduce((sum, sale) => sum + sale.quantity, 0);
  }, [promotionSales]);

  const totalMotivation = useMemo(() => {
    return promotionSales.reduce((sum, sale) => sum + sale.motivation.amount, 0);
  }, [promotionSales]);


  // Используем все продажи без фильтрации
  const filteredSales = promotionSales;

  // Пагинация для ленты продаж
  const paginatedSales = useMemo(() => {
    const startIndex = (salesPage - 1) * salesPerPage;
    const endIndex = startIndex + salesPerPage;
    return filteredSales.slice(startIndex, endIndex);
  }, [filteredSales, salesPage, salesPerPage]);

  // Данные для графика для данных портала официанта
  const chartData = useMemo(() => {
    const dailySales = new Map();
    promotionSales.forEach(sale => {
      const date = new Date(sale.date).toISOString().split('T')[0];
      const currentCount = dailySales.get(date) || 0;
      // Считаем количество проданных позиций
      dailySales.set(date, currentCount + sale.quantity);
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
          <TipsPromotionCard
            id={promotion.id}
            name={promotion.name}
            status={promotion.status}
            bannerUrl={promotion.bannerUrl || ''}
            startsAt={promotion.startsAt}
            endsAt={promotion.endsAt}
            salesCount={totalSalesCount}
            motivationToPay={{ amount: totalMotivation, currency: 'RUB' }}
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
                      height: 100, 
                      overflow: 'hidden',
                      mb: 2,
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
                    <Box sx={{ flex: 1, mb: 2 }}>
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
                    
                    {/* Мотивация для официанта */}
                    <Box sx={{ 
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: 60
                    }}>
                      <Typography variant="body2" color="text.secondary" sx={{ 
                        fontSize: '0.875rem',
                        mb: 1,
                        textAlign: 'center'
                      }}>
                        За продажу получите
                      </Typography>
                      <Typography variant="h5" sx={{ 
                        fontWeight: 700,
                        color: '#10b981',
                        fontSize: '1.5rem',
                        textAlign: 'center'
                      }}>
                        {formatMoneyRUB({ amount: waiterAmount, currency: 'RUB' })}
                      </Typography>
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

      {/* Лента продаж */}
      <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.primary' }}>
              Лента продаж ({filteredSales.reduce((sum, sale) => sum + sale.quantity, 0)})
            </Typography>
            
          </Box>
          
          <Box sx={{ space: 2 }}>
            {paginatedSales.map((sale) => {
              const event = {
                id: sale.id,
                type: 'promo_sale' as const,
                promotionId: sale.promotionId,
                promotionName: sale.promotionName,
                productId: sale.productId,
                productName: sale.productName,
                motivation: sale.motivation,
                quantity: sale.quantity,
                date: sale.date,
                restaurantId: sale.restaurantId,
                restaurantName: sale.restaurantName,
                waiterId: sale.waiterId,
                orderId: sale.orderId
              };
              
              return (
                <TipsEventCard
                  key={sale.id}
                  event={event}
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

    </div>
  );
}
