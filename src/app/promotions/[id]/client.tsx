"use client";

import { useRouter } from "next/navigation";
import { useState, useMemo, use } from "react";
import { restaurants, promotions, liveSales, waiters, products } from "@/mocks/data";
import { formatMoneyRUB } from "@/mocks/types";
// import { usePromotionStore } from "@/mocks/store";
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
  IconDownload,
  IconStar,
  IconTrendingUp,
  IconUsers,
  IconBuildingStore
} from '@tabler/icons-react';

const PageContainer = styled(Box)({
  minHeight: '100vh',
  backgroundColor: 'var(--background)',
  color: 'var(--text-primary)',
});

const Header = styled(Box)({
  padding: '24px',
  borderBottom: '1px solid var(--border)',
  backgroundColor: 'var(--card-background)',
});

const Content = styled(Box)({
  padding: '24px',
  maxWidth: '1200px',
  margin: '0 auto',
});

const SectionTitle = styled(Typography)({
  fontSize: '1.5rem',
  fontWeight: 600,
  marginBottom: '16px',
  color: 'var(--text-primary)',
});

const StatsGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
  gap: '16px',
  marginBottom: '32px',
});

const ChartCard = styled(Card)({
  backgroundColor: 'var(--card-background)',
  border: '1px solid var(--border)',
  marginBottom: '24px',
});

const SalesFeedCard = styled(Card)({
  backgroundColor: 'var(--card-background)',
  border: '1px solid var(--border)',
  marginBottom: '24px',
});

const TopWaitersCard = styled(Card)({
  backgroundColor: 'var(--card-background)',
  border: '1px solid var(--border)',
});

const WaiterItem = styled(Box)<{ $isCurrent?: boolean }>(({ $isCurrent }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 16px',
  borderBottom: '1px solid var(--border)',
  backgroundColor: $isCurrent ? 'var(--hover-light)' : 'transparent',
  border: $isCurrent ? '2px solid var(--brand)' : 'none',
  borderRadius: $isCurrent ? '8px' : '0',
  '&:last-child': {
    borderBottom: 'none',
  },
}));

const WaiterInfo = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
});

const WaiterAvatar = styled('img')({
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  objectFit: 'cover',
});

const WaiterName = styled(Typography)<{ $isCurrent?: boolean }>(({ $isCurrent }) => ({
  fontWeight: $isCurrent ? 700 : 500,
  color: $isCurrent ? 'var(--brand)' : 'var(--text-primary)',
}));

const CurrentWaiterBadge = styled(Box)({
  backgroundColor: 'var(--hover-light)',
  color: 'var(--brand)',
  padding: '2px 8px',
  borderRadius: '12px',
  fontSize: '0.75rem',
  fontWeight: 600,
  border: '1px solid var(--brand)',
});

const SalesCount = styled(Typography)({
  fontSize: '1.25rem',
  fontWeight: 700,
  color: 'var(--brand)',
});

const ProductCard = styled(Card)({
  backgroundColor: 'var(--card-background)',
  border: '1px solid var(--border)',
  marginBottom: '16px',
});

const ProductImage = styled('img')({
  width: '100%',
  height: '200px',
  objectFit: 'cover',
  borderRadius: '8px 8px 0 0',
});

const MotivationBox = styled(Box)({
  backgroundColor: 'var(--hover-light)',
  padding: '12px',
  borderRadius: '8px',
  textAlign: 'center',
  marginTop: '12px',
});

const MotivationText = styled(Typography)({
  fontSize: '1.125rem',
  fontWeight: 700,
  color: 'var(--brand)',
});

