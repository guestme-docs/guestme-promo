type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "brand" | "ghost" | "danger";
  size?: "sm" | "md";
};

export default function Button({ variant = "default", size = "md", className = "", ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center rounded-md text-sm transition-colors border";
  const sizes = size === "sm" ? "h-8 px-2" : "h-9 px-3";
  const variants = {
    default: "border-black/[.08] dark:border-white/[.145] hover:bg-black/[.05] dark:hover:bg-white/[.06]",
    brand: "border-transparent bg-[--color-brand] text-[--color-brand-foreground] hover:opacity-90",
    ghost: "border-transparent hover:bg-black/[.05] dark:hover:bg-white/[.06]",
    danger: "border-red-300 text-red-600 hover:bg-red-50 dark:border-red-400 dark:text-red-300 dark:hover:bg-red-400/10",
  } as const;
  return <button className={`${base} ${sizes} ${variants[variant]} ${className}`} {...props} />;
}









