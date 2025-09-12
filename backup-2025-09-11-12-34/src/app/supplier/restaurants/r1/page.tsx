import RestaurantDetailClient from '../components/RestaurantDetailClient';

export default function RestaurantR1Page() {
  return <RestaurantDetailClient params={Promise.resolve({ id: 'r1' })} />;
}
