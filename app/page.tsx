import { getPosts } from "@/lib/microcms";
import MainVisual from "./_components/mainVisual";
import RecentlySection from "./_components/recentlySection";
import ListSection from "./_components/listSection";
import PostButton from "./_components/postButton";

export default async function Home() {
  const res = await getPosts();

  if (!res) {
    <main>
      <p>データが見つかりませんでした</p>
    </main>;
  }

  const contents = res?.contents;

  return (
    <main>
      <PostButton />
      <MainVisual />
      <RecentlySection />
      {contents && <ListSection contents={contents} />}
    </main>
  );
}
