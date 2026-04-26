"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deletePostAction } from "@/services/deleteAction";

type Props = {
  id: string;
  email: string;
  renderButton: () => React.ReactNode;
};

export default function DeleteModal({ id, email, renderButton }: Props) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async (id: string) => {
    try {
      await deletePostAction(id, email);
      setOpen(false);
      router.refresh();

      toast.success("削除が完了しました", {
        description: "投稿一覧を更新しました",
        duration: 2000, // 2秒表示
        position: "top-right",
      });
    } catch (error) {
      const base = "削除に失敗しました";
      const detail =
        error instanceof Error ? error.message : String(error ?? "");
      console.error(detail ? `${base}: ${detail}` : base);
      toast.error("削除に失敗しました", {
        description: "しばらく時間を置いてから実行してください",
        duration: 2000, // 2秒表示
        position: "top-right",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{renderButton()}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>投稿を削除しますか？</DialogTitle>
          <DialogDescription>
            1度投稿を削除した場合、復元はできません。
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">キャンセル</Button>
          </DialogClose>
          <Button onClick={() => handleDelete(id)}>削除する</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
