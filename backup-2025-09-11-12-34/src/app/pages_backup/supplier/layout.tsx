import type { Metadata } from "next";
import AppShell from "@/components/AppShell";

export const metadata: Metadata = {
  title: "GuestMe Promo | Портал поставщика",
  description:
    "Адаптивный портал поставщика алкогольной продукции: акции, продажи, мотивации",
};

export default function SupplierLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppShell>
      {children}
    </AppShell>
  );
}