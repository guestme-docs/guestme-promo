import PromotionDetailClient from '../components/PromotionDetailClient';

export default function PromotionPr3Page() {
  return <PromotionDetailClient params={Promise.resolve({ id: 'pr3' })} />;
}
