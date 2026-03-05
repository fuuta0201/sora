import Image from "next/image";
import { PostContent } from "@/types/microcms";
import CategoryBadge from "./categoryBadge";

type Props = {
  content: PostContent;
};

export default function ImageItem({ content }: Props) {
  const createdAt = new Date(content.createdAt);
  const year = createdAt.getFullYear();
  const month = createdAt.getMonth() + 1;
  const date = createdAt.getDate();
  return (
    <div className="mb-4">
      <div className="px-4 py-2 flex items-center justify-between">
        <p className="text-sm">{content.user}</p>
        <CategoryBadge category={content.category[0]} />
      </div>
      <div className="max-w-full w-full aspect-square relative">
        <Image
          src={content.imageUrl.url}
          alt={content.title}
          fill={true}
          className="aspect-square object-cover"
        />
      </div>
      <div className="px-4 py-3 flex flex-col gap-2">
        <h3 className="text-md font-medium">
          {content.title}
        </h3>
        <p className="text-sm">{content.body}</p>
        <p className="text-xs text-gray-500">
          {`${year}年${month}月${date}日`}
        </p>
      </div>
    </div>
  );
}
