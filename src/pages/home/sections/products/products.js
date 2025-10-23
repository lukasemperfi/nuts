import { initSwiper } from "@/shared/lib/swiper/init-swiper.js";
import { Navigation } from "swiper/modules";
import { renderProductList } from "@/entities/products-list/products-list";

export const initProducts = () => {
  initProductCardSwiper();
  renderProductList(products, ".products__catalog");
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

const products = [
  {
    id: 1,
    images: [
      {
        src: "/images/products/product-card-image-1.png",
        alt: "product-card-image-1",
      },
      {
        src: "/images/products/product-card-image-2.png",
        alt: "product-card-image-2",
      },
      {
        src: "/images/products/product-card-image-3.png",
        alt: "product-card-image-3",
      },
      {
        src: "/images/products/product-card-image-4.png",
        alt: "product-card-image-4",
      },
      {
        src: "/images/products/product-card-image-5.png",
        alt: "product-card-image-5",
      },
      {
        src: "/images/products/product-card-image-6.png",
        alt: "product-card-image-6",
      },
    ],
    title: "Грецкий орех",
    sku: "0091",
    description: "Орех сладкий, классический, очищенный",
    weight: "40г.",
    packaging: "вакуумная",
    priceNew: "19",
    priceOld: "21",
    flag: "Акция",
  },
  {
    id: 2,
    images: [
      {
        src: "/images/products/product-card-image-1.png",
        alt: "product-card-image-1",
      },
      {
        src: "/images/products/product-card-image-2.png",
        alt: "product-card-image-2",
      },
      {
        src: "/images/products/product-card-image-3.png",
        alt: "product-card-image-3",
      },
      {
        src: "/images/products/product-card-image-4.png",
        alt: "product-card-image-4",
      },
      {
        src: "/images/products/product-card-image-5.png",
        alt: "product-card-image-5",
      },
      {
        src: "/images/products/product-card-image-6.png",
        alt: "product-card-image-6",
      },
    ],
    title: "Грецкий орех",
    sku: "0091",
    description: "Орех сладкий, классический, очищенный",
    weight: "40г.",
    packaging: "вакуумная",
    priceNew: "19",
    priceOld: null,
    flag: "Новинка",
  },
  {
    id: 3,
    images: [
      {
        src: "/images/products/product-card-image-1.png",
        alt: "product-card-image-1",
      },
      {
        src: "/images/products/product-card-image-2.png",
        alt: "product-card-image-2",
      },
      {
        src: "/images/products/product-card-image-3.png",
        alt: "product-card-image-3",
      },
      {
        src: "/images/products/product-card-image-4.png",
        alt: "product-card-image-4",
      },
      {
        src: "/images/products/product-card-image-5.png",
        alt: "product-card-image-5",
      },
      {
        src: "/images/products/product-card-image-6.png",
        alt: "product-card-image-6",
      },
    ],
    title: "Грецкий орех",
    sku: "0091",
    description: "Орех сладкий, классический, очищенный",
    weight: "40г.",
    packaging: "вакуумная",
    priceNew: "19",
    priceOld: "21",
    flag: null,
  },
  {
    id: 4,
    images: [
      {
        src: "/images/products/product-card-image-1.png",
        alt: "product-card-image-1",
      },
      {
        src: "/images/products/product-card-image-2.png",
        alt: "product-card-image-2",
      },
      {
        src: "/images/products/product-card-image-3.png",
        alt: "product-card-image-3",
      },
      {
        src: "/images/products/product-card-image-4.png",
        alt: "product-card-image-4",
      },
      {
        src: "/images/products/product-card-image-5.png",
        alt: "product-card-image-5",
      },
      {
        src: "/images/products/product-card-image-6.png",
        alt: "product-card-image-6",
      },
    ],
    title: "Грецкий орех",
    sku: "0091",
    description: "Орех сладкий, классический, очищенный",
    weight: "40г.",
    packaging: "вакуумная",
    priceNew: "19",
    priceOld: "21",
    flag: null,
  },
  {
    id: 5,
    images: [
      {
        src: "/images/products/product-card-image-1.png",
        alt: "product-card-image-1",
      },
      {
        src: "/images/products/product-card-image-2.png",
        alt: "product-card-image-2",
      },
      {
        src: "/images/products/product-card-image-3.png",
        alt: "product-card-image-3",
      },
      {
        src: "/images/products/product-card-image-4.png",
        alt: "product-card-image-4",
      },
      {
        src: "/images/products/product-card-image-5.png",
        alt: "product-card-image-5",
      },
      {
        src: "/images/products/product-card-image-6.png",
        alt: "product-card-image-6",
      },
    ],
    title: "Грецкий орех",
    sku: "0091",
    description: "Орех сладкий, классический, очищенный",
    weight: "40г.",
    packaging: "вакуумная",
    priceNew: "19",
    priceOld: "21",
    flag: null,
  },
  {
    id: 6,
    images: [
      {
        src: "/images/products/product-card-image-1.png",
        alt: "product-card-image-1",
      },
      {
        src: "/images/products/product-card-image-2.png",
        alt: "product-card-image-2",
      },
      {
        src: "/images/products/product-card-image-3.png",
        alt: "product-card-image-3",
      },
      {
        src: "/images/products/product-card-image-4.png",
        alt: "product-card-image-4",
      },
      {
        src: "/images/products/product-card-image-5.png",
        alt: "product-card-image-5",
      },
      {
        src: "/images/products/product-card-image-6.png",
        alt: "product-card-image-6",
      },
    ],
    title: "Грецкий орех",
    sku: "0091",
    description: "Орех сладкий, классический, очищенный",
    weight: "40г.",
    packaging: "вакуумная",
    priceNew: "19",
    priceOld: "21",
    flag: null,
  },
];
