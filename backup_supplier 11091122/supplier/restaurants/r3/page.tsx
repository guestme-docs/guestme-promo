import RestaurantDetailClient from '../components/RestaurantDetailClient';

export default function RestaurantR3Page() {
  return <RestaurantDetailClient params={Promise.resolve({ id: 'r3' })} />;
}
