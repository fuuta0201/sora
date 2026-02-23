import { useRouter } from "next/navigation";
import { Status } from "../page";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  isShowNextButton: boolean;
  status: Status;
  onChangeStatus: (next: Status) => void;
  onPostImage: () => void;
};

export default function PostHeader({
  isShowNextButton,
  status,
  onChangeStatus,
  onPostImage,
}: Props) {
  const router = useRouter();

  const handleBack = () => {
    if (status === "image") {
      router.back();
    } else {
      onChangeStatus("image");
    }
  };
  return (
    <div className="relative mt-15 flex w-full justify-center border-b border-b-gray-200 dark:border-b-gray-500 py-3">
      <h1 className="font-semibold">新規投稿</h1>
      <button
        type="button"
        onClick={handleBack}
        className="absolute left-4 top-1/2 -translate-y-1/2"
        aria-label="戻る"
      >
        <ChevronLeft size={30} />
      </button>
      {isShowNextButton && (
        <Button
          variant="ghost"
          className="absolute right-4 top-1/2 -translate-y-1/2"
          onClick={onPostImage}
          disabled={!isShowNextButton}
        >
          次へ
        </Button>
      )}
    </div>
  );
}
