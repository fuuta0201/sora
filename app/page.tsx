import { getPosts } from "@/lib/microcms";
import MainVisual from "./_components/mainVisual";
import CategorySection from "./_components/categorySection";
import ListSection from "./_components/listSection";
import PostButton from "./_components/postButton";

export default async function Home() {
  const res = await getPosts();

  if (!res) {
    return (
      <main>
        <p>データが見つかりませんでした</p>
      </main>
    );
  }

  const contents = res?.contents;

  return (
    <main>
      <PostButton />
      <MainVisual />
      <CategorySection />
      {contents && (
        <ListSection
          initialContents={res.contents}
          initialOffset={res.offset}
          totalCount={res.totalCount}
        />
      )}
    </main>
  );
}
