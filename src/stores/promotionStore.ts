"use client";

import { create } from 'zustand';
import { promotions } from '@/mocks/data';

interface Promotion {
  id: string;
  name: string;
  description: string;
  goal: string;
  conditions: string;
  status: 'active' | 'scheduled' | 'finished';
  startsAt: string;
  endsAt: string;
  bannerUrl?: string;
  restaurants: string[];
  waitersCount: number;
  salesCount: number;
  motivationToPay: { amount: number; currency: string };
}

interface PromotionStore {
  promotions: Promotion[];
  addPromotion: (promotion: Promotion) => void;
  updatePromotion: (id: string, promotion: Partial<Promotion>) => void;
  removePromotion: (id: string) => void;
  getPromotion: (id: string) => Promotion | undefined;
}

export const usePromotionStore = create<PromotionStore>((set, get) => ({
  promotions: promotions,
  
  addPromotion: (promotion) =>
    set((state) => ({
      promotions: [...state.promotions, promotion],
    })),
    
  updatePromotion: (id, updatedPromotion) =>
    set((state) => ({
      promotions: state.promotions.map((promotion) =>
        promotion.id === id ? { ...promotion, ...updatedPromotion } : promotion
      ),
    })),
    
  removePromotion: (id) =>
    set((state) => ({
      promotions: state.promotions.filter((promotion) => promotion.id !== id),
    })),
    
  getPromotion: (id) => {
    const state = get();
    return state.promotions.find((promotion) => promotion.id === id);
  },
}));





