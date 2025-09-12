import Badge from "@/components/ui/Badge";
import type { PromotionStatus } from "@/mocks/types";

type Tone = "default" | "success" | "warning" | "danger" | "brand";

export default function StatusBadge({ status }: { status: PromotionStatus }) {
  const map: Record<PromotionStatus, { label: string; tone: Tone }> = {
    draft: { label: "Черновик", tone: "default" },
    scheduled: { label: "Запланирована", tone: "warning" },
    active: { label: "Активна", tone: "success" },
    paused: { label: "Пауза", tone: "brand" },
    finished: { label: "Завершена", tone: "default" },
    archived: { label: "Архив", tone: "default" },
  };
  const v = map[status];
  return <Badge tone={v.tone}>{v.label}</Badge>;
}


