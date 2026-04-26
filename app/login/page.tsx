"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

const formSchema = z.object({
  email: z
    .email({
      error: "正しい形式でメールアドレスを入力してください",
    })
    .min(1, { error: "メールアドレスを入力してください" }),
  password: z.string().min(1, "パスワードを入力してください"),
});

const supabase = createClient();

export default function Page() {
  const [error, setError] = useState<string | undefined>(undefined);
  const router = useRouter();

  const {
    control,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        throw new Error(`Failed to login : ${error.message}`);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
      setError("ログインに失敗しました");
    }
  };

  return (
    <main className="flex h-screen w-full items-center justify-center">
      <Card className="w-[95%] sm:max-w-md">
        <CardHeader>
          <CardTitle>ログイン画面</CardTitle>
          <CardDescription>
            Soraを利用する為にログインしてください
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form id="login" onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">メールアドレス</FieldLabel>
                    <Input
                      {...field}
                      id="email"
                      aria-invalid={fieldState.invalid}
                      placeholder="example@email.com"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password">パスワード</FieldLabel>
                    <Input
                      {...field}
                      id="password"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <Button type="submit" form="login">
              ログイン
              {isSubmitting && <Spinner />}
            </Button>
            {error && <FieldError errors={[{ message: error }]} />}
          </Field>
        </CardFooter>
      </Card>
    </main>
  );
}
