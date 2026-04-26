import { getPostsByUser } from "@/lib/microcms";
import { verifySession } from "@/lib/supabase/auth";
import MainVisual from "../_components/mainVisual";
import ListSection from "../../components/common/listSection";
import PostButton from "../_components/postButton";

export default async function Page() {
  const user = await verifySession();
  if (!user.email) {
    return (
      <main>
        <p>ユーザーが見つかりませんでした</p>
      </main>
    );
  }

  const res = await getPostsByUser(user.email);
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
      {contents && (
        <ListSection
          initialContents={res.contents}
          initialOffset={res.offset}
          totalCount={res.totalCount}
          email={user.email}
          pageType="mypage"
        />
      )}
    </main>
  );
}
