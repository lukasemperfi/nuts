import { initDropdown } from "@/shared/ui/dropdown/dropdown.js";
import { initHeader } from "@/widgets/header/header.js";
import { initPageFooter } from "@/widgets/footer/footer.js";
import { lazyLoadElements } from "@/shared/helpers/lazy-loading/lazy-loading.js";
import { initProductPageBreadcrumbs } from "@/pages/product/ui/breadcrumbs/breadcrumbs.js";
import { renderProductDetailsCard } from "@/entities/product/ui/product-card/product-details-card.js";
import { initSwiper } from "@/shared/lib/swiper/init-swiper.js";
import { Navigation } from "swiper/modules";
import { initProductTabs } from "./product-tabs/product-tabs";

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initDropdown({ selector: ".top-header__lang" });
  initProductPageBreadcrumbs();
  initProductTabs();
  initPageFooter();
  lazyLoadElements(".lazy", { rootMargin: "200px 0px" });

  const productCardElements = document.querySelector(".product-details-card");
  initProductdetailsCardSwiper(productCardElements);
});

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

const productData = {
  id: 2,
  title: "Кешью Отборный Жареный",
  sku: "0002",
  description: "Хрустящий кешью, слегка обжаренный без масла.",
  composition: "Кешью 100%",
  energy_value: 574,
  energy_unit: "ккал",
  shelf_life_days: 240,
  storage_conditions: "Хранить в герметичной упаковке",
  weight: 500,
  weight_unit: "г",
  price: 990,
  discount_price: 890,
  packaging_type_id: 2,
  status_id: 2,
  created_at: "2025-10-25T15:45:39.894215+00:00",
  updated_at: "2025-10-25T15:45:39.894215+00:00",
  price_unit: "грн",
  product_images: [
    {
      id: 26,
      is_main: true,
      product_id: 2,
      sort_order: 0,
      image_path_png:
        "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-2.png",
      image_path_webp:
        "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-2.webp",
    },
    {
      id: 25,
      is_main: false,
      product_id: 2,
      sort_order: 1,
      image_path_png:
        "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-1.png",
      image_path_webp:
        "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-1.webp",
    },
    {
      id: 27,
      is_main: false,
      product_id: 2,
      sort_order: 2,
      image_path_png:
        "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-3.png",
      image_path_webp:
        "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-3.webp",
    },
    {
      id: 28,
      is_main: false,
      product_id: 2,
      sort_order: 3,
      image_path_png:
        "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-4.png",
      image_path_webp:
        "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-4.webp",
    },
    {
      id: 29,
      is_main: false,
      product_id: 2,
      sort_order: 4,
      image_path_png:
        "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-5.png",
      image_path_webp:
        "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-5.webp",
    },
    {
      id: 30,
      is_main: false,
      product_id: 2,
      sort_order: 5,
      image_path_png:
        "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-6.png",
      image_path_webp:
        "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-6.webp",
    },
  ],
  product_flavors: [
    {
      flavors: {
        id: 2,
        name: "Жареный",
        value: "fried",
      },
      flavor_id: 2,
    },
    {
      flavors: {
        id: 6,
        name: "Без добавок",
        value: "without-additives",
      },
      flavor_id: 6,
    },
  ],
  packaging_types: {
    id: 2,
    name: "вакуумная",
  },
  product_statuses: {
    id: 2,
    name: "sale",
  },
};
