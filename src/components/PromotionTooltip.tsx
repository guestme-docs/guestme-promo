"use client";

import { useState } from "react";
import { Promotion } from "@/mocks/types";
import { formatMoneyRUB } from "@/mocks/types";

type PromotionTooltipProps = {
  promotions: Promotion[];
  children: React.ReactNode;
};

export default function PromotionTooltip({ promotions, children }: PromotionTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && promotions.length > 0 && (
        <div 
          className="absolute top-full left-0 mt-2 z-50 rounded-lg shadow-lg p-3 min-w-64"
          style={{
            backgroundColor: 'var(--tooltip-background)',
            border: '1px solid var(--tooltip-border)',
            color: 'var(--tooltip-text)',
          }}
        >
          <div 
            className="text-sm font-medium mb-2"
            style={{ color: 'var(--tooltip-text)' }}
          >
            Активные акции:
          </div>
          <div className="space-y-2">
            {promotions.map((promotion) => (
              <div key={promotion.id} className="text-sm">
                <div 
                  className="font-medium"
                  style={{ color: 'var(--tooltip-text)' }}
                >
                  {promotion.name}
                </div>
                <div 
                  className="text-xs"
                  style={{ color: 'var(--tooltip-text-secondary)' }}
                >
                  Продаж: {promotion.salesCount} • К выплате: {formatMoneyRUB(promotion.motivationToPay)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}



