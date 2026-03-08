import Image from "next/image";
import { getDateText } from "@/utils/date";
import { PostContent } from "@/types/microcms";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CategoryBadge from "./categoryBadge";

type Props = {
  content: PostContent;
  renderButton: () => React.ReactNode;
};

export default function PostModal({ content, renderButton }: Props) {
  const dateText = getDateText(content.createdAt);
  return (
    <Dialog>
      <DialogTrigger asChild>{renderButton()}</DialogTrigger>
      <DialogContent className="">
        <VisuallyHidden asChild>
          <DialogTitle>{content.title}</DialogTitle>
        </VisuallyHidden>
        <div className="pt-5">
          <div>
            <div className="flex items-center justify-between py-2">
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
              <p className="max-h-75 overflow-y-auto text-sm">{content.body}</p>
              <p className="text-xs text-gray-500">{dateText}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
