"use client";

import { summary, promotions, liveSales, salesTimeSeries, topPromotions, restaurants, products, waiters } from "@/mocks/data";
import NowUIStatCard from "@/components/NowUIStatCard";
import PromotionTooltip from "@/components/PromotionTooltip";
import PromotionCard from "@/components/PromotionCard";
import SaleEventCard from "@/components/SaleEventCard";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useCallback } from "react";
import { formatMoneyRUB, SaleItem } from "@/mocks/types";
import dynamic from "next/dynamic";

// Ленивая загрузка тяжелых компонентов графиков
const NowUILineChart = dynamic(() => import("@/components/charts/NowUILineChart"), {
  loading: () => <div className="h-64 flex items-center justify-center text-gray-500">Загрузка графика...</div>,
  ssr: false
});

const NowUIBarChart = dynamic(() => import("@/components/charts/NowUIBarChart"), {
  loading: () => <div className="h-64 flex items-center justify-center text-gray-500">Загрузка графика...</div>,
  ssr: false
});

// Статическая функция для парсинга дат
const parseDate = (dateString: string): number => {
  return new Date(dateString).getTime();
};

export default function Dashboard() {
  const router = useRouter();
  const [autoRefreshCountdown, setAutoRefreshCountdown] = useState(60);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [feedKey, setFeedKey] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(25); // Пагинация по 25 записей



  // Автообновление ленты каждую минуту (только визуальное)
  useEffect(() => {
    // Проверяем, что мы на клиенте
    if (typeof window === "undefined") return;
    
    const interval = setInterval(() => {
      setAutoRefreshCountdown(prev => {
        if (prev <= 1) {
          setIsRefreshing(true);
          setFeedKey(prev => prev + 1);
          // Только визуальное обновление - данные не меняются
          setTimeout(() => {
            setIsRefreshing(false);
          }, 1000);
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setAutoRefreshCountdown(60);
    setFeedKey(prev => prev + 1);
    // Только визуальное обновление - данные не меняются
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  // Мемоизированная фильтрация промоакций
  const active = useMemo(() => promotions.filter((p) => p.status === "active"), [promotions]);
  const upcoming = useMemo(() => promotions.filter((p) => p.status === "scheduled"), [promotions]);
  
  // Используем статическую дату для фильтрации ленты
  const [filteredFeed, setFilteredFeed] = useState<typeof liveSales>([]);

  useEffect(() => {
    // Фиксированная дата для фильтрации (например, последние 30 дней)
    const toTs = 1757548800000; // 2025-09-09T23:59:59Z
    const fromTs = 1754956800000; // 2025-08-10T00:00:00Z
    const filtered = liveSales.filter((s) => {
      // Используем статическое время для сравнения
      const t = parseDate(s.occurredAt);
      return t >= fromTs && t <= toTs;
    });
    
    // Сортируем по убыванию времени (новые сверху)
    const sorted = filtered.sort((a, b) => {
      const timeA = parseDate(a.occurredAt);
      const timeB = parseDate(b.occurredAt);
      return timeB - timeA; // Убывание времени
    });
    
    // Применяем пагинацию
    const startIndex = currentPage * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedFeed = sorted.slice(startIndex, endIndex);
    
    setFilteredFeed(paginatedFeed);
  }, [currentPage, pageSize]);

  // Используем статические данные для графиков
  const lineData = salesTimeSeries;
  const barData = topPromotions;

  return (
    <div className="space-y-6">
      {/* Основной контент в две колонки */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Левая колонка (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Блок KPI */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Активные акции */}
            <PromotionTooltip promotions={active}>
              <NowUIStatCard 
                title="Активные акции" 
                value={summary.activePromotions} 
                color="success"
                onClick={() => router.push("/supplier/promotions?status=active")}
              />
            </PromotionTooltip>
            
            {/* Рестораны в акциях */}
            <NowUIStatCard 
              title="Рестораны в акциях" 
              value={summary.restaurantsInPromotions} 
              color="info"
            />
            
            {/* Официанты в акциях */}
            <NowUIStatCard 
              title="Официанты в акциях" 
              value={summary.waitersInPromotions} 
              color="primary"
            />
          </div>
          
          {/* Вторая строка: Всего продаж и К выплате */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <NowUIStatCard 
              title="Всего продаж" 
              value={summary.totalSalesCount} 
              growth={summary.salesGrowth}
              color="primary"
              onClick={() => router.push("/supplier/sales")}
              isAccent={true}
            />
            
            <NowUIStatCard 
              title="К выплате" 
              value={formatMoneyRUB(summary.motivationToPay)} 
              color="warning"
              isAccent={true}
            />
          </div>

          {/* Раздел "Активные акции" */}
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Активные акции</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {active.map((p) => (
                <PromotionCard
                  key={p.id}
                  id={p.id}
                  name={p.name}
                  status={p.status}
                  bannerUrl={p.bannerUrl || ""}
                  startsAt={p.startsAt}
                  endsAt={p.endsAt}
                  salesCount={p.salesCount}
                  motivationToPay={p.motivationToPay}
                  restaurantsCount={p.restaurants.length}
                  waitersCount={p.waitersCount} // Количество официантов из данных акции
                  onClick={() => router.push(`/supplier/promotions/${p.id}`)}
                />
              ))}
            </div>
          </section>

          {/* Раздел "Скоро стартуют" */}
          <section className="space-y-3">
            <h2 className="text-lg font-semibold">Скоро стартуют</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {upcoming.map((p) => (
                <PromotionCard
                  key={p.id}
                  id={p.id}
                  name={p.name}
                  status={p.status}
                  bannerUrl={p.bannerUrl || ""}
                  startsAt={p.startsAt}
                  endsAt={p.endsAt}
                  salesCount={p.salesCount}
                  motivationToPay={p.motivationToPay}
                  restaurantsCount={p.restaurants.length}
                  waitersCount={p.waitersCount} // Количество официантов из данных акции
                  onClick={() => router.push(`/supplier/promotions/${p.id}`)}
                />
              ))}
            </div>
          </section>

          {/* Раздел "Живая лента продаж" */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Живая лента продаж</h2>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500">
                  Автообновление через {autoRefreshCountdown}с
                </span>
                <button 
                  className={`h-8 px-3 rounded-md text-xs border border-black/[.08] dark:border-white/[.145] bg-transparent hover:bg-black/[.05] dark:hover:bg-white/[.06] ${isRefreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                >
                  {isRefreshing ? 'Обновление...' : 'Обновить'}
                </button>
              </div>
            </div>
            <div className="space-y-2" key={feedKey}>
              {filteredFeed.map((s) => {
                const restaurant = restaurants.find(r => r.id === s.restaurantId);
                const waiter = waiters.find(w => w.id === s.waiterId);
                const promotion = promotions.find(p => p.id === s.promotionId);
                
                // Обогащаем данные позиций информацией о продуктах
                const enrichedItems: SaleItem[] = s.items.map(item => {
                  const product = products.find(p => p.id === item.productId);
                  
                  return {
                    ...item,
                    productName: product?.name || 'Неизвестный товар'
                  };
                });
                
                // Вычисляем общую сумму мотивации из items
                const totalAmount = s.items.reduce((sum, item) => sum + (item.motivation?.amount || 0), 0);
                
                return (
                  <SaleEventCard
                    key={s.id}
                    id={s.id}
                    promotionId={s.promotionId}
                    promotionName={promotion?.name || 'Неизвестная акция'}
                    restaurantName={restaurant?.name || 'Неизвестный ресторан'}
                    waiterName={waiter?.name || 'Неизвестный официант'}
                    items={enrichedItems}
                    totalAmount={{ amount: totalAmount, currency: "RUB" }}
                    occurredAt={s.occurredAt}
                    promotionBannerUrl={promotion?.bannerUrl}
                    onPromotionClick={(promotionId) => router.push(`/supplier/promotions/${promotionId}`)}
                    onRestaurantClick={() => router.push(`/supplier/restaurants/${s.restaurantId}`)}
                  />
                );
              })}
            </div>
            
            {/* Пагинация ленты продаж */}
            <div className="flex items-center justify-center gap-3 mt-4">
              <button
                className="h-8 px-3 rounded-md text-xs border border-black/[.08] dark:border-white/[.145] bg-transparent hover:bg-black/[.05] dark:hover:bg-white/[.06] disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                disabled={currentPage === 0}
              >
                Назад
              </button>
              
              <span className="text-xs text-gray-500">
                Страница {currentPage + 1} • Показано {filteredFeed.length} записей
              </span>
              
              <button
                className="h-8 px-3 rounded-md text-xs border border-black/[.08] dark:border-white/[.145] bg-transparent hover:bg-black/[.05] dark:hover:bg-white/[.06] disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => setCurrentPage(prev => prev + 1)}
                disabled={filteredFeed.length < pageSize}
              >
                Вперед
              </button>
            </div>
          </section>
        </div>

        {/* Правая колонка (1/3) - Графики */}
        <div className="space-y-4">
          <div className="space-y-4">
            <NowUILineChart data={lineData} />
            <NowUIBarChart data={barData} />
          </div>
        </div>
      </div>



    </div>
  );
}
