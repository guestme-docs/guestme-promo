import { promotions } from "@/mocks/data";
import EditSupplierPromotionClient from './client';

// Функция для статической генерации параметров (требуется для output: export)
export async function generateStaticParams() {
  return promotions.map((promotion) => ({
    id: promotion.id,
  }));
}

export default function EditSupplierPromotionPage({ params }: { params: { id: string } }) {
  return <EditSupplierPromotionClient params={params} />;
}
