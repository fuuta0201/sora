import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v3";
import { CATEGORY_LIST } from "@/utils/constants";
import { createPostAction } from "@/services/createPostAction";
import { Button } from "@/components/ui/button";

type Props = {
  imageUrl: string;
};

const formSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "タイトルを入力してください" }),
  body: z
    .string()
    .trim()
    .min(1, { message: "説明を入力してください" }),
  imageUrl: z.string().url(),
  category: z.enum(CATEGORY_LIST as [string, ...string[]], {
    errorMap: () => ({
      message: "ジャンルを選択してください",
    }),
  }),
  user: z.string().email(),
});
type Form = z.infer<typeof formSchema>;

export default function PostForm({ imageUrl }: Props) {
  const [submitError, setSubmitError] =
    useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      body: "",
      imageUrl: imageUrl,
      category: CATEGORY_LIST[0] ?? "",
      user: "satofuta0201@gmail.com", // TODO : ログイン実装
    },
  });

  const onSubmit = async (data: Form) => {
    setSubmitError("");

    const payload = {
      ...data,
      category: [data.category],
    };

    try {
      await createPostAction(payload);

      // TODO router.refresh();
    } catch (error) {
      const base = "投稿に失敗しました";
      const detail =
        error instanceof Error
          ? error.message
          : String(error ?? "");
      setSubmitError(detail ? `${base}: ${detail}` : base);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          タイトル
        </label>
        <input
          type="text"
          {...register("title")}
          className="w-full rounded-md border px-3 py-2"
        />
        {errors.title && (
          <p className="text-xs text-red-500">
            {errors.title.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">
          説明
        </label>
        <textarea
          {...register("body")}
          className="min-h-28 w-full rounded-md border px-3 py-2"
        />
        {errors.body && (
          <p className="text-xs text-red-500">
            {errors.body.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">
          ジャンル
        </label>
        <select
          {...register("category")}
          className="w-full rounded-md border px-3 py-2 bg-background"
        >
          {CATEGORY_LIST.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-xs text-red-500">
            {errors.category.message}
          </p>
        )}
      </div>

      {submitError && (
        <p className="text-sm text-red-500">
          {submitError}
        </p>
      )}

      <Button
        type="submit"
        variant="default"
        className="w-full text-sm mt-4"
      >
        投稿する
      </Button>
    </form>
  );
}
