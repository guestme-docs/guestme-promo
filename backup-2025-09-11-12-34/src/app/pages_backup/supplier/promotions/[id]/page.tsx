import { promotions } from "@/mocks/data";
import SupplierPromotionDetailClient from './client';

// Функция для статической генерации параметров (требуется для output: export)
export async function generateStaticParams() {
  return promotions.map((promotion) => ({
    id: promotion.id,
  }));
}

export default function SupplierPromotionDetailPage({ params }: { params: { id: string } }) {
  return <SupplierPromotionDetailClient params={params} />;
}
