import { Button } from "@/components/ui/button";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { homeCarouselItems } from "@/data/mainCarousel";
import Autoplay from "embla-carousel-autoplay";
import { useEffect, useState } from "react";
import styles from "./HomeCarousel.module.scss";

const HomeCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Carousel
      className={styles.carousel}
      opts={{ loop: true }}
      plugins={[Autoplay({ delay: 3000 })]}
      setApi={setApi}
    >
      <CarouselContent>
        {homeCarouselItems.map((item) => (
          <CarouselItem key={item.id}>
            <div className={styles.carouselItem}>
              <div className={styles.carouselItem__image}>
                <img src={item.image} alt={item.title} />
              </div>
              <div className={styles.carouselItem__content}>
                <p className={`${styles.carouselItem__title} line-clamp-2`}>
                  {item.title}
                </p>
                <p className={styles.carouselItem__subtitle}>
                  <img src={item.icon} alt="icon" />
                  {item.subtitle}
                </p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className={styles.carouselButtons}>
        {Array.from(Array(count).keys()).map((button) => (
          <Button
            key={button}
            className={`mx-1 h-1.5 p-0 ${styles.carouselButton} ${
              button === current - 1 ? styles.active : ""
            }`}
            onClick={() => api?.scrollTo(button)}
          />
        ))}
      </div>
    </Carousel>
  );
};

export default HomeCarousel;
