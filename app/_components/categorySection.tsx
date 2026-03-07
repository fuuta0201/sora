import { getRandomCategory } from "@/utils/category";
import { getPostsByCategory } from "@/lib/microcms";
import SectionTitle from "@/components/common/sectionTitle";
import CategoryCard from "./categoryCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default async function RecentlySection() {
  const categoryName = getRandomCategory();
  const res = await getPostsByCategory(categoryName);
  const contents = res?.contents;

  return (
    <section className="container pl-4">
      <SectionTitle>{categoryName}カテゴリー</SectionTitle>
      <div>
        {contents ? (
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full max-w-full"
          >
            <CarouselContent>
              {contents.map((content) => (
                <CarouselItem key={content.id} className="basis-[85%]">
                  <div className="p-1">
                    <CategoryCard content={content} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        ) : (
          <div>投稿が見つかりません</div>
        )}
      </div>
    </section>
  );
}
