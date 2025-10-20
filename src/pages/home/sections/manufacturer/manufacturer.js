import { initSwiper } from "@/shared/lib/swiper/init-swiper.js";
import { Navigation } from "swiper/modules";

export const initManufacturerSection = () => {
  initManufacturerSwiper();
};

function initManufacturerSwiper() {
  return initSwiper(".manufacturer-slider", {
    slidesPerView: "auto",
    navigation: {
      nextEl: ".manufacturer-slider__next",
      prevEl: ".manufacturer-slider__prev",
    },
    modules: [Navigation],
  });
}
