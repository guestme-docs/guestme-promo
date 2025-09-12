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

export default function SupplierPromotionDetailClient({ params }: { params: { id: string } }) {
  const router = useRouter();
  
  const promotion = useMemo(() => {
    return promotions.find(p => p.id === params.id);
  }, [params.id]);

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
        <PromotionCard
          promotion={promotion}
          salesCount={0}
          motivation={0}
        />
        
        <SectionTitle>Детали акции</SectionTitle>
        <Typography color="text.secondary">
          Подробная информация об акции будет добавлена позже
        </Typography>
      </Content>
    </PageContainer>
  );
}
