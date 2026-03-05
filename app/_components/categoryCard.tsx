import Image from "next/image";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CategoryCard() {
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video rounded-t-xl" />
      <Image
        src="/images/4.webp"
        alt=""
        width={320}
        height={120}
        className="relative z-20 aspect-video object-cover rounded-t-xl"
      />
      <CardHeader className="relative">
        <CardTitle>お散歩中のソラ</CardTitle>
        <CardDescription className="col-span-2 min-h-10 overflow-hidden text-ellipsis leading-5 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
          土手を散歩してるソラだよ土手を散歩してるソラだよ土手を散歩してるソラだよ土手を散歩してるソラだよ土手を散歩してるソラだよ土手を散歩してるソラだよ土手を散歩してるソラだよ土手を散歩してるソラだよ土手を散歩してるソラだよ土手を散歩してるソラだよ土手を散歩してるソラだよ土手を散歩してるソラだよ
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">投稿を見る</Button>
      </CardFooter>
    </Card>
  );
}
