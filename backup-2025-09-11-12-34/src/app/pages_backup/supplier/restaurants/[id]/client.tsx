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

export default function SupplierRestaurantDetailClient({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  
  const restaurant = useMemo(() => {
    return restaurants.find(r => r.id === params.id);
  }, [params.id]);

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
        <SectionTitle>Информация о ресторане</SectionTitle>
        <Typography color="text.secondary">
          Подробная информация о ресторане будет добавлена позже
        </Typography>
      </Content>
    </PageContainer>
  );
}
