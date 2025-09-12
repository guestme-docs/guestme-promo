type StatCardProps = {
  title: string;
  value: string | number;
  hint?: string;
  tone?: "default" | "success" | "warning" | "muted";
  growth?: number; // процент роста
  onClick?: () => void;
  onHover?: () => void;
  hoverable?: boolean;
};

const toneToClass: Record<NonNullable<StatCardProps["tone"]>, string> = {
  default: "",
  success: "",
  warning: "",
  muted: "",
};

const toneToValueClass: Record<NonNullable<StatCardProps["tone"]>, string> = {
  default: "text-black dark:text-white",
  success: "text-emerald-600 dark:text-emerald-400",
  warning: "text-amber-600 dark:text-amber-400",
  muted: "text-black dark:text-white",
};

export default function StatCard({ 
  title, 
  value, 
  hint, 
  tone = "muted", 
  growth, 
  onClick, 
  onHover,
  hoverable = false 
}: StatCardProps) {
  const baseClasses = `rounded-lg p-4 h-full flex flex-col items-center text-center ${toneToClass[tone]}`;
  const interactiveClasses = hoverable || onClick ? "cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02]" : "";
  
  return (
    <div 
      className={`${baseClasses} ${interactiveClasses}`}
      onClick={onClick}
      onMouseEnter={onHover}
    >
      <div className="text-xs text-black/60 dark:text-white/60">{title}</div>
      <div className="flex items-center justify-center gap-2 mt-1 flex-1">
        <div className={`text-4xl font-bold ${toneToValueClass[tone]}`}>{value}</div>
        {growth !== undefined && (
          <div className={`text-sm font-medium ${
            growth >= 0 ? "text-[rgb(106,232,197)] dark:text-[rgb(106,232,197)]" : "text-red-600 dark:text-red-400"
          }`}>
            {growth >= 0 ? "+" : ""}{growth.toFixed(1)}%
          </div>
        )}
      </div>
      {hint && (
        <div className="text-xs text-black/60 dark:text-white/60 mt-1">{hint}</div>
      )}
    </div>
  );
}


