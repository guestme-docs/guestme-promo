import { restaurants } from "@/mocks/data";
import RestaurantDetailClient from './client';

// Функция для статической генерации параметров (требуется для output: export)
export async function generateStaticParams() {
  return restaurants.map((restaurant) => ({
    id: restaurant.id,
  }));
}

export default function RestaurantDetailPage({ params }: { params: { id: string } }) {
  return <RestaurantDetailClient params={params} />;
}

