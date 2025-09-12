import TipsPromotionDetailClient from '../components/TipsPromotionDetailClient';

export default function TipsPromotionPage() {
  return <TipsPromotionDetailClient params={Promise.resolve({ id: "pr5" })} />;
}
