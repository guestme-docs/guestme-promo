import { promotions } from "@/mocks/data";
import PromotionDetailClient from './client';

export async function generateStaticParams() {
  return promotions.map((promotion) => ({
    id: promotion.id,
  }));
}

export default function PromotionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return <PromotionDetailClient params={params} />;
}
