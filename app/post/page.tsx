"use client";
import { useState } from "react";
import Image from "next/image";
import PostHeader from "./_components/postHeader";
import ImageSelectSection from "./_components/imageSelectSection";
import PostForm from "./_components/postForm";

export type Status = "image" | "form";

export default function Page() {
  const [status, setStatus] = useState<Status>("image");
  const [uploadedFile, setUploadedFile] = useState<File | undefined>(undefined);
  const [microCmsImageUrl, setMicroCmsImageUrl] = useState<string | undefined>(
    undefined
  );

  const handleFileChange = (file: File | undefined) => {
    if (!file) return;

    setUploadedFile(file);
    setMicroCmsImageUrl(undefined);
  };

  // microCMS 画像アップロードAPIと通信
  // レスポンス : 画像URL
  const handleImagePost = async () => {
    if (!uploadedFile) return;

    if (!microCmsImageUrl) {
      const form = new FormData();
      form.append("file", uploadedFile);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: form,
      });

      if (!res.ok) {
        console.error(await res.text());
        return;
      }

      const data = (await res.json()) as { url: string };
      setMicroCmsImageUrl(data.url);
    }
    setStatus("form");
  };

  return (
    <main>
      <PostHeader
        isShowNextButton={!!uploadedFile}
        status={status}
        onChangeStatus={(next) => setStatus(next)}
        onPostImage={handleImagePost}
      />
      {status == "image" && (
        // 画像選択画面
        <ImageSelectSection
          initialImageUrl={microCmsImageUrl ? microCmsImageUrl : ""}
          onUpload={(file) => handleFileChange(file)}
        />
      )}
      {status === "form" && microCmsImageUrl && (
        // フォーム入力画面
        <div className="flex w-full flex-col space-y-2 px-4 py-6">
          <div className="relative aspect-square w-full">
            <Image
              src={microCmsImageUrl}
              fill={true}
              alt="投稿画像"
              className="rounded-lg object-cover"
            />
          </div>
          <PostForm imageUrl={microCmsImageUrl} />
        </div>
      )}
    </main>
  );
}
