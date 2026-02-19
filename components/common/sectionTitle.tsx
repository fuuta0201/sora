export default function SectionTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <h2 className="w-full bg-linear-to-l from-indigo-500 via-sky-500 to-emerald-500 bg-clip-text py-4 text-3xl font-extrabold text-transparent">
      {children}
    </h2>
  );
}