export default function PromotionDetailClient({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>('all');
  
  // Текущий официант (в реальном приложении это будет из контекста/состояния)
  const currentWaiterId = 'w1';
  
  // Разрешаем промис с параметрами
  const resolvedParams = use(params);
  
  const promotion = useMemo(() => {
    return promotions.find(p => p.id === resolvedParams.id);
  }, [resolvedParams.id]);

  // Фильтрация продаж по текущему официанту
  const promotionSales = useMemo(() => {
    if (!promotion) return [];
    return liveSales.filter(sale => 
      sale.promotionId === promotion.id && 
      sale.waiterId === currentWaiterId
    );
  }, [promotion?.id, currentWaiterId]);

  if (!promotion) {
    return (
      <PageContainer>
        <Header>
          <Button
            startIcon={<IconArrowLeft />}
            onClick={() => router.back()}
            sx={{ color: 'var(--text-primary)' }}
          >
            Назад
          </Button>
        </Header>
        <Content>
          <Typography variant="h4">Акция не найдена</Typography>
        </Content>
      </PageContainer>
    );
  }

  // Статистика по официанту
  const totalSalesCount = useMemo(() => {
    return promotionSales.reduce((sum, sale) => sum + sale.itemsSold, 0);
  }, [promotionSales]);

  const totalMotivation = useMemo(() => {
    return promotionSales.reduce((sum, sale) => sum + sale.motivation, 0);
  }, [promotionSales]);

  // Данные для графика (только продажи текущего официанта)
  const chartData = useMemo(() => {
    const salesByDay: { [key: string]: number } = {};
    
    promotionSales.forEach(sale => {
      const dateObj = new Date(sale.timestamp);
      // Проверяем валидность даты
      if (!isNaN(dateObj.getTime())) {
        const date = dateObj.toISOString().split('T')[0];
        salesByDay[date] = (salesByDay[date] || 0) + sale.itemsSold;
      }
    });

    return Object.entries(salesByDay).map(([date, count]) => ({
      date,
      count,
    })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [promotionSales]);

  // Топ официантов (только из ресторана текущего официанта)
  const currentWaiter = waiters.find(w => w.id === currentWaiterId);
  const currentRestaurantId = currentWaiter?.restaurantId;
  
  const topWaiters = useMemo(() => {
    if (!currentRestaurantId) return [];
    
    const restaurantWaiters = waiters.filter(w => 
      w.restaurantId === currentRestaurantId
    );
    
    return restaurantWaiters.map(waiter => {
      const waiterSales = liveSales.filter(sale => 
        sale.waiterId === waiter.id && 
        sale.promotionId === promotion.id
      );
      
      const salesCount = waiterSales.reduce((sum, sale) => sum + sale.itemsSold, 0);
      
      return {
        ...waiter,
        salesCount,
      };
    }).sort((a, b) => b.salesCount - a.salesCount);
  }, [currentRestaurantId, promotion.id]);

  // Фильтрация продаж для ленты
  const filteredSales = useMemo(() => {
    return promotionSales.slice(0, 10); // Показываем только последние 10 продаж
  }, [promotionSales]);

  return (
    <PageContainer>
      <Header>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            startIcon={<IconArrowLeft />}
            onClick={() => router.back()}
            sx={{ color: 'var(--text-primary)' }}
          >
            Назад
          </Button>
          <Typography variant="h4" sx={{ color: 'var(--text-primary)' }}>
            {promotion.title}
          </Typography>
        </Box>
      </Header>

      <Content>
        {/* Карточка акции */}
        <PromotionCard
          promotion={promotion}
          salesCount={totalSalesCount}
          motivationToPay={{ amount: totalMotivation, currency: 'RUB' }}
        />

        {/* Продвигаемые продукты */}
        <SectionTitle>Продвигаемые продукты</SectionTitle>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 3, marginBottom: 4 }}>
          {promotion.products.map((productId) => {
            const product = products.find(p => p.id === productId);
            if (!product) return null;

            return (
              <ProductCard key={product.id}>
                <ProductImage
                  src={product.imageUrl}
                  alt={product.name}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ marginBottom: 1 }}>
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ 
                    lineHeight: 1.5,
                    fontSize: '0.875rem'
                  }}>
                    {product.name || 'Описание не указано'}
                  </Typography>
                  
                  {/* Мотивация официанта */}
                  <MotivationBox>
                    <MotivationText>
                      Мотивация: {formatMoneyRUB(product.motivation)}
                    </MotivationText>
                  </MotivationBox>
                </CardContent>
              </ProductCard>
            );
          })}
        </Box>

        {/* График динамики продаж */}
        <SectionTitle>Динамика продаж</SectionTitle>
        <ChartCard>
          <CardContent>
            <NowUILineChart
              data={chartData}
              title="Продажи по дням"
              dataKey="count"
              xAxisKey="date"
            />
          </CardContent>
        </ChartCard>

        {/* Мои продажи */}
        <SectionTitle>Мои продажи</SectionTitle>
        <SalesFeedCard>
          <CardContent>
            {filteredSales.length > 0 ? (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {filteredSales.map((sale) => (
                  <SaleEventCard key={sale.id} sale={sale} />
                ))}
              </Box>
            ) : (
              <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                Пока нет продаж
              </Typography>
            )}
          </CardContent>
        </SalesFeedCard>

        {/* Топ официантов */}
        <SectionTitle>Топ официантов</SectionTitle>
        <TopWaitersCard>
          <CardContent>
            {topWaiters.length > 0 ? (
              <Box>
                {topWaiters.map((waiter) => (
                  <WaiterItem key={waiter.id} $isCurrent={waiter.id === currentWaiterId}>
                    <WaiterInfo>
                      <WaiterAvatar
                        src={waiter.avatar}
                        alt={`${waiter.name} ${waiter.surname}`}
                      />
                      <Box>
                        <WaiterName $isCurrent={waiter.id === currentWaiterId}>
                          {waiter.name} {waiter.surname}
                        </WaiterName>
                        {waiter.id === currentWaiterId && (
                          <CurrentWaiterBadge>Вы</CurrentWaiterBadge>
                        )}
                      </Box>
                    </WaiterInfo>
                    <SalesCount>{waiter.salesCount}</SalesCount>
                  </WaiterItem>
                ))}
              </Box>
            ) : (
              <Typography color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                Нет данных об официантах
              </Typography>
            )}
          </CardContent>
        </TopWaitersCard>
      </Content>
    </PageContainer>
  );
}
