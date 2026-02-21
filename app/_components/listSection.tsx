import SectionTitle from "@/components/common/sectionTitle";
import ImageItem from "@/components/common/imageItem";

export default function ListSection() {
  return (
    <section className="container">
      <SectionTitle className="px-4">画像一覧</SectionTitle>
      <ul>
        {Array.from({ length: 10 }).map((_, index) => (
          <li key={index}>
            <ImageItem />
          </li>
        ))}
      </ul>
    </section>
  );
}
