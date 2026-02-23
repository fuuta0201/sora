import Image from "next/image";
import { Badge } from "@/components/ui/badge";

export default function ImageItem() {
  return (
    <div className="mb-4">
      <h3 className="px-4 py-2 flex items-center justify-between">
        <p className="text-md font-medium">
          お散歩中のソラ
        </p>
        <Badge variant="secondary">トリミング後</Badge>
      </h3>
      <div className="max-w-full w-full aspect-square relative">
        <Image
          src="/images/4.webp"
          alt="お散歩中のソラ"
          fill={true}
          className="aspect-square object-cover"
        />
      </div>
      <div className="px-4 py-3 flex flex-col gap-2">
        <p className="text-sm">土手を散歩してるソラだよ</p>
        <p className="text-xs text-gray-500">
          2026年1月2日
        </p>
      </div>
    </div>
  );
}
