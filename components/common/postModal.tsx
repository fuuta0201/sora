import { PostContent } from "@/types/microcms";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ImageItem from "./imageItem";

type Props = {
  content: PostContent;
  renderButton: () => React.ReactNode;
};

export default function PostModal({ content, renderButton }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>{renderButton()}</DialogTrigger>
      <DialogContent className="">
        <VisuallyHidden asChild>
          <DialogTitle>{content.title}</DialogTitle>
        </VisuallyHidden>
        <div className="pt-5">
          <ImageItem content={content} isModal={true} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
