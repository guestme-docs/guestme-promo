import { SaleEvent } from "@/mocks/types";
import { allLiveSales } from "./static_sales_data";

// Статическая функция для парсинга дат
const parseDate = (dateString: string): number => {
  return new Date(dateString).getTime();
};

// Предварительно обработанные данные для быстрого доступа
export const processedSalesData = {
  // Группировка по акциям
  byPromotion: allLiveSales.reduce((acc, sale) => {
    if (!acc[sale.promotionId]) {
      acc[sale.promotionId] = [];
    }
    acc[sale.promotionId].push(sale);
    return acc;
  }, {} as Record<string, SaleEvent[]>),

  // Группировка по официантам
  byWaiter: allLiveSales.reduce((acc, sale) => {
    if (!acc[sale.waiterId]) {
      acc[sale.waiterId] = [];
    }
    acc[sale.waiterId].push(sale);
    return acc;
  }, {} as Record<string, SaleEvent[]>),

  // Группировка по ресторанам
  byRestaurant: allLiveSales.reduce((acc, sale) => {
    if (!acc[sale.restaurantId]) {
      acc[sale.restaurantId] = [];
    }
    acc[sale.restaurantId].push(sale);
    return acc;
  }, {} as Record<string, SaleEvent[]>),

  // Группировка по продуктам
  byProduct: allLiveSales.reduce((acc, sale) => {
    sale.items.forEach(item => {
      if (!acc[item.productId]) {
        acc[item.productId] = [];
      }
      acc[item.productId].push(sale);
    });
    return acc;
  }, {} as Record<string, SaleEvent[]>),

  // Индексы для быстрого поиска
  indexes: {
    byDate: allLiveSales.reduce((acc, sale) => {
      const date = sale.occurredAt.split('T')[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(sale);
      return acc;
    }, {} as Record<string, SaleEvent[]>),
    
    byPromotionAndWaiter: allLiveSales.reduce((acc, sale) => {
      const key = `${sale.promotionId}-${sale.waiterId}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(sale);
      return acc;
    }, {} as Record<string, SaleEvent[]>),
  }
};

// Функция для быстрой фильтрации
export function filterSales(filters: {
  promotionId?: string;
  restaurantId?: string;
  waiterId?: string;
  productId?: string;
  from?: string;
  to?: string;
  limit?: number;
  offset?: number;
}) {
  let filtered = allLiveSales;

  // Применяем фильтры по индексам для быстрого поиска
  if (filters.promotionId) {
    filtered = processedSalesData.byPromotion[filters.promotionId] || [];
  }

  if (filters.restaurantId) {
    filtered = filtered.filter(sale => sale.restaurantId === filters.restaurantId);
  }

  if (filters.waiterId) {
    filtered = filtered.filter(sale => sale.waiterId === filters.waiterId);
  }

  if (filters.productId) {
    filtered = filtered.filter(sale => 
      sale.items.some(item => item.productId === filters.productId)
    );
  }

  if (filters.from) {
    const fromTs = parseDate(filters.from);
    filtered = filtered.filter(sale => parseDate(sale.occurredAt) >= fromTs);
  }

  if (filters.to) {
    const toTs = parseDate(filters.to);
    filtered = filtered.filter(sale => parseDate(sale.occurredAt) <= toTs);
  }

  // Применяем пагинацию
  if (filters.offset) {
    filtered = filtered.slice(filters.offset);
  }
  
  if (filters.limit) {
    filtered = filtered.slice(0, filters.limit);
  }

  return filtered;
}

// Функция для группировки продаж по акциям с агрегацией
export function getGroupedSales(filters: {
  promotionId?: string;
  restaurantId?: string;
  waiterId?: string;
  productId?: string;
  from?: string;
  to?: string;
}) {
  const filtered = filterSales(filters);
  
  // Группируем по акциям
  const grouped = filtered.reduce((acc, sale) => {
    if (!acc[sale.promotionId]) {
      acc[sale.promotionId] = {
        promotionId: sale.promotionId,
        sales: [],
        totalSales: 0,
        totalMotivation: 0,
        waiters: new Set<string>(),
        restaurants: new Set<string>()
      };
    }
    
    acc[sale.promotionId].sales.push(sale);
    acc[sale.promotionId].totalSales += 1;
    acc[sale.promotionId].totalMotivation += sale.totalAmount.amount;
    acc[sale.promotionId].waiters.add(sale.waiterId);
    acc[sale.promotionId].restaurants.add(sale.restaurantId);
    
    return acc;
  }, {} as Record<string, {
    promotionId: string;
    sales: SaleEvent[];
    totalSales: number;
    totalMotivation: number;
    waiters: Set<string>;
    restaurants: Set<string>;
  }>);

  // Преобразуем в массив и добавляем метаданные
  return Object.values(grouped).map(group => ({
    ...group,
    waitersCount: group.waiters.size,
    restaurantsCount: group.restaurants.size,
    waiters: Array.from(group.waiters),
    restaurants: Array.from(group.restaurants)
  }));
}
