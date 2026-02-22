import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod/v3";
import { Button } from "@/components/ui/button";
import DatePicker from "@/components/ui/datePicker";

const formSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, { message: "タイトルを入力してください" }),
  body: z
    .string()
    .trim()
    .min(1, { message: "説明を入力してください" }),
  date: z.date({ message: "日付を入力してください" }),
});
type Form = z.infer<typeof formSchema>;

export default function PostForm() {
  const [submitError, setSubmitError] =
    useState<string>("");

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      body: "",
      date: new Date(),
    },
  });

  const onSubmit = async (data: Form) => {
    setSubmitError("");
    console.log(data);
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
          日付
        </label>
        <Controller
          control={control}
          name="date"
          render={({ field }) => (
            <DatePicker
              date={field.value}
              onSelectDate={(date) => field.onChange(date)}
            />
          )}
        />
        {errors.date && (
          <p className="text-xs text-red-500">
            {errors.date.message}
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
