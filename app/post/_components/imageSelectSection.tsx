import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type Props = {
  initialImageUrl: string;
  onUpload: (file: File | undefined) => void;
};

export default function ImageSelectSection({
  initialImageUrl,
  onUpload,
}: Props) {
  const [imageUrl, setImageUrl] = useState<string>(initialImageUrl);

  useEffect(() => {
    return () => {
      // プレビューURLの解放
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }

    if (!file) {
      setImageUrl("");
      onUpload(undefined);
      return;
    }

    const url = URL.createObjectURL(file);
    setImageUrl(url);
    onUpload(file);
  };

  return (
    <div className="w-full px-4 py-6">
      <div className="relative aspect-square w-full">
        {imageUrl ? (
          <Image
            src={imageUrl}
            fill={true}
            alt="選択された画像"
            className="rounded-lg object-cover"
          />
        ) : (
          <div className="grid h-full w-full place-items-center rounded-lg border border-dashed border-gray-300">
            <p className="text-sm text-gray-400">画像が選択されていません</p>
          </div>
        )}
      </div>
      <Button
        className="fixed bottom-5 left-1/2 -translate-x-1/2 text-sm"
        asChild
      >
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </Button>
    </div>
  );
}
