"use server";

import sharp from "sharp";
import { env } from "@/env";

const MAX_IMAGE_EDGE = 1600;
const WEBP_QUALITY = 80;

type UploadImageResult = {
  url: string;
};

export const uploadImageAction = async (
  formData: FormData
): Promise<UploadImageResult> => {
  const file = formData.get("file");

  if (!(file instanceof File)) {
    throw new Error("画像ファイルが見つかりません");
  }

  if (!file.type.startsWith("image/")) {
    throw new Error("画像ファイルを選択してください");
  }

  const inputBuffer = Buffer.from(await file.arrayBuffer());
  const outputBuffer = await sharp(inputBuffer)
    .rotate()
    .resize({
      width: MAX_IMAGE_EDGE,
      height: MAX_IMAGE_EDGE,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({
      quality: WEBP_QUALITY,
    })
    .toBuffer();
  const outputBytes = new Uint8Array(outputBuffer);

  const fileName = `${file.name.replace(/\.[^.]+$/, "") || "image"}.webp`;
  const uploadFormData = new FormData();
  uploadFormData.append(
    "file",
    new Blob([outputBytes], { type: "image/webp" }),
    fileName
  );

  const url = new URL(
    "/api/v1/media",
    `https://${env.MICROCMS_SERVICE_DOMAIN}.microcms-management.io`
  );

  const res = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "X-MICROCMS-API-KEY": env.X_MICROCMS_API_KEY,
    },
    body: uploadFormData,
  });

  if (!res.ok) {
    const detail = await res.text();
    console.error("microCMS upload failed", {
      status: res.status,
      detail,
    });
    throw new Error("画像のアップロードに失敗しました");
  }

  const data = (await res.json()) as { url?: string };
  if (!data.url) {
    throw new Error("アップロード結果が不正です");
  }

  return { url: data.url };
};
