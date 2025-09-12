"use client";

import { useEffect, useMemo, useState } from "react";

export type PeriodPreset = "day" | "week" | "month" | "quarter" | "custom";

export type Period = {
  preset: PeriodPreset;
  from: string; // ISO
  to: string; // ISO
};

const KEY = "guestme.period";

// Статические функции для работы с датами
function startOfDay(d: Date) { const x = new Date(d); x.setHours(0,0,0,0); return x; }
function addDays(d: Date, n: number) { const x = new Date(d); x.setDate(x.getDate()+n); return x; }

function calcPeriod(preset: PeriodPreset, base: Date): Period {
  const end = new Date(base);
  let start = new Date(base);
  if (preset === "day") start = startOfDay(end);
  if (preset === "week") start = startOfDay(addDays(end, -6));
  if (preset === "month") start = startOfDay(addDays(end, -29));
  if (preset === "quarter") start = startOfDay(addDays(end, -89));
  return { preset, from: start.toISOString(), to: end.toISOString() };
}

// Предварительно вычисленные периоды для статического использования
const STATIC_PERIODS = {
  day: { preset: "day" as const, from: "2025-09-09T00:00:00Z", to: "2025-09-09T23:59:59Z" },
  week: { preset: "week" as const, from: "2025-09-03T00:00:00Z", to: "2025-09-09T23:59:59Z" },
  month: { preset: "month" as const, from: "2025-08-10T00:00:00Z", to: "2025-09-09T23:59:59Z" },
  quarter: { preset: "quarter" as const, from: "2025-06-10T00:00:00Z", to: "2025-09-09T23:59:59Z" }
};

export default function PeriodSelector({ value, onChange }: { value?: Period; onChange: (p: Period) => void }) {
  const [period, setPeriod] = useState<Period>({ preset: "week", from: "", to: "" });
  const [customFrom, setCustomFrom] = useState("");
  const [customTo, setCustomTo] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (value && value.from && value.to) {
      setPeriod(value);
    }
  }, [value]);

  useEffect(() => {
    if (isClient && (!period.from || !period.to)) {
      const defaultPeriod = STATIC_PERIODS.week;
      setPeriod(defaultPeriod);
      onChange(defaultPeriod);
    }
  }, [isClient]);

  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(period));
  }, [period]);

  function handlePreset(preset: PeriodPreset) {
    if (preset === "custom") {
      const defaultTime = "2023-12-25T15:30:00Z";
      setPeriod({ preset, from: customFrom || defaultTime, to: customTo || defaultTime });
      onChange({ preset, from: customFrom || defaultTime, to: customTo || defaultTime });
    } else {
      const p = STATIC_PERIODS[preset];
      setPeriod(p);
      onChange(p);
    }
  }

  function applyCustom() {
    if (!customFrom || !customTo) return;
    const p: Period = { preset: "custom", from: customFrom, to: customTo };
    setPeriod(p); onChange(p);
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {(["day","week","month","quarter","custom"] as PeriodPreset[]).map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => handlePreset(p)}
          className={`h-8 px-2 rounded-md text-sm border ${
            isClient && period.preset === p 
              ? "bg-[--color-brand] text-[--color-brand-foreground] border-transparent"
              : "border-black/[.08] dark:border-white/[.145] hover:bg-black/[.05] dark:hover:bg-white/[.06]"
          }`}
        >
          {p === "day" && "День"}
          {p === "week" && "Неделя"}
          {p === "month" && "Месяц"}
          {p === "quarter" && "Квартал"}
          {p === "custom" && "Произв."}
        </button>
      ))}
      {period.preset === "custom" && (
        <div className="flex items-center gap-2">
          <input type="datetime-local" value={customFrom} onChange={(e)=>setCustomFrom(e.target.value)} className="h-8 px-2 rounded-md text-sm border border-black/[.08] dark:border-white/[.145]" />
          <input type="datetime-local" value={customTo} onChange={(e)=>setCustomTo(e.target.value)} className="h-8 px-2 rounded-md text-sm border border-black/[.08] dark:border-white/[.145]" />
          <button type="button" onClick={applyCustom} className="h-8 px-2 rounded-md text-sm border bg-[--color-brand] text-[--color-brand-foreground] border-transparent">Применить</button>
        </div>
      )}
    </div>
  );
}

export function loadSavedPeriod(): Period | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(KEY);
  if (!raw) return null;
  try { return JSON.parse(raw) as Period; } catch { return null; }
}


