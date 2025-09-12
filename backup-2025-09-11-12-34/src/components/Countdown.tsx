"use client";

function msToParts(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(s / 86400);
  const hours = Math.floor((s % 86400) / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = s % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return { days, hours: pad(hours), minutes: pad(minutes), seconds: pad(seconds) };
}

export default function Countdown({ to }: { to: string }) {
  // Используем только статические данные
  const target = new Date(to).getTime();
  const baseTime = new Date('2025-09-09T15:30:00Z').getTime();
  const { days, hours, minutes, seconds } = msToParts(target - baseTime);
  
  return (
    <span className="text-xs text-[--color-muted-foreground]">{days}д {hours}:{minutes}:{seconds}</span>
  );
}





