import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CardItem() {
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
        <CardAction>
          <Badge
            variant="secondary"
            className="absolute -top-3 right-3"
          >
            トリミング後
          </Badge>
        </CardAction>
        <CardTitle>お散歩中のソラ</CardTitle>
        <CardDescription className="col-span-2">
          土手を散歩してるソラだよ
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">投稿を見る</Button>
      </CardFooter>
    </Card>
  );
}
