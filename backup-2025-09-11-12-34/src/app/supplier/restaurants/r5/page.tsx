import RestaurantDetailClient from '../components/RestaurantDetailClient';

export default function RestaurantR5Page() {
  return <RestaurantDetailClient params={Promise.resolve({ id: 'r5' })} />;
}
