import PromotionDetailClient from '../components/PromotionDetailClient';

export default function PromotionPr4Page() {
  return <PromotionDetailClient params={Promise.resolve({ id: 'pr4' })} />;
}
