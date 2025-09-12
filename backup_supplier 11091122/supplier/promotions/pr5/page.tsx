import PromotionDetailClient from '../components/PromotionDetailClient';

export default function PromotionPr5Page() {
  return <PromotionDetailClient params={Promise.resolve({ id: 'pr5' })} />;
}
