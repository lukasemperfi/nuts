import { renderProductDetailsCard } from "@/entities/product/ui/product-card/product-details-card.js";
import { initSwiper } from "@/shared/lib/swiper/init-swiper.js";
import { Navigation } from "swiper/modules";
import { initProductTabs } from "@/pages/product/product-tabs/product-tabs.js";

export const initProductContent = () => {
  renderProductDetailsCard(product, ".product-content__card .page-container");
  initProductTabs();
};

const product = {
  id: 3,
  title: "Грецкий Орех Аляска",
  sku: "0003",
  subtitle: "Крупный грецкий орех в скорлупе, новый урожай.",
  composition: "Грецкий орех 100%",
  energy_value: 654,
  energy_unit: "ккал",
  shelf_life_days: 450,
  storage_conditions: "Хранить в скорлупе при t от 0 до 25°C",
  weight: 1000,
  weight_unit: "г",
  price: 21,
  discount_price: 19,
  packaging_type_id: 3,
  status_id: 3,
  created_at: "2025-10-25T15:45:39.894215+00:00",
  updated_at: "2025-10-25T15:45:39.894215+00:00",
  price_unit: "грн",
  product_images: [
    {
      id: 31,
      is_main: false,
      product_id: 3,
      sort_order: 0,
      image_path_png:
        "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-1.png",
      image_path_webp:
        "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-1.webp",
    },
    {
      id: 32,
      is_main: false,
      product_id: 3,
      sort_order: 1,
      image_path_png:
        "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-2.png",
      image_path_webp:
        "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-2.webp",
    },
    {
      id: 33,
      is_main: true,
      product_id: 3,
      sort_order: 2,
      image_path_png:
        "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-3.png",
      image_path_webp:
        "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-3.webp",
    },
    {
      id: 34,
      is_main: false,
      product_id: 3,
      sort_order: 3,
      image_path_png:
        "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-4.png",
      image_path_webp:
        "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-4.webp",
    },
    {
      id: 35,
      is_main: false,
      product_id: 3,
      sort_order: 4,
      image_path_png:
        "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-5.png",
      image_path_webp:
        "https://pjxjvdaipyjvdiynicsf.supabase.co/storage/v1/object/public/product-images/product-card-image-5.webp",
    },
    {
      id: 36,
      is_main: false,
      product_id: 3,
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
        id: 1,
        name: "Сырой",
        value: "raw",
      },
      flavor_id: 1,
    },
    {
      flavors: {
        id: 5,
        name: "В скорлупе",
        value: "shell",
      },
      flavor_id: 5,
    },
  ],
  packaging_types: {
    id: 3,
    name: "мешочек",
  },
  product_statuses: {
    id: 3,
    name: "new",
  },
};
