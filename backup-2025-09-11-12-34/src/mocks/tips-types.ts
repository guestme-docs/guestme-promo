export interface Money {
  amount: number;
  currency: "RUB" | "USD" | "EUR";
}

export interface WaiterProfile {
  id: string;
  name: string;
  surname: string;
  phone: string;
  email?: string;
  avatar?: string;
  status: 'active' | 'inactive';
  selfEmployedStatus: 'active' | 'inactive';
  restaurants: Array<{
    id: string;
    name: string;
    status: 'active' | 'inactive';
  }>;
  goals: Array<{
    id: number;
    title: string;
    target: number;
    current: number;
    deadline: string;
    active: boolean;
    createdAt: string;
  }>;
}

export interface TipEvent {
  id: string;
  type: 'tip_with_review' | 'tip_only' | 'review_only';
  amount?: number;
  guestName?: string;
  guestPhone?: string;
  review?: string;
  rating?: number;
  date: string;
  restaurantId: string;
  restaurantName: string;
  waiterId: string;
  orderId?: string;
}

export interface PromoSaleEvent {
  id: string;
  type: 'promo_sale';
  promotionId: string;
  promotionName: string;
  productId: string;
  productName: string;
  motivation: Money;
  quantity: number;
  date: string;
  restaurantId: string;
  restaurantName: string;
  waiterId: string;
  orderId?: string;
}

export type EventType = TipEvent | PromoSaleEvent;

export interface WaiterStats {
  motivations: {
    earned: number;
    toPay: number;
    paid: number;
  };
  tips: {
    total: number;
    count: number;
    uniqueGuests: number;
    averageAmount: number;
  };
  sales: {
    count: number;
    totalQuantity: number;
    averageMotivation: number;
    totalMotivation: number;
  };
  reviews: {
    count: number;
    averageRating: number;
    ratingDistribution: Record<number, number>; // 1-5 звезд
  };
  balance: {
    current: number;
    available: number;
    frozen: number;
  };
}

export interface PeriodStats {
  period: 'day' | 'week' | 'month' | 'custom';
  startDate: string;
  endDate: string;
  stats: WaiterStats;
}

export interface NotificationItem {
  id: string;
  type: 'tip' | 'review' | 'motivation' | 'goal' | 'system';
  title: string;
  message: string;
  date: string;
  read: boolean;
  actionUrl?: string;
}
