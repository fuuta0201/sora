"use client";
import { useState, useTransition } from "react";
import { useOnInView } from "react-intersection-observer";
import { getMorePostsAction } from "@/services/getMorePostsAction";
import { PostContent } from "@/types/microcms";
import SectionTitle from "@/components/common/sectionTitle";
import ImageItem from "@/app/_components/listItem";
import { Spinner } from "@/components/ui/spinner";

type Props = {
  initialContents: PostContent[];
  initialOffset: number;
  totalCount: number;
};

export default function ListSection({
  initialContents,
  initialOffset,
  totalCount,
}: Props) {
  const [contents, setContents] = useState<PostContent[]>(initialContents);
  const [offset, setOffset] = useState<number>(
    initialOffset + initialContents.length
  );
  const [isPending, startTransition] = useTransition();

  const hasMore = contents.length < totalCount;

  const trackingRef = useOnInView((inView) => {
    if (!inView || !hasMore || isPending) return;

    startTransition(async () => {
      const res = await getMorePostsAction(offset);
      if (!res) return;
      setContents((prev) => [...prev, ...res.contents]);
      setOffset((prev) => prev + res.contents.length);
    });
  });

  return (
    <section className="container">
      <SectionTitle className="px-4">投稿一覧</SectionTitle>
      <ul>
        {contents.map((content) => (
          <li key={content.id}>
            <ImageItem content={content} />
          </li>
        ))}
      </ul>
      {/* Intersection Observer */}
      {hasMore && <div ref={trackingRef} className="h-10" />}

      {isPending && (
        <p className="flex justify-center px-4 py-1">
          <Spinner className="size-6" />
        </p>
      )}
    </section>
  );
}
