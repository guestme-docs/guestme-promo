import { WaiterProfile, TipEvent, PromoSaleEvent, EventType, WaiterStats, PeriodStats, NotificationItem, Money } from './tips-types';
import { staticTipEvents, staticPromoSaleEvents } from './static_tips_events';
import { promotions as allPromotions, liveSales } from './data';

// Фильтруем акции для портала чаевых - убираем "Виски-марафон" и "Коктейльная революция"
export const promotions = allPromotions.filter(promo => 
  promo.id !== "pr2" && promo.id !== "pr3"
);

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
    { id: "r1", name: "Стейк-хаус BigFood на Пушечной, 61", status: 'active' }
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
  motivations: (() => {
    const totalMotivation = getWaiterTotalMotivation('w1');
    return {
      earned: totalMotivation.earned,
      toPay: totalMotivation.toPay,
      paid: totalMotivation.paid
    };
  })(),
  tips: {
    total: 5505,
    count: 20,
    uniqueGuests: 16,
    averageAmount: 275
  },
  sales: {
    count: 15,
    totalQuantity: 41,
    averageMotivation: 146,
    totalMotivation: 5990
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

// Статистика по периодам (используем реальные данные продаж)
export const periodStats: PeriodStats[] = [
  {
    period: 'day',
    startDate: '2025-09-09T00:00:00Z',
    endDate: '2025-09-09T23:59:59Z',
    stats: {
      motivations: (() => {
        const totalMotivation = getWaiterTotalMotivation('w1', 'day');
        return {
          earned: totalMotivation.earned,
          toPay: totalMotivation.toPay,
          paid: totalMotivation.paid
        };
      })(),
      tips: { total: 350, count: 2, uniqueGuests: 2, averageAmount: 175 },
      sales: (() => {
        const realSales = getWaiterRealSales('w1', 'day');
        return {
          count: realSales.count,
          totalQuantity: realSales.totalQuantity,
          averageMotivation: realSales.averageMotivation,
          totalMotivation: realSales.totalMotivation
        };
      })(),
      reviews: { count: 2, averageRating: 4.5, ratingDistribution: { 5: 1, 4: 1, 3: 0, 2: 0, 1: 0 } },
      balance: { current: 1200, available: 1200, frozen: 0 }
    }
  },
  {
    period: 'week',
    startDate: '2025-09-03T00:00:00Z',
    endDate: '2025-09-09T23:59:59Z',
    stats: {
      motivations: (() => {
        const totalMotivation = getWaiterTotalMotivation('w1', 'week');
        return {
          earned: totalMotivation.earned,
          toPay: totalMotivation.toPay,
          paid: totalMotivation.paid
        };
      })(),
      tips: { total: 2800, count: 10, uniqueGuests: 8, averageAmount: 280 },
      sales: (() => {
        const realSales = getWaiterRealSales('w1', 'week');
        return {
          count: realSales.count,
          totalQuantity: realSales.totalQuantity,
          averageMotivation: realSales.averageMotivation,
          totalMotivation: realSales.totalMotivation
        };
      })(),
      reviews: { count: 12, averageRating: 4.6, ratingDistribution: { 5: 8, 4: 3, 3: 1, 2: 0, 1: 0 } },
      balance: { current: 8500, available: 8500, frozen: 0 }
    }
  },
  {
    period: 'month',
    startDate: '2025-08-09T00:00:00Z',
    endDate: '2025-09-09T23:59:59Z',
    stats: (() => {
      const realSales = getWaiterRealSales('w1', 'month');
      const totalMotivation = getWaiterTotalMotivation('w1', 'month');
      return {
        ...waiterStats,
        sales: {
          count: realSales.count,
          totalQuantity: realSales.totalQuantity,
          averageMotivation: realSales.averageMotivation,
          totalMotivation: realSales.totalMotivation
        },
        motivations: {
          earned: totalMotivation.earned,
          toPay: totalMotivation.toPay,
          paid: totalMotivation.paid
        }
      };
    })()
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

// Функция для подсчета реальных продаж официанта
export function getWaiterRealSales(waiterId: string, period?: 'day' | 'week' | 'month') {
  // Используем статические даты из данных
  let startDate: Date;
  
  switch (period) {
    case 'day':
      startDate = new Date('2025-09-09T00:00:00Z');
      break;
    case 'week':
      startDate = new Date('2025-09-03T00:00:00Z');
      break;
    case 'month':
      startDate = new Date('2025-08-09T00:00:00Z');
      break;
    default:
      startDate = new Date(0); // Все время
  }
  
  // Используем данные из staticPromoSaleEvents для портала чаевых
  const waiterSales = staticPromoSaleEvents.filter(sale => 
    sale.waiterId === waiterId && 
    new Date(sale.date) >= startDate
  );
  
  const totalQuantity = waiterSales.reduce((sum, sale) => 
    sum + sale.quantity, 0
  );
  
  const totalMotivation = waiterSales.reduce((sum, sale) => 
    sum + sale.motivation.amount, 0
  );
  
  return {
    count: waiterSales.length,
    totalQuantity,
    totalMotivation,
    averageMotivation: waiterSales.length > 0 ? Math.round(totalMotivation / waiterSales.length) : 0
  };
}

// Функция для получения статистики по акции для официанта
export function getWaiterPromotionStats(waiterId: string, promotionId: string) {
  const waiterSales = staticPromoSaleEvents.filter(sale => 
    sale.promotionId === promotionId && 
    sale.waiterId === waiterId
  );
  
  const totalQuantity = waiterSales.reduce((sum, sale) => 
    sum + sale.quantity, 0
  );
  
  const totalMotivation = waiterSales.reduce((saleSum, sale) => 
    saleSum + (sale.motivation.amount * sale.quantity * 0.6), 0
  );
  
  return {
    salesCount: totalQuantity,
    motivationToPay: { amount: totalMotivation, currency: "RUB" }
  };
}

// Функция для получения акций официанта
export function getWaiterPromotions(waiterId: string) {
  const now = new Date();
  
  // Получаем рестораны официанта
  const waiterRestaurantIds = waiterProfile.restaurants.map(r => r.id);
  
  const active = promotions.filter(promo => 
    promo.status === 'active' && 
    promo.restaurants.some(restId => waiterRestaurantIds.includes(restId))
  );
  
  const scheduled = promotions.filter(promo => 
    promo.status === 'scheduled' && 
    promo.restaurants.some(restId => waiterRestaurantIds.includes(restId))
  );
  
  const available = promotions.filter(promo => 
    promo.status === 'active' && 
    !promo.restaurants.some(restId => waiterRestaurantIds.includes(restId))
  );
  
  return {
    active,
    scheduled,
    available
  };
}

// Функция для подсчета выплат по завершенным акциям
export function getWaiterPromoPayments(waiterId: string, period?: 'day' | 'week' | 'month') {
  // Используем статические даты из данных
  let startDate: Date;
  
  switch (period) {
    case 'day':
      startDate = new Date('2025-09-09T00:00:00Z');
      break;
    case 'week':
      startDate = new Date('2025-09-03T00:00:00Z');
      break;
    case 'month':
      startDate = new Date('2025-08-09T00:00:00Z');
      break;
    default:
      startDate = new Date(0); // Все время
  }
  
  // Получаем завершенные акции, в которых участвует официант
  const finishedPromotions = promotions.filter(promo => 
    promo.status === 'finished' && 
    promo.restaurants.some(restId => 
      waiterProfile.restaurants.some(waiterRest => waiterRest.id === restId)
    ) &&
    new Date(promo.endsAt) >= startDate
  );
  
  // Считаем общую мотивацию к выплате по завершенным акциям
  const totalToPay = finishedPromotions.reduce((sum, promo) => {
    // Получаем продажи официанта по этой акции
    const waiterSales = staticPromoSaleEvents.filter(sale => 
      sale.promotionId === promo.id && 
      sale.waiterId === waiterId
    );
    
    // Считаем мотивацию официанта (60% от общей мотивации)
    const waiterMotivation = waiterSales.reduce((saleSum, sale) => 
      saleSum + sale.motivation.amount, 0
    );
    
    return sum + waiterMotivation;
  }, 0);
  
  // Считаем уже выплаченную мотивацию
  const totalPaid = finishedPromotions.reduce((sum, promo) => {
    // Для завершенных акций считаем, что выплачено 100% от мотивации официанта
    const waiterSales = staticPromoSaleEvents.filter(sale => 
      sale.promotionId === promo.id && 
      sale.waiterId === waiterId
    );
    
    const waiterMotivation = waiterSales.reduce((saleSum, sale) => 
      saleSum + sale.motivation.amount, 0
    );
    
    return sum + waiterMotivation;
  }, 0);
  
  return {
    paid: totalPaid,
    toPay: totalToPay - totalPaid, // Остаток к выплате
    earned: totalToPay // Общая заработанная мотивация
  };
}

// Функция для подсчета общей мотивации официанта (активные + завершенные акции)
export function getWaiterTotalMotivation(waiterId: string, period?: 'day' | 'week' | 'month') {
  // Используем статические даты из данных
  let startDate: Date;
  
  switch (period) {
    case 'day':
      startDate = new Date('2025-09-09T00:00:00Z');
      break;
    case 'week':
      startDate = new Date('2025-09-03T00:00:00Z');
      break;
    case 'month':
      startDate = new Date('2025-08-09T00:00:00Z');
      break;
    default:
      startDate = new Date(0); // Все время
  }
  
  // Получаем все акции, в которых участвует официант
  const allPromotions = promotions.filter(promo => 
    promo.restaurants.some(restId => 
      waiterProfile.restaurants.some(waiterRest => waiterRest.id === restId)
    ) &&
    new Date(promo.endsAt) >= startDate
  );
  
  // Считаем общую мотивацию официанта
  const totalEarned = allPromotions.reduce((sum, promo) => {
    const waiterSales = staticPromoSaleEvents.filter(sale => 
      sale.promotionId === promo.id && 
      sale.waiterId === waiterId
    );
    
    const waiterMotivation = waiterSales.reduce((saleSum, sale) => 
      saleSum + sale.motivation.amount, 0
    );
    
    return sum + waiterMotivation;
  }, 0);
  
  // Считаем выплаченную мотивацию (только по завершенным акциям)
  const finishedPromotions = allPromotions.filter(promo => promo.status === 'finished');
  const totalPaid = finishedPromotions.reduce((sum, promo) => {
    const waiterSales = staticPromoSaleEvents.filter(sale => 
      sale.promotionId === promo.id && 
      sale.waiterId === waiterId
    );
    
    const waiterMotivation = waiterSales.reduce((saleSum, sale) => 
      saleSum + sale.motivation.amount, 0
    );
    
    return sum + waiterMotivation;
  }, 0);
  
  return {
    earned: totalEarned,
    paid: totalPaid,
    toPay: totalEarned - totalPaid
  };
}

// Экспорт для использования в компонентах
export const tipsData = {
  profile: waiterProfile,
  events: allEvents,
  stats: waiterStats,
  periodStats,
  notifications
};
