

export type PromotionStatus = "draft" | "scheduled" | "active" | "paused" | "finished" | "archived";

export type Money = {
  amount: number; // в рублях
  currency: "RUB";
};

export type Restaurant = {
  id: string;
  name: string; // Название
  address: string; // Адрес
  phone: string; // телефон
  inn: string; // ИНН
  adminFullName: string; // ФИО администратора
  adminPhone: string; // телефон администратора
  adminEmail: string; // почта администратора
  imageUrl?: string; // URL изображения ресторана
};

export type Product = {
  id: string;
  name: string;
  imageUrl?: string;
};

export type Motivation = {
  productId: string;
  type: "fixed" | "percent";
  value: number; // рубли для fixed, проценты для percent
};

export type PaymentBreakdown = {
  totalAmount: Money; // общая сумма выплаты за позицию
  guestmeCommission: Money; // комиссия GuestMe
  adminPayment: Money; // выплата администратору
  waiterPayment: Money; // выплата официанту
};

export type Promotion = {
  id: string;
  name: string;
  status: PromotionStatus;
  startsAt: string; // ISO с TZ Europe/Moscow
  endsAt: string; // ISO с TZ Europe/Moscow
  bannerUrl?: string;
  restaurants: string[]; // restaurant ids
  motivations: Motivation[];
  salesCount: number;
  motivationPaid: Money;
  motivationToPay: Money;
  waitersCount: number; // количество официантов в акции
  // Расширенное описание акции
  description?: string; // краткое описание
  goal?: string; // цель акции
  conditions?: string; // условия участия
  // Продвигаемые продукты с детальной информацией
  products?: PromotionProduct[];
};

export type PromotionProduct = {
  productId: string;
  name: string;
  description: string;
  imageUrl: string;
  motivationPerSale: Money; // мотивация за одну продажу
  waiterShare: number; // доля официанта (в процентах)
  adminShare: number; // доля администратора (в процентах)
  guestmeShare: number; // доля GuestMe (в процентах)
};

export type SaleItem = {
  productId: string;
  quantity: number; // количество проданных единиц
  motivation: Money; // общая мотивация за эту позицию
  productName: string; // название продукта (добавляется при обогащении данных)
  paymentBreakdown: PaymentBreakdown; // детализация выплат за позицию
};

export type Waiter = {
  id: string;
  name: string;
  restaurantId: string;
};

export type SaleEvent = {
  id: string;
  promotionId: string; // привязка к одной акции
  restaurantId: string;
  waiterId: string;
  items: SaleItem[]; // массив позиций в рамках одной акции
  totalAmount: Money; // общая сумма мотивации за эту акцию
  occurredAt: string; // ISO
};

export type DashboardSummary = {
  activePromotions: number;
  scheduledPromotions: number;
  finishedPromotions: number;
  totalSalesCount: number;
  motivationPaid: Money;
  motivationToPay: Money;
  restaurantsInPromotions: number;
  waitersInPromotions: number;
  salesGrowth: number; // процент роста продаж
  restaurantsGrowth: number; // процент роста ресторанов
  waitersGrowth: number; // процент роста официантов
};

export function formatMoneyRUB(m: Money): string {
  return new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(m.amount);
}


