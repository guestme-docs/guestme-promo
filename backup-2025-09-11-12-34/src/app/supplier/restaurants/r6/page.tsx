import RestaurantDetailClient from '../components/RestaurantDetailClient';

export default function RestaurantR6Page() {
  return <RestaurantDetailClient params={Promise.resolve({ id: 'r6' })} />;
}
