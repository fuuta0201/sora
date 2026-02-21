import SectionTitle from "@/components/common/sectionTitle";
import RecentlyCard from "@/app/_components/recentlyCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function RecentlySection() {
  return (
    <section className="container pl-4">
      <SectionTitle>最近のソラ</SectionTitle>
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
                  <RecentlyCard />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
