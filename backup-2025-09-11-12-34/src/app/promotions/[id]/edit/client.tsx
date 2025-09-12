"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePromotionStore } from "@/mocks/store";

export default function EditPromotionClient({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { byId, update } = usePromotionStore();
  const item = byId(params.id);

  useEffect(() => {
    if (!item) {
      router.push('/promotions');
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

