type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  tone?: "default" | "success" | "warning" | "danger" | "brand";
};

export default function Badge({ tone = "default", className = "", ...props }: BadgeProps) {
  const tones = {
    default: "bg-[--color-muted] text-[--color-muted-foreground]",
    success: "bg-[--color-success]/15 text-[--color-success]",
    warning: "bg-[--color-warning]/15 text-[--color-warning]",
    danger: "bg-[--color-danger]/15 text-[--color-danger]",
    brand: "bg-[--color-brand]/15 text-[--color-brand]",
  } as const;
  return <span className={`inline-flex items-center h-6 px-2 rounded-md text-xs font-medium ${tones[tone]} ${className}`} {...props} />;
}






