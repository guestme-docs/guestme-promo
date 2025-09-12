import RestaurantDetailClient from '../components/RestaurantDetailClient';

export default function RestaurantR2Page() {
  return <RestaurantDetailClient params={Promise.resolve({ id: 'r2' })} />;
}
