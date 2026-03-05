import SectionTitle from "@/components/common/sectionTitle";
import CategoryCard from "./categoryCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { getRandomCategory } from "@/utils/category";

export default function RecentlySection() {
  const categoryName = getRandomCategory();
  return (
    <section className="container pl-4">
      <SectionTitle>{categoryName}カテゴリー</SectionTitle>
      <div>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-full"
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem
                key={index}
                className="basis-[85%]"
              >
                <div className="p-1">
                  <CategoryCard />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
