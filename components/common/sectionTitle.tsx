import { cn } from "@/lib/utils";

export default function SectionTitle({
  children,
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        "w-full bg-linear-to-l from-indigo-500 via-sky-500 to-emerald-500 bg-clip-text py-4 text-3xl font-extrabold text-transparent",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
}
