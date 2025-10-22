import { initSwiper } from "@/shared/lib/swiper/init-swiper.js";
import { Navigation } from "swiper/modules";

export const initNewsSection = () => {
  initNewsSectionSwiper();
};

function initNewsSectionSwiper() {
  return initSwiper(".news-section-slider", {
    slidesPerView: "1",
    spaceBetween: 12,
    navigation: {
      nextEl: ".news-section-slider__next",
      prevEl: ".news-section-slider__prev",
    },
    modules: [Navigation],
    breakpoints: {
      500: { slidesPerView: "2", spaceBetween: 12 },
      660: { slidesPerView: "3", spaceBetween: 12 },
      768: { slidesPerView: "3", spaceBetween: 24 },
      1338: { slidesPerView: "3", spaceBetween: 33 },
    },
  });
}
