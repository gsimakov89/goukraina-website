import { cn } from "@/lib/utils";

export function PlaceholderImage({ text, className, alt }: { text: string; className?: string, alt?: string }) {
  return (
    <div 
      className={cn("bg-gradient-to-br from-[#0D1B2A] to-[#005BBB] flex items-center justify-center p-6 text-center overflow-hidden", className)}
      role="img"
      aria-label={alt || text}
    >
      <span className="text-white/60 font-medium text-sm lg:text-base leading-snug max-w-sm">
        Photo: {text}
      </span>
    </div>
  );
}
