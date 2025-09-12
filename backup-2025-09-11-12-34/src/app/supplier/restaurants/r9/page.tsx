import RestaurantDetailClient from '../components/RestaurantDetailClient';

export default function RestaurantR9Page() {
  return <RestaurantDetailClient params={Promise.resolve({ id: 'r9' })} />;
}
