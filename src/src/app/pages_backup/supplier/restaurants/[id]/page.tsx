import { restaurants } from "@/mocks/data";
import SupplierRestaurantDetailClient from './client';

// Функция для статической генерации параметров (требуется для output: export)
export async function generateStaticParams() {
  return restaurants.map((restaurant) => ({
    id: restaurant.id,
  }));
}

export default function SupplierRestaurantDetailPage({ params }: { params: { id: string } }) {
  return <SupplierRestaurantDetailClient params={params} />;
}
