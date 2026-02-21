import MainVisual from "./_components/mainVisual";
import RecentlySection from "./_components/recentlySection";
import ListSection from "./_components/listSection";
import PostButton from "./_components/postButton";

export default function Home() {
  return (
    <main>
      <PostButton />
      <MainVisual />
      <RecentlySection />
      <ListSection />
    </main>
  );
}
