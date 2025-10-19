import { initSwiper } from "@/shared/lib/swiper/init-swiper.js";
import { Navigation } from "swiper/modules";

export const initProducts = () => {
  initProductCardSwiper();
};

function initProductCardSwiper() {
  return initSwiper(".product-card-swiper", {
    slidesPerView: 1,
    navigation: {
      nextEl: ".product-card-swiper__next",
      prevEl: ".product-card-swiper__prev",
    },
    modules: [Navigation],
  });
}
