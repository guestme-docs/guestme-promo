import { promotions } from "@/mocks/data";
import EditTipsPromotionClient from './client';

// Функция для статической генерации параметров (требуется для output: export)
export async function generateStaticParams() {
  return promotions.map((promotion) => ({
    id: promotion.id,
  }));
}

export default function EditTipsPromotionPage({ params }: { params: { id: string } }) {
  return <EditTipsPromotionClient params={params} />;
}

