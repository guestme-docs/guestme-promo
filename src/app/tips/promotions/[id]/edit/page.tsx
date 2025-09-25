import { promotions } from "@/mocks/data";
import EditTipsPromotionClient from './client';

// Функция для статической генерации параметров (требуется для output: export)
export async function generateStaticParams() {
  return promotions.map((promotion) => ({
    id: promotion.id,
  }));
}

export default async function EditTipsPromotionPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  return <EditTipsPromotionClient params={resolvedParams} />;
}





