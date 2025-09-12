import { promotions } from "@/mocks/data";
import PromotionDetailClient from './client';

// Функция для статической генерации параметров (требуется для output: export)
export async function generateStaticParams() {
  return promotions.map((promotion) => ({
    id: promotion.id,
  }));
}

export default function PromotionDetailPage({ params }: { params: { id: string } }) {
  return <PromotionDetailClient params={params} />;
}



