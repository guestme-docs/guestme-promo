"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { usePromotionStore } from "@/mocks/store";
import { restaurants, products } from "@/mocks/data";
import type { PromotionStatus } from "@/mocks/types";
import PromotionCard from "@/components/PromotionCard";
import { useRouter } from "next/navigation";
import { Card, CardContent, Box, Typography, Select, MenuItem, FormControl, InputLabel, Chip, OutlinedInput, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const statusGroups = [
  { status: "active" as const, label: "Активные", color: "var(--brand)" },
  { status: "scheduled" as const, label: "Запланированные", color: "var(--warning)" },
  { status: "finished" as const, label: "Завершённые", color: "var(--text-muted)" },
];

// Стилизованные компоненты в стиле Creative Tim Now UI
const FilterCard = styled(Card)(({ theme }) => ({
  height: '100%',
  backgroundColor: 'transparent',
  color: 'var(--text-primary)',
  boxShadow: 'none',
  border: 'none',
}));

const FilterTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1.25rem',
  color: 'var(--text-primary)',
  marginBottom: '24px',
}));

const FilterContainer = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '20px',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
});

const FilterItem = styled(FormControl)(({ theme }) => ({
  minWidth: 220,
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
  '& .MuiSelect-select': {
    padding: '12px 14px',
    fontSize: '0.875rem',
    fontWeight: 500,
    '&::placeholder': {
      color: theme.palette.text.secondary,
      opacity: 1,
    },
  },
  '& .MuiInputBase-input::placeholder': {
    color: theme.palette.text.secondary,
    opacity: 1,
  },
}));

const ProductChipsContainer = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  marginTop: '12px',
});

const ProductChip = styled(Chip)(({ theme }) => ({
  fontSize: '0.75rem',
  height: 28,
  fontWeight: 500,
  backgroundColor: 'var(--muted)',
  color: 'var(--text-primary)',
  border: '1px solid var(--border)',
  '&:hover': {
    backgroundColor: 'var(--hover-light)',
  },
  '& .MuiChip-deleteIcon': {
    color: 'var(--text-secondary)',
    '&:hover': {
      color: 'var(--brand)',
    },
  },
}));

const CreateButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'var(--brand)',
  color: 'var(--brand-foreground)',
  borderRadius: 4,
  padding: '12px 24px',
  fontSize: '0.875rem',
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: 'var(--shadow-light)',
  border: '1px solid var(--brand)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: 'var(--brand-hover)',
    boxShadow: 'var(--shadow-hover)',
    transform: 'translateY(-2px)',
  },
  '&:active': {
    transform: 'translateY(0)',
  },
}));

