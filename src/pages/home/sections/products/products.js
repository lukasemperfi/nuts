// import { renderProductList } from "@/entities/products-list/products-list";

import { productList } from "@/entities/product/ui/product-list/product-list";

export const initProducts = () => {
  // renderProductList(products, ".products__catalog");
  productList(".products__catalog");
};

const products = [
  {
    id: 1,
    images: [
      {
        src: "/nuts/images/products/product-card-image-1.png",
        alt: "product-card-image-1",
      },
      {
        src: "/nuts/images/products/product-card-image-2.png",
        alt: "product-card-image-2",
      },
      {
        src: "/nuts/images/products/product-card-image-3.png",
        alt: "product-card-image-3",
      },
      {
        src: "/nuts/images/products/product-card-image-4.png",
        alt: "product-card-image-4",
      },
      {
        src: "/nuts/images/products/product-card-image-5.png",
        alt: "product-card-image-5",
      },
      {
        src: "/nuts/images/products/product-card-image-6.png",
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
        src: "/nuts/images/products/product-card-image-1.png",
        alt: "product-card-image-1",
      },
      {
        src: "/nuts/images/products/product-card-image-2.png",
        alt: "product-card-image-2",
      },
      {
        src: "/nuts/images/products/product-card-image-3.png",
        alt: "product-card-image-3",
      },
      {
        src: "/nuts/images/products/product-card-image-4.png",
        alt: "product-card-image-4",
      },
      {
        src: "/nuts/images/products/product-card-image-5.png",
        alt: "product-card-image-5",
      },
      {
        src: "/nuts/images/products/product-card-image-6.png",
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
        src: "/nuts/images/products/product-card-image-1.png",
        alt: "product-card-image-1",
      },
      {
        src: "/nuts/images/products/product-card-image-2.png",
        alt: "product-card-image-2",
      },
      {
        src: "/nuts/images/products/product-card-image-3.png",
        alt: "product-card-image-3",
      },
      {
        src: "/nuts/images/products/product-card-image-4.png",
        alt: "product-card-image-4",
      },
      {
        src: "/nuts/images/products/product-card-image-5.png",
        alt: "product-card-image-5",
      },
      {
        src: "/nuts/images/products/product-card-image-6.png",
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
        src: "/nuts/images/products/product-card-image-1.png",
        alt: "product-card-image-1",
      },
      {
        src: "/nuts/images/products/product-card-image-2.png",
        alt: "product-card-image-2",
      },
      {
        src: "/nuts/images/products/product-card-image-3.png",
        alt: "product-card-image-3",
      },
      {
        src: "/nuts/images/products/product-card-image-4.png",
        alt: "product-card-image-4",
      },
      {
        src: "/nuts/images/products/product-card-image-5.png",
        alt: "product-card-image-5",
      },
      {
        src: "/nuts/images/products/product-card-image-6.png",
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
        src: "/nuts/images/products/product-card-image-1.png",
        alt: "product-card-image-1",
      },
      {
        src: "/nuts/images/products/product-card-image-2.png",
        alt: "product-card-image-2",
      },
      {
        src: "/nuts/images/products/product-card-image-3.png",
        alt: "product-card-image-3",
      },
      {
        src: "/nuts/images/products/product-card-image-4.png",
        alt: "product-card-image-4",
      },
      {
        src: "/nuts/images/products/product-card-image-5.png",
        alt: "product-card-image-5",
      },
      {
        src: "/nuts/images/products/product-card-image-6.png",
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
        src: "/nuts/images/products/product-card-image-1.png",
        alt: "product-card-image-1",
      },
      {
        src: "/nuts/images/products/product-card-image-2.png",
        alt: "product-card-image-2",
      },
      {
        src: "/nuts/images/products/product-card-image-3.png",
        alt: "product-card-image-3",
      },
      {
        src: "/nuts/images/products/product-card-image-4.png",
        alt: "product-card-image-4",
      },
      {
        src: "/nuts/images/products/product-card-image-5.png",
        alt: "product-card-image-5",
      },
      {
        src: "/nuts/images/products/product-card-image-6.png",
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
