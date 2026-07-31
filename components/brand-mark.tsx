import { BookOpenCheck } from "lucide-react";

export function BrandMark({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizes = {
    sm: "h-9 w-9 rounded-lg",
    md: "h-11 w-11 rounded-lg",
    lg: "h-14 w-14 rounded-lg"
  };

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-7 w-7"
  };

  return (
    <div className={`grid ${sizes[size]} place-items-center bg-emerald-600 text-white shadow-sm ring-1 ring-emerald-500/20`}>
      <BookOpenCheck className={iconSizes[size]} strokeWidth={2.4} />
    </div>
  );
}
