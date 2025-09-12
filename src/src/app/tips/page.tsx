"use client";

import { useState, useMemo } from 'react';
import { Box, Typography, Card, CardContent, Chip, Pagination } from '@mui/material';
import { useRouter } from 'next/navigation';
import { 
  IconTarget
} from '@tabler/icons-react';
import TipsNowUIStatCard from '@/components/TipsNowUIStatCard';
import TipsEventCard from '@/components/TipsEventCard';
import TipsEventFilters from '@/components/TipsEventFilters';
import TipsPromotionCard from '@/components/TipsPromotionCard';
import { tipsData, getWaiterPromotions, getWaiterPromotionStats } from '@/mocks/tips-data';
import { EventType } from '@/mocks/tips-types';

export default function TipsDashboard() {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month'>('week');
  
  // Получаем акции официанта
  const waiterPromotions = getWaiterPromotions("w1");
  
  // Состояние для фильтров событий
  const [eventFilters, setEventFilters] = useState({
    types: [] as string[],
    starRating: null as number | null,
    period: 'all' as 'all' | 'today' | 'week' | 'month',
  });
  
  // Состояние для пагинации
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 25;

  const getGoalProgress = (goal: typeof tipsData.profile.goals[0]) => {
    const progress = (goal.current / goal.target) * 100;
    return Math.min(Math.max(progress, 0), 100);
  };
  
  // Получаем статистику для выбранного периода
  const currentStats = useMemo(() => {
    const periodData = tipsData.periodStats.find(p => p.period === selectedPeriod);
    return periodData ? periodData.stats : tipsData.stats;
  }, [selectedPeriod]);

  // Подсчет отзывов по звездам
  const starCounts = useMemo(() => {
    const counts: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    
    tipsData.events.forEach(event => {
      if ((event.type === 'tip_with_review' || event.type === 'review_only') && event.rating) {
        counts[event.rating] = (counts[event.rating] || 0) + 1;
      }
    });
    
    return counts;
  }, []);

  // Фильтрация событий
  const filteredEvents = useMemo(() => {
    let events = [...tipsData.events];

    // Фильтр по типам
    if (eventFilters.types.length > 0) {
      events = events.filter(event => eventFilters.types.includes(event.type));
    }

    // Фильтр по звездам
    if (eventFilters.starRating !== null) {
      events = events.filter(event => {
        if (event.type === 'tip_with_review' || event.type === 'review_only') {
          return event.rating === eventFilters.starRating;
        }
        return false;
      });
    }

    // Фильтр по периоду
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    switch (eventFilters.period) {
      case 'today':
        events = events.filter(event => new Date(event.date) >= today);
        break;
      case 'week':
        events = events.filter(event => new Date(event.date) >= weekAgo);
        break;
      case 'month':
        events = events.filter(event => new Date(event.date) >= monthAgo);
        break;
    }

    // Сортировка по дате (новые сверху)
    events.sort((a, b) => {
      const aTime = new Date(a.date).getTime();
      const bTime = new Date(b.date).getTime();
      return bTime - aTime;
    });

    return events;
  }, [eventFilters]);

  // Пагинация
  const paginatedEvents = useMemo(() => {
    const startIndex = (currentPage - 1) * eventsPerPage;
    const endIndex = startIndex + eventsPerPage;
    return filteredEvents.slice(startIndex, endIndex);
  }, [filteredEvents, currentPage, eventsPerPage]);

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  // Обработчики
  const handleFiltersChange = (newFilters: typeof eventFilters) => {
    setEventFilters(newFilters);
    setCurrentPage(1); // Сбрасываем на первую страницу при изменении фильтров
  };

  const handleResetFilters = () => {
    setEventFilters({
      types: [],
      starRating: null,
      period: 'all',
    });
    setCurrentPage(1);
  };



  return (
    <div className="space-y-8">
      {/* Селектор периода */}
      <div className="flex justify-end">
        <div className="flex gap-2">
          {(['day', 'week', 'month'] as const).map((period) => (
            <Chip
              key={period}
              label={period === 'day' ? 'День' : period === 'week' ? 'Неделя' : 'Месяц'}
              onClick={() => setSelectedPeriod(period)}
              variant={selectedPeriod === period ? 'filled' : 'outlined'}
              sx={{
                backgroundColor: selectedPeriod === period ? 'var(--primary-color)' : 'transparent',
                color: selectedPeriod === period ? 'white' : 'var(--text-primary)',
                borderColor: 'var(--border-color)',
                '&:hover': {
                  backgroundColor: selectedPeriod === period ? 'var(--primary-color)' : 'var(--hover-light)',
                }
              }}
            />
          ))}
        </div>
      </div>

      {/* KPI карточки - первый ряд */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Чаевые (1/4 ширины) */}
        <TipsNowUIStatCard
          title="Чаевые"
          value={`₽${currentStats.tips.total.toLocaleString()}`}
          subtitle={`${currentStats.tips.count} раз от ${currentStats.tips.uniqueGuests} человек`}
          color="success"
        />
        
        {/* Рейтинг (1/4 ширины) */}
        <TipsNowUIStatCard
          title="Рейтинг"
          value={currentStats.reviews.averageRating.toFixed(1)}
          subtitle={`От ${currentStats.reviews.count} людей`}
          color="info"
        />
        
        {/* Продаж (1/2 ширины) */}
        <TipsNowUIStatCard
          title="Продаж"
          value={currentStats.sales.totalQuantity}
          subtitle={`${currentStats.sales.count} событий`}
          color="success"
        />
        
        {/* Активных акций (1/4 ширины) */}
        <TipsNowUIStatCard
          title="Активных акций"
          value={waiterPromotions.active.length}
          subtitle={`из ${waiterPromotions.active.length + waiterPromotions.scheduled.length + waiterPromotions.available.length} доступных`}
          color="warning"
        />
      </div>

      {/* Второй ряд */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Блок с текущей активной целью и прогрессом (1/2 ширины) */}
        <Card sx={{ backgroundColor: 'var(--card-background)', color: 'var(--text-primary)', boxShadow: 'var(--shadow-light)', border: '1px solid var(--card-border)' }}>
          <CardContent>
            <Typography variant="h6" sx={{ color: 'var(--text-primary)', mb: 2 }}>Текущая цель</Typography>
            {tipsData.profile.goals.filter(g => g.active).length > 0 ? (
              <div className="space-y-4">
                {tipsData.profile.goals.filter(g => g.active).slice(0, 1).map(goal => (
                  <Box key={goal.id} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <IconTarget size={24} color="var(--primary-color)" />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="body1" sx={{ color: 'var(--text-primary)' }}>{goal.title}</Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
                          ₽{goal.current.toLocaleString()} из ₽{goal.target.toLocaleString()}
                        </Typography>
                        <Box sx={{ flexGrow: 1, height: 8, backgroundColor: 'var(--muted)', borderRadius: 4 }}>
                          <Box sx={{ width: `${getGoalProgress(goal)}%`, height: '100%', backgroundColor: 'var(--primary-color)', borderRadius: 4 }} />
                        </Box>
                        <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
                          {getGoalProgress(goal).toFixed(0)}%
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </div>
            ) : (
              <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
                У вас пока нет активных целей.
              </Typography>
            )}
          </CardContent>
        </Card>

        {/* Мотивации (1/2 ширины) */}
        <TipsNowUIStatCard
          title="Промо"
          value={`₽${currentStats.motivations.paid.toLocaleString()} / ₽${currentStats.motivations.earned.toLocaleString()}`}
          subtitle="Выплачено / К выплате"
          color="primary"
        />
      </div>

      {/* Акции */}
      <div className="space-y-6">
        <Typography 
          variant="h5" 
          className="font-semibold"
          style={{ color: 'var(--text-primary)', marginBottom: '24px' }}
        >
          Акции
        </Typography>
        
        {/* Все акции в одной сетке */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Активные акции */}
          {waiterPromotions.active.map((promotion) => (
            <TipsPromotionCard
              key={promotion.id}
              id={promotion.id}
              name={promotion.name}
              status={promotion.status}
              bannerUrl={promotion.bannerUrl}
              startsAt={promotion.startsAt}
              endsAt={promotion.endsAt}
              isParticipating={true}
              onClick={() => {
                router.push(`/tips/promotions/${promotion.id}`);
              }}
            />
          ))}
          
          {/* Запланированные акции (участвует) */}
          {waiterPromotions.scheduled.map((promotion) => (
            <TipsPromotionCard
              key={promotion.id}
              id={promotion.id}
              name={promotion.name}
              status={promotion.status}
              bannerUrl={promotion.bannerUrl}
              startsAt={promotion.startsAt}
              endsAt={promotion.endsAt}
              isParticipating={true}
              onClick={() => {
                router.push(`/tips/promotions/${promotion.id}`);
              }}
            />
          ))}
          
          {/* Доступные акции (не участвует) */}
          {waiterPromotions.available.map((promotion) => (
            <TipsPromotionCard
              key={promotion.id}
              id={promotion.id}
              name={promotion.name}
              status={promotion.status}
              bannerUrl={promotion.bannerUrl}
              startsAt={promotion.startsAt}
              endsAt={promotion.endsAt}
              isParticipating={false}
              onClick={() => {
                router.push(`/tips/promotions/${promotion.id}`);
              }}
              onJoin={() => {
                console.log('Присоединение к акции:', promotion.id);
                // Здесь будет логика присоединения к акции
              }}
            />
          ))}
        </div>

        {/* Если нет акций */}
        {waiterPromotions.active.length === 0 && 
         waiterPromotions.scheduled.length === 0 && 
         waiterPromotions.available.length === 0 && (
          <div className="text-center py-8">
            <Typography 
              variant="body1" 
              style={{ color: 'var(--text-secondary)' }}
            >
              Нет доступных акций
            </Typography>
          </div>
        )}
      </div>

      {/* Лента событий с фильтрами */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Лента событий (2/3 ширины) */}
        <div className="lg:col-span-2">
          <Typography 
            variant="h6" 
            className="font-semibold"
            style={{ color: 'var(--text-primary)', marginBottom: '24px' }}
          >
            Лента событий
          </Typography>
          
          {/* События */}
          <div className="space-y-4">
            {paginatedEvents.length > 0 ? (
              paginatedEvents.map((event) => (
                <TipsEventCard key={event.id} event={event} />
              ))
            ) : (
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <Typography variant="h6" sx={{ color: 'var(--text-secondary)', mb: 2 }}>
                  События не найдены
                </Typography>
                <Typography variant="body2" sx={{ color: 'var(--text-secondary)' }}>
                  Попробуйте изменить параметры фильтрации
                </Typography>
              </Box>
            )}
          </div>

          {/* Пагинация */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(_, page) => setCurrentPage(page)}
                color="primary"
                size="small"
                sx={{
                  '& .MuiPaginationItem-root': {
                    color: 'var(--text-primary)',
                    '&.Mui-selected': {
                      backgroundColor: 'var(--brand)',
                      color: 'white',
                    },
                    '&:hover': {
                      backgroundColor: 'var(--hover-light)',
                    },
                  },
                }}
              />
            </Box>
          )}
        </div>

        {/* Фильтры (1/3 ширины) */}
        <div className="lg:col-span-1">
          <Typography 
            variant="h6" 
            className="font-semibold mb-4"
            style={{ color: 'var(--text-primary)' }}
          >
            Фильтры
          </Typography>
          <TipsEventFilters
            filters={eventFilters}
            onFiltersChange={handleFiltersChange}
            onReset={handleResetFilters}
            starCounts={starCounts}
          />
        </div>
      </div>
    </div>
  );
}

