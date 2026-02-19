import Image from "next/image";

export default function MainVisual() {
  return (
    <div className="relative h-90 w-full overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/main-visual.webp"
          alt="sora"
          fill
          priority
          sizes="100vw"
          className="pointer-events-none object-cover mask-[linear-gradient(to_bottom,black_0%,black_55%,transparent_100%)]"
        />
      </div>
      <div className="relative z-1 flex h-full items-end px-5 pb-9">
        <h1 className="text-8xl font-extrabold opacity-75">
          Sora
        </h1>
      </div>
    </div>
  );
}
