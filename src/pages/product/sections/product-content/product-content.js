import { renderProductDetailsCard } from "@/entities/product/ui/product-card/product-details-card.js";
import { initSwiper } from "@/shared/lib/swiper/init-swiper.js";
import { Navigation } from "swiper/modules";
import { initProductTabs } from "@/pages/product/product-tabs/product-tabs.js";

export const initProductContent = () => {
  const productCardElements = document.querySelector(".product-details-card");
  initProductdetailsCardSwiper(productCardElements);

  initProductTabs();
};

//move to the product-details-card.js file
function initProductdetailsCardSwiper(cardElement) {
  const swiperEl = cardElement.querySelector(".product-details-card-swiper");

  console.log("Initializing swiper for:", swiperEl);

  if (!swiperEl) {
    return null;
  }

  return initSwiper(swiperEl, {
    slidesPerView: "auto",
    navigation: {
      nextEl: cardElement.querySelector(".product-details-card-swiper__next"),
      prevEl: cardElement.querySelector(".product-details-card-swiper__prev"),
    },
    modules: [Navigation],
  });
}
