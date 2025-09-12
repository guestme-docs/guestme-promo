import PromotionDetailClient from '../components/PromotionDetailClient';

export default function PromotionPr1Page() {
  return <PromotionDetailClient params={Promise.resolve({ id: 'pr1' })} />;
}
