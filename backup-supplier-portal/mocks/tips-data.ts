import { WaiterProfile, TipEvent, PromoSaleEvent, EventType, WaiterStats, PeriodStats, NotificationItem, Money } from './tips-types';
import { staticTipEvents, staticPromoSaleEvents } from './static_tips_events';

const rub = (n: number): Money => ({ amount: n, currency: "RUB" });

// Профиль официанта Анны Ивановой
export const waiterProfile: WaiterProfile = {
  id: "w1",
  name: "Анна",
  surname: "Иванова",
  phone: "+7 999 123 45 67",
  email: "anna.ivanova@example.com",
  avatar: "/waiter-photo.jpg",
  status: 'active',
  selfEmployedStatus: 'active',
  restaurants: [
    { id: "r1", name: "Стейк-хаус BigFood на Пушечной, 61", status: 'active' },
    { id: "r2", name: "Ресторан \"У моря\"", status: 'active' },
    { id: "r3", name: "Кафе \"Уютное место\"", status: 'active' }
  ],
  goals: [
    {
      id: 1,
      title: "Накопить на отпуск в Турции",
      target: 50000,
      current: 15750,
      deadline: "2024-12-31",
      active: true,
      createdAt: "2024-01-15T00:00:00Z"
    },
    {
      id: 2,
      title: "Купить новую одежду для работы",
      target: 15000,
      current: 0,
      deadline: "2024-11-15",
      active: false,
      createdAt: "2024-02-01T00:00:00Z"
    },
    {
      id: 3,
      title: "Обновить телефон",
      target: 25000,
      current: 0,
      deadline: "2025-03-01",
      active: false,
      createdAt: "2024-03-10T00:00:00Z"
    }
  ]
};

// Объединяем все статические события
export const allEvents: EventType[] = [
  ...staticTipEvents,
  ...staticPromoSaleEvents
];

// Статистика официанта (рассчитана на основе статических данных)
export const waiterStats: WaiterStats = {
  motivations: {
    earned: 12500,
    toPay: 3250,
    paid: 9250
  },
  tips: {
    total: 15750,
    count: 30,
    uniqueGuests: 16,
    averageAmount: 525
  },
  sales: {
    count: 5,
    totalQuantity: 8,
    averageMotivation: 162,
    totalMotivation: 1296
  },
  reviews: {
    count: 18,
    averageRating: 4.6,
    ratingDistribution: {
      5: 12,
      4: 5,
      3: 1,
      2: 0,
      1: 0
    }
  },
  balance: {
    current: 15750,
    available: 15750,
    frozen: 0
  }
};

// Статистика по периодам
export const periodStats: PeriodStats[] = [
  {
    period: 'day',
    startDate: '2025-09-09T00:00:00Z',
    endDate: '2025-09-09T23:59:59Z',
    stats: {
      motivations: { earned: 450, toPay: 120, paid: 330 },
      tips: { total: 1200, count: 3, uniqueGuests: 3, averageAmount: 400 },
      sales: { count: 2, totalQuantity: 3, averageMotivation: 150, totalMotivation: 450 },
      reviews: { count: 2, averageRating: 4.5, ratingDistribution: { 5: 1, 4: 1, 3: 0, 2: 0, 1: 0 } },
      balance: { current: 1200, available: 1200, frozen: 0 }
    }
  },
  {
    period: 'week',
    startDate: '2025-09-03T00:00:00Z',
    endDate: '2025-09-09T23:59:59Z',
    stats: {
      motivations: { earned: 3200, toPay: 850, paid: 2350 },
      tips: { total: 8500, count: 18, uniqueGuests: 12, averageAmount: 472 },
      sales: { count: 8, totalQuantity: 15, averageMotivation: 175, totalMotivation: 2625 },
      reviews: { count: 12, averageRating: 4.6, ratingDistribution: { 5: 8, 4: 3, 3: 1, 2: 0, 1: 0 } },
      balance: { current: 8500, available: 8500, frozen: 0 }
    }
  },
  {
    period: 'month',
    startDate: '2025-08-09T00:00:00Z',
    endDate: '2025-09-09T23:59:59Z',
    stats: waiterStats
  }
];

// Уведомления
export const notifications: NotificationItem[] = [
  {
    id: 'notif_1',
    type: 'tip',
    title: 'Новые чаевые',
    message: 'Получены чаевые ₽2,000 от гостя Иван Петров',
    date: '2025-09-09T20:15:00Z',
    read: false,
    actionUrl: '/tips/events/tip_1'
  },
  {
    id: 'notif_2',
    type: 'review',
    title: 'Новый отзыв',
    message: 'Гость Мария Сидорова оставила отзыв с оценкой 5 звезд',
    date: '2025-09-09T19:30:00Z',
    read: false,
    actionUrl: '/tips/events/review_1'
  },
  {
    id: 'notif_3',
    type: 'motivation',
    title: 'Мотивация к выплате',
    message: 'Начислена мотивация ₽180 за продажу по акции "Осенняя дегустация"',
    date: '2025-09-09T17:20:00Z',
    read: true,
    actionUrl: '/tips/finance'
  },
  {
    id: 'notif_4',
    type: 'goal',
    title: 'Прогресс цели',
    message: 'Вы на 31% выполнили цель "Накопить на отпуск в Турции"',
    date: '2025-09-08T12:00:00Z',
    read: true,
    actionUrl: '/tips/dashboard'
  },
  {
    id: 'notif_5',
    type: 'system',
    title: 'Обновление системы',
    message: 'В приложении добавлены новые функции для отслеживания целей',
    date: '2025-09-07T10:00:00Z',
    read: true
  }
];

// Экспорт для использования в компонентах
export const tipsData = {
  profile: waiterProfile,
  events: allEvents,
  stats: waiterStats,
  periodStats,
  notifications
};
