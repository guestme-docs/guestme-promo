import RestaurantDetailClient from '../components/RestaurantDetailClient';

export default function RestaurantR4Page() {
  return <RestaurantDetailClient params={Promise.resolve({ id: 'r4' })} />;
}
