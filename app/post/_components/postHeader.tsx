"use client";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function PostHeader() {
  const router = useRouter();
  return (
    <div className="relative mt-15 flex w-full justify-center border-b border-b-gray-200 dark:border-b-gray-500 py-3">
      <h1 className="font-semibold">新規投稿</h1>
      <button
        type="button"
        onClick={() => router.back()}
        className="absolute left-4 top-1/2 -translate-y-1/2"
        aria-label="戻る"
      >
        <ChevronLeft size={30} />
      </button>
    </div>
  );
}
