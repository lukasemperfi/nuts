import { initSwiper } from "@/shared/lib/swiper/init-swiper.js";
import { Navigation } from "swiper/modules";

export function createProductCard(product) {
  const {
    product_images,
    title,
    sku,
    description,
    weight,
    weight_unit,
    packaging_types,
    discount_price,
    price,
    price_unit,
    product_statuses,
  } = product;

  const images = product_images.sort((a, b) => a.sort_order - b.sort_order);
  const statuses = {
    regular: {
      name: "regular",
      class: "",
    },
    sale: {
      name: "Акция",
      class: "product-card__status_sale",
    },
    new: {
      name: "Новинка",
      class: "product-card__status_new",
    },
  };

  const card = document.createElement("div");
  card.className = "product-card";

  card.innerHTML = `
        ${
          product_statuses.name !== "regular"
            ? `<div class="product-card__status ${
                statuses[product_statuses.name].class
              }">${statuses[product_statuses.name].name}</div>`
            : ""
        }
        <div class="product-card__image-wrapper">
            <div class="swiper product-card-swiper">
                <div class="swiper-wrapper">
                    ${images
                      .map(
                        (image, index) => `
                        <div class="swiper-slide">
                            <picture>
                                <source type="image/webp" srcset="${image.image_path_webp}">
                                <img class="product-card-swiper__image" src="${image.image_path_png}" loading="lazy" alt="image-${index}" >
                            </picture>           
                        </div>
                    `
                      )
                      .join("")}
                </div>
            </div>
            <div class="product-card-swiper__next">
            <svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M13.4167 20.083L12.075 18.7414L19.3584 11.458H0V9.54137H19.3584L12.075 2.25801L13.4167 0.916374L23 10.4997L13.4167 20.083Z"
                fill="none" />
        </svg>
            </div>
            <div class="product-card-swiper__prev">
            <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M9.58332 21.083L10.925 19.7414L3.64164 12.458H23V10.5414H3.64164L10.925 3.25801L9.58332 1.91637L0 11.4997L9.58332 21.083Z"
                fill="none" />
        </svg>
            </div>
            <div class="product-card__zoom">
                
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_241_161)">
                <path
                    d="M18.3691 17.3004L13.9977 12.9289C15.0813 11.6078 15.7344 9.91562 15.7344 8.07129C15.7344 3.84082 12.3018 0.408203 8.07129 0.408203C3.83711 0.408203 0.408203 3.84082 0.408203 8.07129C0.408203 12.3018 3.83711 15.7344 8.07129 15.7344C9.91562 15.7344 11.6041 15.085 12.9252 14.0014L17.2967 18.3691C17.5936 18.666 18.0723 18.666 18.3691 18.3691C18.666 18.076 18.666 17.5936 18.3691 17.3004ZM8.07129 14.2092C4.6832 14.2092 1.92969 11.4557 1.92969 8.07129C1.92969 4.68691 4.6832 1.92969 8.07129 1.92969C11.4557 1.92969 14.2129 4.68691 14.2129 8.07129C14.2129 11.4557 11.4557 14.2092 8.07129 14.2092Z"
                    fill="white" />
            </g>
            <defs>
                <clipPath>
                    <rect width="19" height="19" fill="white" />
                </clipPath>
            </defs>
        </svg>
            </div>
        </div>
        <div class="product-card__middle">
            <a class="product-card__title" href="#" name="product-card-title">${title}</a>
            <div class="product-card__sku sku">
                <span class="sku__label">Арт:</span>
                <span class="sku__value">${sku}</span>
            </div>
            <div class="product-card__description">${description}</div>
            <div class="product-card__attributes">
                <div class="attributes__weight weight">
                    <div class="weight__icon-wrapper">
                        <!-- SVG weight icon -->
                    </div>
                    <div class="weight__value-wrapper">
                        <span class="weight__label">Масса:</span>
                        <span class="weight__value">${weight}${weight_unit}.</span>
                    </div>
                </div>
                <div class="attributes__packaging packaging">
                    <div class="packaging__icon-wrapper">
                        <!-- SVG packaging icon -->
                    </div>
                    <div class="packaging__value-wrapper">
                        <span class="packaging__label">Упаковка:</span>
                        <span class="packaging__value">${
                          packaging_types.name
                        }</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="product-card__bottom">
            <div class="bottom__price price">
                <span class="price__label">Цена:</span>
                <span class="price__value">
                ${
                  discount_price !== null
                    ? `<span class="price__current-price">
                      <span class="price-number">${discount_price}</span>&nbsp;${price_unit}.
                  </span>`
                    : ""
                }
                    <span class="${
                      discount_price !== null
                        ? "price__old-price"
                        : "price__current-price"
                    }">
                        <span class="price-number">${price}</span>&nbsp;${price_unit}.
                    </span>
                </span>
            </div>
            <a class="bottom__button button button_primary button_size-sm" href="#" name="product-card-button">
                Купить
            </a>
        </div>
    `;

  initProductCardSwiper(card);

  return card;
}

function initProductCardSwiper(cardElement) {
  const swiperEl = cardElement.querySelector(".product-card-swiper");

  if (!swiperEl) return null;

  return initSwiper(swiperEl, {
    slidesPerView: 1,
    navigation: {
      nextEl: cardElement.querySelector(".product-card-swiper__next"),
      prevEl: cardElement.querySelector(".product-card-swiper__prev"),
    },
    modules: [Navigation],
  });
}
