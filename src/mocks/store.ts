"use client";

import { promotions as seedPromotions } from "@/mocks/data";
import type { Promotion } from "@/mocks/types";

const STORAGE_KEY = "guestme.promotions";

function load(): Promotion[] {
  if (typeof window === "undefined") return seedPromotions;
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return seedPromotions;
  try {
    const parsed = JSON.parse(raw) as Promotion[];
    return parsed;
  } catch {
    return seedPromotions;
  }
}

function save(list: Promotion[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

export function usePromotionStore() {
  const list = load();

  const create = (p: Promotion) => {
    const updated = [p, ...list];
    save(updated);
    return p;
  };

  const update = (id: string, partial: Partial<Promotion>) => {
    const updated = list.map((p) => (p.id === id ? { ...p, ...partial } : p));
    save(updated);
    return updated.find((p) => p.id === id)!;
  };

  const remove = (id: string) => {
    const updated = list.filter((p) => p.id !== id);
    save(updated);
  };

  const byId = (id: string) => list.find((p) => p.id === id) || null;

  return { list, create, update, remove, byId };
}









