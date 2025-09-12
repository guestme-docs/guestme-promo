import { promotions } from "@/mocks/data";
import EditPromotionClient from './client';

// Функция для статической генерации параметров (требуется для output: export)
export async function generateStaticParams() {
  return promotions.map((promotion) => ({
    id: promotion.id,
  }));
}

export default function EditPromotionPage({ params }: { params: { id: string } }) {
  return <EditPromotionClient params={params} />;
}

