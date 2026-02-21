import Link from "next/link";
import { CameraIcon } from "lucide-react";

export default function PostButton() {
  return (
    <Link
      href="/post"
      className="fixed bottom-3 right-3 z-10 flex h-18 w-18 flex-col items-center justify-center gap-0.5 rounded-full bg-gray-800 dark:bg-white"
    >
      <CameraIcon className="text-background" />
      <p className="text-background text-xs">投稿する</p>
    </Link>
  );
}
