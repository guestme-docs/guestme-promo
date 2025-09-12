import RestaurantDetailClient from '../components/RestaurantDetailClient';

export default function RestaurantR7Page() {
  return <RestaurantDetailClient params={Promise.resolve({ id: 'r7' })} />;
}
