import { PromoSaleEvent } from './tips-types';

// Исторические данные по промо-продажам (группированные по акциям)
// Группируем продажи разных позиций из одной акции в одно событие

export const historicalPromoSaleEvents: PromoSaleEvent[] = [
  // === ПРОДАЖИ ПО АКЦИИ "Осенняя дегустация" (pr1) ===
  {
    id: "promo_h_1",
    type: "promo_sale",
    promotionId: "pr1",
    promotionName: "Осенняя дегустация",
    promotionBannerUrl: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=200&fit=crop&crop=center",
    items: [
      {
        productId: "p1",
        productName: "Виски 12 лет",
        quantity: 1,
        motivation: { amount: 108, currency: "RUB" } // 180 * 60% = 108 руб
      },
      {
        productId: "p2", 
        productName: "Джин Премиум",
        quantity: 2,
        motivation: { amount: 180, currency: "RUB" } // 150 * 60% * 2 = 180 руб
      }
    ],
    totalMotivation: { amount: 288, currency: "RUB" }, // 108 + 180
    date: "2025-09-09T17:20:00Z",
    restaurantId: "r1",
    restaurantName: "Стейк-хаус BigFood на Пушечной, 61",
    waiterId: "w1",
    orderId: "s1757450817430_6bjhxunc9"
  },
  {
    id: "promo_h_2",
    type: "promo_sale",
    promotionId: "pr1",
    promotionName: "Осенняя дегустация",
    promotionBannerUrl: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=200&fit=crop&crop=center",
    items: [
      {
        productId: "p3",
        productName: "Вермут Классик",
        quantity: 3,
        motivation: { amount: 216, currency: "RUB" } // 120 * 60% * 3 = 216 руб
      }
    ],
    totalMotivation: { amount: 216, currency: "RUB" },
    date: "2025-09-09T16:45:00Z",
    restaurantId: "r1",
    restaurantName: "Стейк-хаус BigFood на Пушечной, 61",
    waiterId: "w1",
    orderId: "s1757450817430_fqs27z6fh"
  },
  {
    id: "promo_h_3",
    type: "promo_sale",
    promotionId: "pr1",
    promotionName: "Осенняя дегустация",
    promotionBannerUrl: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=200&fit=crop&crop=center",
    items: [
      {
        productId: "p1",
        productName: "Виски 12 лет",
        quantity: 2,
        motivation: { amount: 216, currency: "RUB" } // 180 * 60% * 2 = 216 руб
      },
      {
        productId: "p2",
        productName: "Джин Премиум", 
        quantity: 1,
        motivation: { amount: 90, currency: "RUB" } // 150 * 60% = 90 руб
      }
    ],
    totalMotivation: { amount: 306, currency: "RUB" }, // 216 + 90
    date: "2025-09-09T15:30:00Z",
    restaurantId: "r1",
    restaurantName: "Стейк-хаус BigFood на Пушечной, 61",
    waiterId: "w1",
    orderId: "s1757450817430_8k9m2n4p5"
  },

  // === ПРОДАЖИ ПО АКЦИИ "Виски-марафон" (pr2) ===
  {
    id: "promo_h_4",
    type: "promo_sale",
    promotionId: "pr2",
    promotionName: "Виски-марафон",
    promotionBannerUrl: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=200&fit=crop&crop=center",
    items: [
      {
        productId: "p1",
        productName: "Виски 12 лет",
        quantity: 3,
        motivation: { amount: 324, currency: "RUB" } // 180 * 60% * 3 = 324 руб
      }
    ],
    totalMotivation: { amount: 324, currency: "RUB" },
    date: "2025-09-08T19:15:00Z",
    restaurantId: "r1",
    restaurantName: "Стейк-хаус BigFood на Пушечной, 61",
    waiterId: "w1",
    orderId: "s1757450817430_1a2b3c4d5"
  },
  {
    id: "promo_h_5",
    type: "promo_sale",
    promotionId: "pr2",
    promotionName: "Виски-марафон",
    promotionBannerUrl: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=200&fit=crop&crop=center",
    items: [
      {
        productId: "p1",
        productName: "Виски 12 лет",
        quantity: 2,
        motivation: { amount: 216, currency: "RUB" } // 180 * 60% * 2 = 216 руб
      }
    ],
    totalMotivation: { amount: 216, currency: "RUB" },
    date: "2025-09-08T18:30:00Z",
    restaurantId: "r1",
    restaurantName: "Стейк-хаус BigFood на Пушечной, 61",
    waiterId: "w1",
    orderId: "s1757450817430_6e7f8g9h0"
  },

  // === ПРОДАЖИ ПО АКЦИИ "Коктейльная революция" (pr3) ===
  {
    id: "promo_h_6",
    type: "promo_sale",
    promotionId: "pr3",
    promotionName: "Коктейльная революция",
    promotionBannerUrl: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?w=400&h=200&fit=crop&crop=center",
    items: [
      {
        productId: "p4",
        productName: "Ром Карибский",
        quantity: 2,
        motivation: { amount: 240, currency: "RUB" } // 200 * 60% * 2 = 240 руб
      },
      {
        productId: "p5",
        productName: "Текила Премиум",
        quantity: 1,
        motivation: { amount: 150, currency: "RUB" } // 250 * 60% = 150 руб
      }
    ],
    totalMotivation: { amount: 390, currency: "RUB" }, // 240 + 150
    date: "2025-09-07T20:45:00Z",
    restaurantId: "r1",
    restaurantName: "Стейк-хаус BigFood на Пушечной, 61",
    waiterId: "w1",
    orderId: "s1757450817430_2i3j4k5l6"
  },
  {
    id: "promo_h_7",
    type: "promo_sale",
    promotionId: "pr3",
    promotionName: "Коктейльная революция",
    promotionBannerUrl: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?w=400&h=200&fit=crop&crop=center",
    items: [
      {
        productId: "p4",
        productName: "Ром Карибский",
        quantity: 1,
        motivation: { amount: 120, currency: "RUB" } // 200 * 60% = 120 руб
      }
    ],
    totalMotivation: { amount: 120, currency: "RUB" },
    date: "2025-09-07T19:20:00Z",
    restaurantId: "r1",
    restaurantName: "Стейк-хаус BigFood на Пушечной, 61",
    waiterId: "w1",
    orderId: "s1757450817430_7m8n9o0p1"
  },

  // === ДОПОЛНИТЕЛЬНЫЕ ПРОДАЖИ ДЛЯ БОЛЬШЕГО КОЛИЧЕСТВА ДАННЫХ ===
  {
    id: "promo_h_8",
    type: "promo_sale",
    promotionId: "pr1",
    promotionName: "Осенняя дегустация",
    promotionBannerUrl: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=200&fit=crop&crop=center",
    items: [
      {
        productId: "p2",
        productName: "Джин Премиум",
        quantity: 2,
        motivation: { amount: 180, currency: "RUB" }
      },
      {
        productId: "p3",
        productName: "Вермут Классик",
        quantity: 1,
        motivation: { amount: 72, currency: "RUB" }
      }
    ],
    totalMotivation: { amount: 252, currency: "RUB" },
    date: "2025-09-06T21:10:00Z",
    restaurantId: "r1",
    restaurantName: "Стейк-хаус BigFood на Пушечной, 61",
    waiterId: "w1",
    orderId: "s1757450817430_3q4r5s6t7"
  },
  {
    id: "promo_h_9",
    type: "promo_sale",
    promotionId: "pr2",
    promotionName: "Виски-марафон",
    promotionBannerUrl: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=200&fit=crop&crop=center",
    items: [
      {
        productId: "p1",
        productName: "Виски 12 лет",
        quantity: 1,
        motivation: { amount: 108, currency: "RUB" }
      }
    ],
    totalMotivation: { amount: 108, currency: "RUB" },
    date: "2025-09-06T18:45:00Z",
    restaurantId: "r1",
    restaurantName: "Стейк-хаус BigFood на Пушечной, 61",
    waiterId: "w1",
    orderId: "s1757450817430_8u9v0w1x2"
  },
  {
    id: "promo_h_10",
    type: "promo_sale",
    promotionId: "pr3",
    promotionName: "Коктейльная революция",
    promotionBannerUrl: "https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?w=400&h=200&fit=crop&crop=center",
    items: [
      {
        productId: "p5",
        productName: "Текила Премиум",
        quantity: 2,
        motivation: { amount: 300, currency: "RUB" }
      }
    ],
    totalMotivation: { amount: 300, currency: "RUB" },
    date: "2025-09-05T20:30:00Z",
    restaurantId: "r1",
    restaurantName: "Стейк-хаус BigFood на Пушечной, 61",
    waiterId: "w1",
    orderId: "s1757450817430_4y5z6a7b8"
  }
];
