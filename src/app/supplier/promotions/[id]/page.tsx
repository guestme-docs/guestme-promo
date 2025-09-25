import { promotions } from "@/mocks/data";
import PromotionDetailClient from './client';

export async function generateStaticParams() {
  return promotions.map((promotion) => ({
    id: promotion.id,
  }));
}

export default async function PromotionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return <PromotionDetailClient params={Promise.resolve(resolvedParams)} />;
}
