type CardProps = React.HTMLAttributes<HTMLDivElement> & { hoverable?: boolean; noBorder?: boolean };

export default function Card({ hoverable = true, noBorder = false, className = "", ...props }: CardProps) {
  return (
    <div
      className={`rounded ${noBorder ? "" : "border"} p-0 ${hoverable ? "hover:bg-black/[.03] dark:hover:bg-white/[.04] transition-colors" : ""} ${className}`}
      {...props}
    />
  );
}



