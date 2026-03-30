import Image from "next/image";
import Link from "next/link";
import ThemeToggleButton from "./themeToggleButton";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import LogoutButton from "../common/logoutButton";

export default function Header() {
  return (
    <header className="bg-foreground fixed top-3 left-1/2 z-10 flex h-12 w-[95%] -translate-x-1/2 items-center justify-between rounded-lg p-3 opacity-70">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/icon/sora-icon.svg" alt="sora" width={35} height={35} />
        <p className="text-background text-xl font-bold">Sora</p>
      </Link>
      <ThemeToggleButton />
      <Popover>
        <PopoverTrigger>
          <Image
            src="/icon/user-icon.png"
            alt="ユーザー情報アイコン"
            width={40}
            height={40}
            loading="eager"
          />
        </PopoverTrigger>
        <PopoverContent className="grid w-40 gap-2">
          <LogoutButton />
          {/* TODO : マイページ */}
          {/* <Button variant="ghost" className="w-full bg-gray-100">
            マイページ
          </Button> */}
        </PopoverContent>
      </Popover>
    </header>
  );
}
