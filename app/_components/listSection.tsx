import { PostContent } from "@/types/microcms";
import SectionTitle from "@/components/common/sectionTitle";
import ImageItem from "@/components/common/imageItem";

type Props = {
  contents: PostContent[];
};

export default function ListSection({ contents }: Props) {
  return (
    <section className="container">
      <SectionTitle className="px-4">画像一覧</SectionTitle>
      <ul>
        {contents.map((content) => (
          <li key={content.id}>
            <ImageItem content={content} />
          </li>
        ))}
      </ul>
    </section>
  );
}
