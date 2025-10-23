export function createProductCard(product) {
  const {
    images,
    title,
    sku,
    description,
    weight,
    packaging,
    priceNew,
    priceOld,
    flag,
  } = product;

  const card = document.createElement("div");
  card.className = "product-card";

  card.innerHTML = `
        ${flag ? `<div class="product-card__flag">${flag}</div>` : ""}
        <div class="product-card__image-wrapper">
            <div class="swiper product-card-swiper">
                <div class="swiper-wrapper">
                    ${images
                      .map(
                        (image) => `
                        <div class="swiper-slide">
                            <img class="product-card-swiper__image" src="${image.src}" alt="${image.alt}">
                        </div>
                    `
                      )
                      .join("")}
                </div>
            </div>
            <div class="product-card-swiper__next">
                <!-- SVG next icon -->
            </div>
            <div class="product-card-swiper__prev">
                <!-- SVG prev icon -->
            </div>
            <div class="product-card__zoom">
                <!-- SVG zoom icon -->
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
                        <span class="weight__value">${weight}</span>
                    </div>
                </div>
                <div class="attributes__packaging packaging">
                    <div class="packaging__icon-wrapper">
                        <!-- SVG packaging icon -->
                    </div>
                    <div class="packaging__value-wrapper">
                        <span class="packaging__label">Упаковка:</span>
                        <span class="packaging__value">${packaging}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="product-card__bottom">
            <div class="bottom__price price">
                <span class="price__label">Цена:</span>
                <span class="price__value">
                    <span class="price__new-price">
                        <span class="price-number">${priceNew}</span>&nbsp;грн.
                    </span>
                    ${
                      priceOld
                        ? `<span class="price__old-price">
                        <span class="price-number">${priceOld}</span>&nbsp;грн.
                    </span>`
                        : ""
                    }
                </span>
            </div>
            <a class="bottom__button button button_primary button_size-sm" href="#" name="product-card-button">
                Купить
            </a>
        </div>
    `;

  return card;
}

// const product = {
//     images: [
//         { src: '/images/product1.jpg', alt: 'Product 1' },
//         { src: '/images/product2.jpg', alt: 'Product 2' }
//     ],
//     title: 'Грецкий орех',
//     sku: '0091',
//     description: 'Орех сладкий, классический, очищенный',
//     weight: '40г.',
//     packaging: 'вакуумная',
//     priceNew: '1999',
//     priceOld: '2100',
//     flag: 'Акция'
// };
