"use client";

import dynamic from "next/dynamic";

const TipsAppShell = dynamic(() => import("./TipsAppShell"), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-white flex">
      <div className="w-64 bg-white border-r border-black/[.08] flex flex-col">
        <div className="p-6 border-b border-black/[.08]">
          <div className="text-xl font-bold text-black">GuestMe чаевые</div>
          <div className="text-sm text-black/60 mt-1">Личный кабинет официанта</div>
        </div>
        <div className="flex-1 p-4">
          <div className="space-y-2">
            <div className="block px-3 py-2 text-sm font-medium rounded-md text-black/60">Дашборд</div>
            <div className="block px-3 py-2 text-sm font-medium rounded-md text-black/60">Финансы</div>
          </div>
        </div>
        <div className="p-4 border-t border-black/[.08]">
          <div className="h-9 px-3 rounded-md text-sm border border-black/[.08]">Светлая</div>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="h-16 border-b border-black/[.08] bg-white flex items-center px-6">
          <h1 className="text-lg font-semibold text-black">GuestMe чаевые</h1>
        </div>
        <main className="flex-1 p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        </main>
      </div>
    </div>
  ),
});

type TipsClientAppShellProps = {
  children: React.ReactNode;
};

export default function TipsClientAppShell({ children }: TipsClientAppShellProps) {
  return <TipsAppShell>{children}</TipsAppShell>;
}
