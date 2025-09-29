"use client";

import { useState, useMemo } from 'react';
import { Box, Typography, Card, CardContent, Chip, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { 
  IconCurrencyDollar, 
  IconTrendingUp, 
  IconCalendar,
  IconDownload,
  IconFilter
} from '@tabler/icons-react';
import TipsNowUIStatCard from '@/components/TipsNowUIStatCard';
import { tipsData } from '@/mocks/tips-data';
import { EventType } from '@/mocks/tips-types';

export default function TipsFinance() {
  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month'>('month');
  const [filterType, setFilterType] = useState<'all' | 'tips' | 'motivations'>('all');
  
  // Получаем статистику для выбранного периода
  const currentStats = useMemo(() => {
    const periodData = tipsData.periodStats.find(p => p.period === selectedPeriod);
    return periodData ? periodData.stats : tipsData.stats;
  }, [selectedPeriod]);

  // Фильтруем события
  const filteredEvents = useMemo(() => {
    let events = tipsData.events;
    
    if (filterType === 'tips') {
      events = events.filter(event => 
        event.type === 'tip_with_review' || 
        event.type === 'tip_only' || 
        event.type === 'review_only'
      );
    } else if (filterType === 'motivations') {
      events = events.filter(event => event.type === 'promo_sale');
    }
    
    return events;
  }, [filterType]);

  // Функция для форматирования даты
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Функция для получения суммы события
  const getEventAmount = (event: EventType) => {
    switch (event.type) {
      case 'tip_with_review':
      case 'tip_only':
        return event.amount || 0;
      case 'promo_sale':
        return event.motivation.amount;
      default:
        return 0;
    }
  };

  // Функция для получения типа события
  const getEventTypeLabel = (event: EventType) => {
    switch (event.type) {
      case 'tip_with_review':
        return 'Чаевые + отзыв';
      case 'tip_only':
        return 'Чаевые';
      case 'review_only':
        return 'Отзыв';
      case 'promo_sale':
        return 'Мотивация';
      default:
        return 'Событие';
    }
  };

  // Функция для получения цвета типа события
  const getEventTypeColor = (event: EventType) => {
    switch (event.type) {
      case 'tip_with_review':
      case 'tip_only':
        return 'success';
      case 'review_only':
        return 'warning';
      case 'promo_sale':
        return 'primary';
      default:
        return 'default';
    }
  };

  return (
    <div className="space-y-6">
      {/* Кнопка экспорта */}
      <div className="flex justify-end">
        <Button
          variant="outlined"
          startIcon={<IconDownload size={16} />}
          sx={{
            borderColor: 'var(--border-color)',
            color: 'var(--text-primary)',
            '&:hover': {
              borderColor: 'var(--primary-color)',
              backgroundColor: 'var(--hover-light)',
            }
          }}
        >
          Экспорт
        </Button>
      </div>

      {/* Фильтры */}
      <div className="flex gap-4">
        {/* Период */}
        <div className="flex gap-2">
          <Typography variant="body2" className="self-center" style={{ color: 'var(--text-secondary)' }}>
            Период:
          </Typography>
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

        {/* Тип событий */}
        <div className="flex gap-2">
          <Typography variant="body2" className="self-center" style={{ color: 'var(--text-secondary)' }}>
            Тип:
          </Typography>
          {(['all', 'tips', 'motivations'] as const).map((type) => (
            <Chip
              key={type}
              label={type === 'all' ? 'Все' : type === 'tips' ? 'Чаевые' : 'Мотивации'}
              onClick={() => setFilterType(type)}
              variant={filterType === type ? 'filled' : 'outlined'}
              sx={{
                backgroundColor: filterType === type ? 'var(--primary-color)' : 'transparent',
                color: filterType === type ? 'white' : 'var(--text-primary)',
                borderColor: 'var(--border-color)',
                '&:hover': {
                  backgroundColor: filterType === type ? 'var(--primary-color)' : 'var(--hover-light)',
                }
              }}
            />
          ))}
        </div>
      </div>

      {/* KPI карточки */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <TipsNowUIStatCard
          title="Общий доход"
          value={`₽${(currentStats.tips.total + currentStats.motivations.earned).toLocaleString()}`}
          growth={10.5}
          color="success"
        />
        
        <TipsNowUIStatCard
          title="Чаевые"
          value={`₽${currentStats.tips.total.toLocaleString()}`}
          growth={12.3}
          color="success"
        />
        
        <TipsNowUIStatCard
          title="Мотивации"
          value={`₽${currentStats.motivations.earned.toLocaleString()}`}
          growth={8.7}
          color="primary"
        />
        
        <TipsNowUIStatCard
          title="К выплате"
          value={`₽${currentStats.motivations.toPay.toLocaleString()}`}
          color="warning"
        />
      </div>

      {/* Детальная таблица */}
      <Card sx={{ backgroundColor: 'var(--card-background)', border: '1px solid var(--card-border)' }}>
        <CardContent sx={{ p: 0 }}>
          <div className="p-6 border-b" style={{ borderColor: 'var(--border-color)' }}>
            <Typography 
              variant="h6" 
              className="font-semibold"
              style={{ color: 'var(--text-primary)' }}
            >
              История операций
            </Typography>
          </div>
          
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'var(--muted)' }}>
                  <TableCell sx={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                    Дата
                  </TableCell>
                  <TableCell sx={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                    Тип
                  </TableCell>
                  <TableCell sx={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                    Описание
                  </TableCell>
                  <TableCell sx={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                    Ресторан
                  </TableCell>
                  <TableCell sx={{ color: 'var(--text-primary)', fontWeight: 600, textAlign: 'right' }}>
                    Сумма
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredEvents.map((event) => (
                  <TableRow 
                    key={event.id}
                    sx={{ 
                      '&:hover': { backgroundColor: 'var(--hover-light)' },
                      borderBottom: '1px solid var(--border-color)'
                    }}
                  >
                    <TableCell sx={{ color: 'var(--text-secondary)' }}>
                      {formatDate(event.date)}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={getEventTypeLabel(event)}
                        size="small"
                        color={getEventTypeColor(event)}
                        sx={{
                          fontSize: '0.75rem',
                          height: 24,
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ color: 'var(--text-primary)' }}>
                      {event.type === 'tip_with_review' && (
                        <>Чаевые и отзыв {event.rating}⭐ от {event.guestName}</>
                      )}
                      {event.type === 'tip_only' && (
                        <>Чаевые от {event.guestName}</>
                      )}
                      {event.type === 'review_only' && (
                        <>Отзыв {event.rating}⭐ от {event.guestName}</>
                      )}
                      {event.type === 'promo_sale' && (
                        <>Продажа {event.productName} по акции &quot;{event.promotionName}&quot;</>
                      )}
                    </TableCell>
                    <TableCell sx={{ color: 'var(--text-secondary)' }}>
                      {event.restaurantName}
                    </TableCell>
                    <TableCell sx={{ 
                      color: 'var(--text-primary)', 
                      fontWeight: 600, 
                      textAlign: 'right' 
                    }}>
                      ₽{getEventAmount(event).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </div>
  );
}
