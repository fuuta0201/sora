"use client";
import { useState } from "react";
import PostHeader from "./_components/postHeader";
import ImageSelectSection from "./_components/imageSelectSection";

export default function Page() {
  const [uploadedFile, setUploadedFile] = useState<
    File | undefined
  >(undefined);

  // microCMS 画像アップロードAPIと通信
  // レスポンス : 画像URL
  const handleImagePost = async () => {
    if (!uploadedFile) return;

    const buffer = Buffer.from(
      await uploadedFile.arrayBuffer()
    );
    console.log(buffer);
  };

  return (
    <main>
      <PostHeader
        isShowNextButton={!!uploadedFile}
        onPostImage={handleImagePost}
      />
      <ImageSelectSection
        onUpload={(file) => setUploadedFile(file)}
      />
    </main>
  );
}
