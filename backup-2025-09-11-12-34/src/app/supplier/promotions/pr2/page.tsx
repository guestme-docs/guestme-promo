import PromotionDetailClient from '../components/PromotionDetailClient';

export default function PromotionPr2Page() {
  return <PromotionDetailClient params={Promise.resolve({ id: 'pr2' })} />;
}
