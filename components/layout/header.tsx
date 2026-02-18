import Image from "next/image";
import Link from "next/link";
import ThemeToggleButton from "./themeToggleButton";

export default function Header() {
  return (
    <header className="h-12 fixed w-[95%] top-3 left-1/2 -translate-x-1/2 rounded-lg bg-foreground opacity-70 flex items-center justify-between p-3">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/icon/sora-icon.svg"
          alt="sora"
          width={35}
          height={35}
        />
        <p className="font-bold text-xl text-background">
          Sora
        </p>
      </Link>
      <ThemeToggleButton />
      <Image
        src="/icon/user-icon.png"
        alt="ユーザー情報アイコン"
        width={40}
        height={40}
      />
    </header>
  );
}
