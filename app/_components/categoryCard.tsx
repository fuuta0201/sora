import Image from "next/image";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PostModal from "@/components/common/postModal";

export default function CategoryCard() {
  const dummy = {
    id: "ofzwmm11shcj",
    title: "テスト用記事",
    body: "テスト用記事です．テスト用記事です．テスト用記事です．",
    imageUrl: {
      url: "https://images.microcms-assets.io/assets/e76e0ff2b74748eca57a2ff5147201ad/ffd259d7ddde44bbac0886c4a19e4b0e/4.webp",
      width: 2000,
      height: 2667,
    },
    category: ["walking"],
    user: "satofuta0201@gmail.com",
    createdAt: "2026-02-27T13:37:37.286Z",
    updatedAt: "2026-02-27T13:45:26.471Z",
    publishedAt: "2026-02-27T13:37:37.286Z",
    revisedAt: "2026-02-27T13:45:26.471Z",
  };

  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video rounded-t-xl" />
      <Image
        src="/images/4.webp"
        alt=""
        width={320}
        height={120}
        className="relative z-20 aspect-video rounded-t-xl object-cover"
      />
      <CardHeader className="relative">
        <CardTitle>お散歩中のソラ</CardTitle>
        <CardDescription className="col-span-2 [display:-webkit-box] min-h-10 overflow-hidden leading-5 text-ellipsis [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
          土手を散歩してるソラだよ土手を散歩してるソラだよ土手を散歩してるソラだよ土手を散歩してるソラだよ土手を散歩してるソラだよ土手を散歩してるソラだよ土手を散歩してるソラだよ土手を散歩してるソラだよ土手を散歩してるソラだよ土手を散歩してるソラだよ土手を散歩してるソラだよ土手を散歩してるソラだよ
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <PostModal
          content={dummy}
          renderButton={() => <Button className="w-full">投稿を見る</Button>}
        />
      </CardFooter>
    </Card>
  );
}
