"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { usePromotionStore } from "@/mocks/store";

export default function EditSupplierPromotionClient({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { byId, update } = usePromotionStore();
  const resolvedParams = use(params);
  const item = byId(resolvedParams.id);

  useEffect(() => {
    if (!item) {
      router.push('/supplier/promotions');
    }
  }, [item, router]);

  if (!item) {
    return <div>Загрузка...</div>;
  }

  return (
    <div>
      <h1>Редактирование акции: {item.title}</h1>
      <p>Функция редактирования будет добавлена позже</p>
      <button onClick={() => router.back()}>Назад</button>
    </div>
  );
}

