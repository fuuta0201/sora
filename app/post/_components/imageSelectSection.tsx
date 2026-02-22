import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type Props = {
  onUpload: (file: File | undefined) => void;
};

export default function ImageSelectSection({
  onUpload,
}: Props) {
  const [imageURL, setImageURL] = useState<string>("");

  useEffect(() => {
    return () => {
      // プレビューURLの解放
      if (imageURL) {
        URL.revokeObjectURL(imageURL);
      }
    };
  }, [imageURL]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (imageURL) {
      URL.revokeObjectURL(imageURL);
    }

    if (!file) {
      setImageURL("");
      onUpload(undefined);
      return;
    }

    const url = URL.createObjectURL(file);
    setImageURL(url);
    onUpload(file);
  };

  return (
    <div className="w-full px-4 py-6">
      <div className="w-full aspect-square relative">
        {imageURL ? (
          <Image
            src={imageURL}
            fill={true}
            alt="選択された画像"
            className="object-cover rounded-lg"
          />
        ) : (
          <div className="w-full h-full rounded-lg border border-gray-300 border-dashed grid place-items-center">
            <p className="text-sm text-gray-400">
              画像が選択されていません
            </p>
          </div>
        )}
      </div>
      <Button
        className="fixed bottom-5 left-1/2 -translate-x-1/2 text-sm"
        asChild
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </Button>
    </div>
  );
}
