"use client";

import { useMemo, useState } from "react";
import { promotions, restaurants, products, waiters, liveSales } from "@/mocks/data";
import { formatMoneyRUB } from "@/mocks/types";
import SaleEventCard from "@/components/SaleEventCard";
import Button from "@/components/ui/Button";
import { Card as MuiCard, CardContent, Typography, Box, Select, MenuItem, FormControl, InputLabel, OutlinedInput, IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  IconDownload
} from '@tabler/icons-react';

type Opt = { value: string; label: string };

// Стилизованные компоненты в стиле Creative Tim Now UI
const FilterCard = styled(MuiCard)(({ theme }) => ({
  borderRadius: 4,
  backgroundColor: 'var(--card-background)',
  color: 'var(--text-primary)',
  boxShadow: 'var(--shadow-light)',
  border: '1px solid var(--card-border)',
}));

const FilterContainer = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '16px',
  alignItems: 'flex-end',
});

const FilterItem = styled(FormControl)(({ theme }) => ({
  minWidth: 200,
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
  },
}));


export default function SalesPage() {
  const [promotionId, setPromotionId] = useState<string>("");
  const [restaurantId, setRestaurantId] = useState<string>("");
  const [waiterId, setWaiterId] = useState<string>("");
  const [productId, setProductId] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(50); // Показываем по 50 записей на странице

  const promotionOpts: Opt[] = [{ value: "", label: "Все акции" }, ...promotions.map((p) => ({ value: p.id, label: p.name }))];
  const restaurantOpts: Opt[] = [{ value: "", label: "Все рестораны" }, ...restaurants.map((r) => ({ value: r.id, label: r.name }))];
  const waiterOpts: Opt[] = [{ value: "", label: "Все официанты" }, ...waiters.map((w) => ({ value: w.id, label: w.name }))];
  const productOpts: Opt[] = [{ value: "", label: "Все продукты" }, ...products.map((p) => ({ value: p.id, label: p.name }))];

  // Фильтрация продаж по всем акциям
  const filteredSales = useMemo(() => {
    return liveSales.filter(sale => {
      // Фильтр по акции
      if (promotionId && sale.promotionId !== promotionId) return false;
      
      // Фильтр по ресторану
      if (restaurantId && sale.restaurantId !== restaurantId) return false;
      
      // Фильтр по официанту
      if (waiterId && sale.waiterId !== waiterId) return false;
      
      // Фильтр по продукту (проверяем, есть ли продукт в items)
      if (productId && !sale.items.some(item => item.productId === productId)) return false;
      
      return true;
    });
  }, [promotionId, restaurantId, waiterId, productId]);

  // Пагинация
  const paginatedSales = useMemo(() => {
    const startIndex = currentPage * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredSales.slice(startIndex, endIndex);
  }, [filteredSales, currentPage, pageSize]);

  // Преобразование данных для SaleEventCard
  const salesCards = useMemo(() => {
    return paginatedSales.map(sale => {
      const promotion = promotions.find(p => p.id === sale.promotionId);
      const restaurant = restaurants.find(r => r.id === sale.restaurantId);
      const waiter = waiters.find(w => w.id === sale.waiterId);
      
      if (!promotion || !restaurant || !waiter) return null;
      
      // Преобразуем items для SaleEventCard
      const items = sale.items.map(item => {
        const product = products.find(p => p.id === item.productId);
        return {
          productId: item.productId,
          quantity: item.quantity,
          motivation: item.motivation,
          productName: product?.name || item.productId
        };
      });
      
      // Вычисляем общую сумму
      const totalAmount = {
        amount: sale.items.reduce((sum, item) => sum + item.motivation.amount * item.quantity, 0),
        currency: 'RUB'
      };
      
      return {
        id: sale.id,
        promotionId: sale.promotionId,
        promotionName: promotion.name,
        restaurantName: restaurant.name,
        waiterName: waiter.name,
        items,
        totalAmount,
        occurredAt: sale.occurredAt,
        promotionBannerUrl: promotion.bannerUrl
      };
    }).filter(Boolean);
  }, [paginatedSales, promotions, restaurants, waiters, products]);

  function toCsv() {
    const header = ["eventId", "datetime", "restaurant", "waiter", "product", "promotion", "quantity", "amountRUB"].join(",");
    const rows: string[] = [];
    
    filteredSales.forEach((s) => {
      const r = restaurants.find((x) => x.id === s.restaurantId)?.name || s.restaurantId;
      const w = waiters.find((x) => x.id === s.waiterId)?.name || s.waiterId;
      const p = promotions.find((x) => x.id === s.promotionId)?.name || s.promotionId;
      
      s.items.forEach((item) => {
        const product = products.find((x) => x.id === item.productId)?.name || item.productId;
        const row = [
          s.id,
          new Date(s.occurredAt).toISOString(),
          `"${r}"`,
          `"${w}"`,
          `"${product}"`,
          `"${p}"`,
          item.quantity,
          item.motivation.amount
        ].join(",");
        rows.push(row);
      });
    });
    
    const csv = [header, ...rows].join("\n");
    // Добавляем BOM для правильной кодировки UTF-8
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `sales-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      {/* Фильтры */}
      <FilterCard>
        <CardContent sx={{ p: 3 }}>
          <FilterContainer>
            <FilterItem>
              <Select
                value={promotionId}
                onChange={(e) => setPromotionId(e.target.value)}
                input={<OutlinedInput placeholder="Все акции" />}
                displayEmpty
              >
                <MenuItem value="">Все акции</MenuItem>
                {promotionOpts.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </FilterItem>

            <FilterItem>
              <Select
                value={restaurantId}
                onChange={(e) => setRestaurantId(e.target.value)}
                input={<OutlinedInput placeholder="Все рестораны" />}
                displayEmpty
              >
                <MenuItem value="">Все рестораны</MenuItem>
                {restaurantOpts.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </FilterItem>

            <FilterItem>
              <Select
                value={waiterId}
                onChange={(e) => setWaiterId(e.target.value)}
                input={<OutlinedInput placeholder="Все официанты" />}
                displayEmpty
              >
                <MenuItem value="">Все официанты</MenuItem>
                {waiterOpts.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </FilterItem>

            <FilterItem>
              <Select
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                input={<OutlinedInput placeholder="Все продукты" />}
                displayEmpty
              >
                <MenuItem value="">Все продукты</MenuItem>
                {productOpts.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
            </FilterItem>

            <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
              <Tooltip title="Экспорт данных в CSV">
                <IconButton 
                  onClick={toCsv} 
                  sx={{ 
                    color: 'var(--brand)',
                    width: 40,
                    height: 40,
                    minWidth: 'auto',
                    '&:hover': {
                      backgroundColor: 'transparent',
                      color: 'var(--brand)'
                    }
                  }}
                >
                  <IconDownload size={20} />
                </IconButton>
              </Tooltip>
            </Box>
          </FilterContainer>
        </CardContent>
      </FilterCard>

      {/* Карточки продаж */}
      <div className="space-y-2">
        {salesCards.map((sale) => {
          if (!sale) return null;
          return (
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
          );
        })}

        {salesCards.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              Продажи не найдены
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Попробуйте изменить параметры фильтрации
            </Typography>
          </Box>
        )}
      </div>

      {/* Пагинация */}
      {filteredSales.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, mt: 4, p: 2 }}>
          <Button
            variant="default"
            onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
            style={{ minWidth: 100 }}
          >
            Назад
          </Button>
          
          <Typography variant="body2" color="text.secondary">
            Страница {currentPage + 1} • Показано {paginatedSales.length} из {filteredSales.length} записей
          </Typography>
          
          <Button
            variant="default"
            onClick={() => setCurrentPage(prev => prev + 1)}
            disabled={paginatedSales.length < pageSize}
            style={{ minWidth: 100 }}
          >
            Вперед
          </Button>
        </Box>
      )}
    </div>
  );
}