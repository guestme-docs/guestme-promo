import PromotionDetailClient from '../components/PromotionDetailClient';

export default function PromotionPr8Page() {
  return <PromotionDetailClient params={Promise.resolve({ id: 'pr8' })} />;
}

