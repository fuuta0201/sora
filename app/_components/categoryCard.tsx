import Image from "next/image";
import { PostContent } from "@/types/microcms";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PostModal from "@/components/common/postModal";

type Props = {
  content: PostContent;
};

export default function CategoryCard({ content }: Props) {
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
        <CardTitle>{content.title}</CardTitle>
        <CardDescription className="col-span-2 [display:-webkit-box] min-h-10 overflow-hidden leading-5 text-ellipsis [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
          {content.body}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <PostModal
          content={content}
          renderButton={() => <Button className="w-full">投稿を見る</Button>}
        />
      </CardFooter>
    </Card>
  );
}
