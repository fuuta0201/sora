"use client";
import { useState } from "react";
import Image from "next/image";
import PostHeader from "./_components/postHeader";
import ImageSelectSection from "./_components/imageSelectSection";
import PostForm from "./_components/postForm";

export type Status = "image" | "form";

export default function Page() {
  const [status, setStatus] = useState<Status>("image");
  const [uploadedFile, setUploadedFile] = useState<
    File | undefined
  >(undefined);
  const [microCmsImageUrl, setMicroCmsImageUrl] = useState<
    string | undefined
  >(undefined);

  // microCMS 画像アップロードAPIと通信
  // レスポンス : 画像URL
  // TODO : API request
  const handleImagePost = async () => {
    if (!uploadedFile) return;

    const buffer = Buffer.from(
      await uploadedFile.arrayBuffer()
    );
    console.log(buffer);
    // クリーンアップ
    setStatus("form");
    setMicroCmsImageUrl("/images/4.webp");
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
          initialImageUrl={
            microCmsImageUrl ? microCmsImageUrl : ""
          }
          onUpload={(file) => setUploadedFile(file)}
        />
      )}
      {status === "form" && microCmsImageUrl && (
        // フォーム入力画面
        <div className="w-full flex flex-col space-y-2 px-4 py-6">
          <div className="w-full aspect-square relative">
            <Image
              src={microCmsImageUrl}
              fill={true}
              alt="投稿画像"
              className="object-cover rounded-lg"
            />
          </div>
          <PostForm />
        </div>
      )}
    </main>
  );
}
