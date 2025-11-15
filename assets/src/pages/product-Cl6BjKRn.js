import{a as f,i as b,b as C,l as y}from"../../footer-D1zYZNPL.js";import"../../main-bd3KtlwD.js";import{i as $}from"../../breadcrumbs-DsceW8qT.js";import{i as L,N as P}from"../../navigation-DOgKByzg.js";import{i as x}from"../../tabs-D16X6BcN.js";import{f as M}from"../../index-65y5pHuM.js";const B=()=>{$(".product-page-breadcrumbs__container","breadcrumbs_color_muted")};function D(i,e){if(!i||Object.keys(i).length===0){console.warn("⚠️ renderProductDetailsCard: пустой или неверный объект product");return}console.log("Rendering product details card:",i,e);const t=document.querySelector(e),s=H(i);t.innerHTML="",t.appendChild(s)}function H(i){const{product_images:e,title:t,sku:s,subtitle:p,composition:n,energy_value:l,energy_unit:_,shelf_life_days:u,storage_conditions:v,weight:g,weight_unit:w,packaging_types:T,discount_price:o,price:h,price_unit:d,product_statuses:V}=i,m=e?.sort((a,c)=>a.sort_order-c.sort_order),r=document.createElement("div");return r.className="product-details-card",r.innerHTML=`
  <div class="product-details-card__col-1">
      <div class="product-details-card__image-wrapper">
          <div class="swiper product-details-card-swiper">
              <div class="swiper-wrapper">
                    ${m.map((a,c)=>`
                        <div class="swiper-slide">
                            <picture>
                                <source type="image/webp" srcset="${a.image_path_webp}">
                                <img class="product-details-card-swiper__image" src="${a.image_path_png}" loading="eager" alt="image-${c}" fetchpriority="high">
                            </picture>           
                        </div>
                    `).join("")}
              </div>
          </div>
          <div class="product-details-card-swiper__next">
              <svg width="23" height="21" viewBox="0 0 23 21" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M13.4167 20.083L12.075 18.7414L19.3584 11.458H0V9.54137H19.3584L12.075 2.25801L13.4167 0.916374L23 10.4997L13.4167 20.083Z"
                      fill="none" />
              </svg>
          </div>
          <div class="product-details-card-swiper__prev">
              <svg width="23" height="23" viewBox="0 0 23 23" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M9.58332 21.083L10.925 19.7414L3.64164 12.458H23V10.5414H3.64164L10.925 3.25801L9.58332 1.91637L0 11.4997L9.58332 21.083Z"
                      fill="none" />
              </svg>
          </div>
          <div class="product-details-card__zoom zoom">
              <svg width="19" height="19" viewBox="0 0 19 19" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
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
  </div>
  <div class="product-details-card__col-2">
      <div class="product-details-card__info info">
          <div class="info__top">
              <div class="info__title">${t}</div>
              <div class="info__sku">Арт: ${s}</div>
          </div>
          <div class="info__subtitle">${p}</div>
          <div class="info__properties properties">
              <div class="properties__composition properties__title">Состав:</div>
              <div class="properties__composition properties__value">${n}</div>
              <div class="properties__weight properties__title">Масса нетто:</div>
              <div class="properties__weight properties__value">${g}${w}.</div>
              <div class="properties__energy properties__title">Энергетическая ценность:</div>
              <div class="properties__energy properties__value">${l} ${_}.</div>
              <div class="properties__shelf-life properties__title">Срок годности:</div>
              <div class="properties__shelf-life properties__value">${u} месяцев, с даты расфасовки
              (указана на упаковке)</div>
          </div>
          <div class="info__storage-conditions storage-conditions">
              <div class="storage-conditions__icon">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <circle cx="14" cy="14" r="14" fill="#93B474" />
                      <g clip-path="url(#clip0_14178_2724)">
                          <path
                              d="M14.1025 18.2978C13.1702 18.2978 12.4146 17.5424 12.4146 16.6099V7.68796C12.4146 6.7558 13.1703 6 14.1025 6C15.0345 6 15.7905 6.7558 15.7905 7.68796V16.6099C15.7906 17.5424 15.0348 18.2978 14.1025 18.2978Z"
                              fill="white" />
                          <path
                              d="M13.9942 23.0001C14.7932 23.0001 15.441 22.3523 15.441 21.5533C15.441 20.7542 14.7932 20.1064 13.9942 20.1064C13.1951 20.1064 12.5474 20.7542 12.5474 21.5533C12.5474 22.3523 13.1951 23.0001 13.9942 23.0001Z"
                              fill="white" />
                      </g>
                      <defs>
                          <clipPath id="clip0_14178_2724">
                              <rect width="21" height="21" fill="white" transform="translate(4 2)" />
                          </clipPath>
                      </defs>
                  </svg>
              </div>
              <div class="storage-conditions__text">${v}</div>
          </div>
          <div class="info__bottom">
              <div class="info__price price">
                <span class="price__label">Ваша цена:</span>
                    <span class="price__value">
                        ${o!==null?`<span class="price__current-price">
                                <span class="price-number">${o}</span>&nbsp;${d}.
                            </span>`:""}
                            <span class="${o!==null?"price__old-price":"price__current-price"}">
                                <span class="price-number">${h}</span>&nbsp;${d}.
                    </span>
                </span>
              </div>
              <a class="info__button button button_primary button_size-lg" href="#"
                  name="product-card-button" aria-label="Купить товар">
                  Заказать
              </a>
          </div>
      </div>
  </div>
    `,S(r),r}function S(i){const e=i.querySelector(".product-details-card-swiper");return e?L(e,{slidesPerView:"auto",navigation:{nextEl:i.querySelector(".product-details-card-swiper__next"),prevEl:i.querySelector(".product-details-card-swiper__prev")},modules:[P]}):null}function q(){x(document.querySelector('[data-tabs-id="product-tabs"]'),!0)}const Z=(i,e)=>{const t=document.querySelector(i);if(!t)return;const s="/nuts/";t.innerHTML=`
    <div class="product-description">
    <div class="product-description__col-1">
        <div class="product-description__image-wrapper">
            <picture>
                <source type="image/webp" srcset="${s}images/product-details/description.webp">
                <img class="product-description__image" src="${s}images/product-details/description.jpg" loading="eager" alt="Product Description Image" fetchpriority="high">
            </picture>
        </div>
    </div>
    <div class="product-description__col-2">
       ${e}
    </div>
</div>
    `},z=i=>{D(i,".product-content__card .page-container"),Z(".tabs__panel-product-tabs-1",i.description),q()};document.addEventListener("DOMContentLoaded",async()=>{const e=new URLSearchParams(window.location.search).get("id"),t=await M(e);f(),b({selector:".top-header__lang"}),B(),z(t),C(),y(".lazy",{rootMargin:"200px 0px"})});
