"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePromotionStore } from "@/mocks/store";
// no-op

export default function EditPromotionPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { byId, update } = usePromotionStore();
  const item = byId(params.id);

  const [name, setName] = useState(item?.name ?? "");
  const [startsAt, setStartsAt] = useState("");
  const [endsAt, setEndsAt] = useState("");

  useEffect(() => {
    if (!item) {
      router.replace("/promotions");
    } else {
      // convert ISO to input datetime-local format
      const toLocal = (iso: string) => {
        const d = new Date(iso);
        const pad = (n: number) => String(n).padStart(2, "0");
        const yyyy = d.getFullYear();
        const mm = pad(d.getMonth() + 1);
        const dd = pad(d.getDate());
        const hh = pad(d.getHours());
        const mi = pad(d.getMinutes());
        return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
      };
      setStartsAt(toLocal(item.startsAt));
      setEndsAt(toLocal(item.endsAt));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  if (!item) return null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!item) return;
    update(item.id, {
      name: name.trim() || item.name,
      startsAt: startsAt ? new Date(startsAt).toISOString() : item.startsAt,
      endsAt: endsAt ? new Date(endsAt).toISOString() : item.endsAt,
    });
    router.replace(`/promotions/${item.id}`);
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Редактирование акции</h1>
      <form onSubmit={handleSubmit} className="space-y-3 max-w-xl">
        <label className="block">
          <span className="block text-sm text-black/60 dark:text-white/60">Название</span>
          <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full h-9 px-3 rounded-md text-sm border border-black/[.08] dark:border-white/[.145]" />
        </label>
        <label className="block">
          <span className="block text-sm text-black/60 dark:text-white/60">Начало</span>
          <input type="datetime-local" value={startsAt} onChange={(e) => setStartsAt(e.target.value)} className="mt-1 w-full h-9 px-3 rounded-md text-sm border border-black/[.08] dark:border-white/[.145]" />
        </label>
        <label className="block">
          <span className="block text-sm text-black/60 dark:text-white/60">Окончание</span>
          <input type="datetime-local" value={endsAt} onChange={(e) => setEndsAt(e.target.value)} className="mt-1 w-full h-9 px-3 rounded-md text-sm border border-black/[.08] dark:border-white/[.145]" />
        </label>
        <div className="flex gap-2">
          <button type="submit" className="h-9 px-3 rounded-md text-sm border border-black/[.08] dark:border-white/[.145] hover:bg-black/[.05] dark:hover:bg-white/[.06]">Сохранить</button>
          <button type="button" onClick={() => router.back()} className="h-9 px-3 rounded-md text-sm border border-black/[.08] dark:border-white/[.145] hover:bg-black/[.05] dark:hover:bg-white/[.06]">Отмена</button>
        </div>
      </form>
    </div>
  );
}


