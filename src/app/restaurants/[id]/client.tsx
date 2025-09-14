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

const RestaurantImage = styled('img')({
  width: '100%',
  height: '300px',
  objectFit: 'cover',
  borderRadius: '8px',
  marginBottom: '24px',
});

export default function RestaurantDetailClient({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  
  const restaurant = useMemo(() => {
    return restaurants.find(r => r.id === params.id);
  }, [params.id]);

  // Используем изображения из данных ресторана
  const restaurantImage = restaurant?.imageUrl;

  const restaurantPromotions = useMemo(() => {
    if (!restaurant) return [];
    return promotions.filter(p => p.restaurants.includes(restaurant.id));
  }, [restaurant?.id]);

  const restaurantSales = useMemo(() => {
    if (!restaurant) return [];
    return liveSales.filter(sale => 
      sale.restaurantId === restaurant.id
    );
  }, [restaurant?.id]);

  if (!restaurant) {
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
          <Typography variant="h4">Ресторан не найден</Typography>
        </Content>
      </PageContainer>
    );
  }

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
            {restaurant.name}
          </Typography>
        </Box>
      </Header>

      <Content>
        <RestaurantImage
          src={restaurantImage}
          alt={restaurant.name}
        />

        <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 3 }}>
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            <Tab label="Акции" />
            <Tab label="Продажи" />
            <Tab label="Официанты" />
          </Tabs>
        </Box>

        {activeTab === 0 && (
          <Box>
            <SectionTitle>Активные акции</SectionTitle>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 3 }}>
              {restaurantPromotions.map((promotion) => (
                <RestaurantPromotionCard 
                  key={promotion.id} 
                  id={promotion.id}
                  name={promotion.name}
                  status={promotion.status}
                  bannerUrl={promotion.bannerUrl}
                  startsAt={promotion.startsAt}
                  endsAt={promotion.endsAt}
                  salesCount={promotion.salesCount || 0}
                  motivationToPay={promotion.motivationToPay || { amount: 0, currency: 'RUB' }}
                  waitersCount={promotion.waitersCount || 0}
                />
              ))}
            </Box>
          </Box>
        )}

        {activeTab === 1 && (
          <Box>
            <SectionTitle>Продажи</SectionTitle>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {restaurantSales.slice(0, 10).map((sale) => (
                <SaleEventCard 
                  key={sale.id} 
                  id={sale.id}
                  promotionId={sale.promotionId}
                  promotionName={sale.promotionName}
                  restaurantName={sale.restaurantName}
                  waiterName={sale.waiterName}
                  items={sale.items}
                  totalAmount={sale.totalAmount}
                  occurredAt={sale.occurredAt}
                  promotionBannerUrl={sale.promotionBannerUrl}
                />
              ))}
            </Box>
          </Box>
        )}

        {activeTab === 2 && (
          <Box>
            <SectionTitle>Официанты</SectionTitle>
            <Typography color="text.secondary">
              Информация об официантах будет добавлена позже
            </Typography>
          </Box>
        )}
      </Content>
    </PageContainer>
  );
}
