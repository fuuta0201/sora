"use client";
import { useEffect, useState, useTransition } from "react";
import { useInView } from "react-intersection-observer";
import { getMorePostsAction } from "@/services/getMorePostsAction";
import { PostContent } from "@/types/microcms";
import SectionTitle from "@/components/common/sectionTitle";
import ImageItem from "@/app/_components/listItem";
import { Spinner } from "@/components/ui/spinner";

type Props = {
  initialContents: PostContent[];
  initialOffset: number;
  totalCount: number;
  email?: string;
};

export default function ListSection({
  initialContents,
  initialOffset,
  totalCount,
  email,
}: Props) {
  const [contents, setContents] = useState<PostContent[]>(initialContents);
  const [offset, setOffset] = useState<number>(
    initialOffset + initialContents.length
  );
  const [isPending, startTransition] = useTransition();
  const { ref: trackingRef, inView } = useInView();

  const hasMore = contents.length < totalCount;

  useEffect(() => {
    if (!inView || !hasMore || isPending) return;

    startTransition(async () => {
      const res = await getMorePostsAction(offset, email);
      if (!res) return;

      setContents((prev) => {
        const existingIds = new Set(prev.map((content) => content.id));
        const newContents = res.contents.filter(
          (content) => !existingIds.has(content.id)
        );
        return [...prev, ...newContents];
      });
      setOffset((prev) => prev + res.contents.length);
    });
  }, [inView, hasMore, isPending, offset, email]);

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
