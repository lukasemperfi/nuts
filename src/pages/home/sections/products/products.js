import { initSwiper } from "@/shared/lib/swiper/init-swiper.js";

export const initProducts = () => {
  initProductCardSwiper();
};

function initProductCardSwiper() {
  return initSwiper(".product-card-swiper", {
    slidesPerView: 1,
  });
}