export default function PromotionsPage() {
  const router = useRouter();
  const { list } = usePromotionStore();
  const [selectedPromotion, setSelectedPromotion] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<PromotionStatus | "all">("all");
  const [selectedRestaurant, setSelectedRestaurant] = useState<string>("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);

  // Получаем только те продукты, которые участвуют в акциях
  const availableProducts = useMemo(() => {
    const productIds = new Set<string>();
    list.forEach(promotion => {
      promotion.motivations.forEach(motivation => {
        productIds.add(motivation.productId);
      });
    });
    return products.filter(product => productIds.has(product.id));
  }, [list]);

  const filtered = useMemo(() => {
    return list.filter((p) => {
      const matchesPromotion = selectedPromotion === "" || p.id === selectedPromotion;
      const matchesStatus = selectedStatus === "all" || p.status === selectedStatus;
      const matchesRestaurant = selectedRestaurant === "" || 
        p.restaurants.includes(selectedRestaurant);
      const matchesProducts = selectedProducts.length === 0 || 
        p.motivations.some(m => selectedProducts.includes(m.productId));
      
      return matchesPromotion && matchesStatus && matchesRestaurant && matchesProducts;
    });
  }, [list, selectedPromotion, selectedStatus, selectedRestaurant, selectedProducts]);

  const toggleProduct = (productId: string) => {
    setSelectedProducts(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const grouped = useMemo(() => {
    const groups: Record<PromotionStatus, typeof list> = {
      active: [],
      scheduled: [],
      finished: [],
      draft: [],
      paused: [],
      archived: []
    };
    
    filtered.forEach(p => {
      if (groups[p.status]) {
        groups[p.status].push(p);
      }
    });
    
    return groups;
  }, [filtered]);


  return (
    <div className="space-y-6">
      {/* Filters */}
      <FilterCard>
        <CardContent sx={{ p: 3 }}>
          <FilterContainer>
            {/* Filters Group */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '20px', alignItems: 'flex-end' }}>
              {/* Promotion Search */}
              <FilterItem>
                <Select
                  value={selectedPromotion}
                  onChange={(e) => setSelectedPromotion(e.target.value)}
                  input={<OutlinedInput placeholder="Все акции" />}
                  displayEmpty
                >
                  <MenuItem value="">Все акции</MenuItem>
                  {list.map((promotion) => (
                    <MenuItem key={promotion.id} value={promotion.id}>
                      {promotion.name}
                    </MenuItem>
                  ))}
                </Select>
              </FilterItem>

              {/* Status Filter */}
              <FilterItem>
                <Select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as PromotionStatus | "all")}
                  input={<OutlinedInput placeholder="Все статусы" />}
                  displayEmpty
                >
                  <MenuItem value="all">Все статусы</MenuItem>
                  {statusGroups.map(({ status, label }) => (
                    <MenuItem key={status} value={status}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
              </FilterItem>

              {/* Restaurant Filter */}
              <FilterItem>
                <Select
                  value={selectedRestaurant}
                  onChange={(e) => setSelectedRestaurant(e.target.value)}
                  input={<OutlinedInput placeholder="Все рестораны" />}
                  displayEmpty
                >
                  <MenuItem value="">Все рестораны</MenuItem>
                  {restaurants.map((restaurant) => (
                    <MenuItem key={restaurant.id} value={restaurant.id}>
                      {restaurant.name}
                    </MenuItem>
                  ))}
                </Select>
              </FilterItem>

              {/* Products Filter */}
              <FilterItem>
                <Select
                  value=""
                  onChange={(e) => {
                    if (e.target.value) {
                      toggleProduct(e.target.value);
                    }
                  }}
                  input={<OutlinedInput placeholder="Выберите позиции..." />}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Выберите позиции...
                  </MenuItem>
                  {availableProducts.map((product) => (
                    <MenuItem key={product.id} value={product.id}>
                      {product.name}
                    </MenuItem>
                  ))}
                </Select>
              </FilterItem>
            </Box>

            {/* Create Button - максимально вправо */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CreateButton 
                component={Link}
                href="/promotions/new"
              >
                Создать акцию
              </CreateButton>
            </Box>
          </FilterContainer>
          
          {/* Selected Products - тонкая полоска */}
          {selectedProducts.length > 0 && (
            <Box sx={{ 
              mt: 2, 
              pt: 2, 
              borderTop: '1px solid var(--border)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              alignItems: 'center'
            }}>
              <Typography sx={{ 
                fontSize: '0.75rem', 
                color: 'text.secondary', 
                mr: 1,
                fontWeight: 500
              }}>
                Выбрано:
              </Typography>
              {selectedProducts.map((productId) => {
                const product = availableProducts.find(p => p.id === productId);
                return (
                  <ProductChip
                    key={productId}
                    label={product?.name}
                    onDelete={() => toggleProduct(productId)}
                    size="small"
                  />
                );
              })}
            </Box>
          )}
        </CardContent>
      </FilterCard>

      {/* Content */}
      <div className="space-y-8">
        {statusGroups.map(({ status, label, color }) => {
          const promotions = grouped[status];
          if (promotions.length === 0) return null;

          return (
            <section key={status} className="space-y-4">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold" style={{ color }}>
                  {label}
                </h2>
                <span 
                  className="px-2 py-1 text-sm rounded-full font-medium"
                  style={{
                    backgroundColor: 'var(--muted)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border)'
                  }}
                >
                  {promotions.length}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {promotions.map((promotion) => (
                  <PromotionCard
                    key={promotion.id}
                    id={promotion.id}
                    name={promotion.name}
                    status={promotion.status}
                    bannerUrl={promotion.bannerUrl || ""}
                    startsAt={promotion.startsAt}
                    endsAt={promotion.endsAt}
                    salesCount={promotion.salesCount}
                    motivationToPay={promotion.motivationToPay}
                    onClick={() => router.push(`/promotions/${promotion.id}`)}
                  />
                ))}
              </div>
            </section>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 dark:text-gray-400">
              <p className="text-lg font-medium mb-2">Акции не найдены</p>
              <p className="text-sm">Попробуйте изменить параметры поиска</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


