"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";

type Profile = {
  name: string;
  email: string;
  company: string;
  phone: string;
};

type Notifications = {
  onCampaignStart: boolean;
  onCampaignEnd: boolean;
  onPayoutRequired: boolean;
  channel: "email" | "telegram" | "none";
  frequency: "immediate" | "daily" | "weekly";
};

const K_PROFILE = "guestme.profile";
const K_NOTIF = "guestme.notifications";

export default function SettingsPage() {
  const [profile, setProfile] = useState<Profile>({ name: "", email: "", company: "GuestMe", phone: "" });
  const [notif, setNotif] = useState<Notifications>({ onCampaignStart: true, onCampaignEnd: true, onPayoutRequired: true, channel: "email", frequency: "immediate" });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const p = localStorage.getItem(K_PROFILE);
    const n = localStorage.getItem(K_NOTIF);
    if (p) setProfile(JSON.parse(p));
    if (n) setNotif(JSON.parse(n));
  }, []);

  function saveAll(e: React.FormEvent) {
    e.preventDefault();
    localStorage.setItem(K_PROFILE, JSON.stringify(profile));
    localStorage.setItem(K_NOTIF, JSON.stringify(notif));
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-xl font-semibold">Настройки</h1>

      <form onSubmit={saveAll} className="space-y-6">
        <section className="space-y-3">
          <h2 className="text-lg font-medium">Профиль</h2>
          <Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <label className="block">
                <span className="block text-sm text-black/60 dark:text-white/60">Имя</span>
                <input className="mt-1 w-full h-9 px-3 rounded-md text-sm border border-black/[.08] dark:border-white/[.145]" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
              </label>
              <label className="block">
                <span className="block text-sm text-black/60 dark:text-white/60">Email</span>
                <input type="email" className="mt-1 w-full h-9 px-3 rounded-md text-sm border border-black/[.08] dark:border-white/[.145]" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
              </label>
              <label className="block">
                <span className="block text-sm text-black/60 dark:text-white/60">Компания</span>
                <input className="mt-1 w-full h-9 px-3 rounded-md text-sm border border-black/[.08] dark:border-white/[.145]" value={profile.company} onChange={(e) => setProfile({ ...profile, company: e.target.value })} />
              </label>
              <label className="block">
                <span className="block text-sm text-black/60 dark:text-white/60">Телефон</span>
                <input className="mt-1 w-full h-9 px-3 rounded-md text-sm border border-black/[.08] dark:border-white/[.145]" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
              </label>
            </div>
          </Card>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-medium">Уведомления</h2>
          <Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <label className="inline-flex items-center gap-2 text-sm">
                <input type="checkbox" checked={notif.onCampaignStart} onChange={(e) => setNotif({ ...notif, onCampaignStart: e.target.checked })} />
                Старт акции
              </label>
              <label className="inline-flex items-center gap-2 text-sm">
                <input type="checkbox" checked={notif.onCampaignEnd} onChange={(e) => setNotif({ ...notif, onCampaignEnd: e.target.checked })} />
                Окончание акции
              </label>
              <label className="inline-flex items-center gap-2 text-sm">
                <input type="checkbox" checked={notif.onPayoutRequired} onChange={(e) => setNotif({ ...notif, onPayoutRequired: e.target.checked })} />
                Требуется выплата
              </label>
            </div>
          </Card>

          <Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <label className="block">
                <span className="block text-sm text-black/60 dark:text-white/60">Канал</span>
                <select className="mt-1 w-full h-9 px-3 rounded-md text-sm border border-black/[.08] dark:border-white/[.145] bg-transparent" value={notif.channel} onChange={(e) => setNotif({ ...notif, channel: e.target.value as Notifications["channel"] })}>
                  <option value="email">Email</option>
                  <option value="telegram">Telegram</option>
                  <option value="none">Выключено</option>
                </select>
              </label>
              <label className="block">
                <span className="block text-sm text-black/60 dark:text-white/60">Частота</span>
                <select className="mt-1 w-full h-9 px-3 rounded-md text-sm border border-black/[.08] dark:border-white/[.145] bg-transparent" value={notif.frequency} onChange={(e) => setNotif({ ...notif, frequency: e.target.value as Notifications["frequency"] })}>
                  <option value="immediate">Сразу</option>
                  <option value="daily">Ежедневно</option>
                  <option value="weekly">Еженедельно</option>
                </select>
              </label>
            </div>
          </Card>
        </section>

        <div className="flex items-center gap-3">
          <Button variant="brand" type="submit">Сохранить</Button>
          {saved && <span className="text-sm text-emerald-600">Сохранено</span>}
        </div>
      </form>
    </div>
  );
}


