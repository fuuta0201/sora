import Image from "next/image";
import { cn } from "@/lib/utils";
import { PostContent } from "@/types/microcms";
import { getDateText } from "@/utils/date";
import CategoryBadge from "../../components/common/categoryBadge";
import PostModal from "@/components/common/postModal";
import { Button } from "../../components/ui/button";

type Props = {
  content: PostContent;
  isModal?: boolean;
};

export default function ListItem({ content, isModal }: Props) {
  const dateText = getDateText(content.createdAt);
  return (
    <div className={isModal ? "" : "mb-4"}>
      <div
        className={cn(
          "flex items-center justify-between py-2",
          isModal ? "" : "px-4"
        )}
      >
        <p className="text-sm">{content.user}</p>
        <CategoryBadge category={content.category[0]} />
      </div>
      <div className="relative aspect-square w-full max-w-full">
        <Image
          src={content.imageUrl.url}
          alt={content.title}
          fill={true}
          className="aspect-square object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 px-4 py-3">
        <h3 className="text-md font-medium">{content.title}</h3>
        <p className="truncate text-sm">{content.body}</p>
        <p className="text-xs text-gray-500">{dateText}</p>
        <PostModal
          content={content}
          renderButton={() => <Button className="w-full">投稿を見る</Button>}
        />
      </div>
    </div>
  );
}
