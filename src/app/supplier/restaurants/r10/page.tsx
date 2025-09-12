import RestaurantDetailClient from '../components/RestaurantDetailClient';

export default function RestaurantR10Page() {
  return <RestaurantDetailClient params={Promise.resolve({ id: 'r10' })} />;
}
