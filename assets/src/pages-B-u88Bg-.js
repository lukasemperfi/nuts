import{i as d,N as o,a as _}from"../navigation-B7lrwbkm.js";function v(){w(),f()}function w(){const e=document.querySelector(".middle-header__burger-btn"),a=document.querySelector(".mobile-menu"),r=document.querySelector(".mobile-menu__close");!e||!a||(e.addEventListener("click",function(){const c=a.classList.toggle("is-open");e.setAttribute("aria-expanded",c?"true":"false"),document.body.style.overflow=c?"hidden":"auto"}),r&&r.addEventListener("click",()=>{a.classList.remove("is-open"),e.setAttribute("aria-expanded","false"),document.body.style.overflow="auto"}))}function f(){const e=document.querySelector(".mobile-menu"),a=document.querySelector(".middle-header__burger-btn");!e||!a||window.addEventListener("resize",function(){e.classList.contains("is-open")&&(e.classList.remove("is-open"),a.setAttribute("aria-expanded","false"),document.body.style.overflow="auto")})}function h(e){const{images:a,title:r,sku:c,description:t,weight:s,packaging:g,priceNew:m,priceOld:p,flag:n}=e,i=document.createElement("div");return i.className="product-card",i.innerHTML=`
        ${n?`<div class="product-card__flag">${n}</div>`:""}
        <div class="product-card__image-wrapper">
            <div class="swiper product-card-swiper">
                <div class="swiper-wrapper">
                    ${a.map(u=>`
                        <div class="swiper-slide">
                            <img class="product-card-swiper__image" src="${u.src}" alt="${u.alt}">
                        </div>
                    `).join("")}
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
            <a class="product-card__title" href="#" name="product-card-title">${r}</a>
            <div class="product-card__sku sku">
                <span class="sku__label">Арт:</span>
                <span class="sku__value">${c}</span>
            </div>
            <div class="product-card__description">${t}</div>
            <div class="product-card__attributes">
                <div class="attributes__weight weight">
                    <div class="weight__icon-wrapper">
                        <!-- SVG weight icon -->
                    </div>
                    <div class="weight__value-wrapper">
                        <span class="weight__label">Масса:</span>
                        <span class="weight__value">${s}</span>
                    </div>
                </div>
                <div class="attributes__packaging packaging">
                    <div class="packaging__icon-wrapper">
                        <!-- SVG packaging icon -->
                    </div>
                    <div class="packaging__value-wrapper">
                        <span class="packaging__label">Упаковка:</span>
                        <span class="packaging__value">${g}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="product-card__bottom">
            <div class="bottom__price price">
                <span class="price__label">Цена:</span>
                <span class="price__value">
                    <span class="price__new-price">
                        <span class="price-number">${m}</span>&nbsp;грн.
                    </span>
                    ${p?`<span class="price__old-price">
                        <span class="price-number">${p}</span>&nbsp;грн.
                    </span>`:""}
                </span>
            </div>
            <a class="bottom__button button button_primary button_size-sm" href="#" name="product-card-button">
                Купить
            </a>
        </div>
    `,b(i),i}function b(e){const a=e.querySelector(".product-card-swiper");return a?d(a,{slidesPerView:1,navigation:{nextEl:e.querySelector(".product-card-swiper__next"),prevEl:e.querySelector(".product-card-swiper__prev")},modules:[o]}):null}function y(e,a){const r=document.querySelector(a);if(!r){console.error(`Ошибка: Основной контейнер с селектором "${a}" не найден.`);return}r.innerHTML="";const c=document.createElement("div");c.className="catalog",e.forEach(t=>{const s=h(t);c.appendChild(s)}),r.appendChild(c)}const k=()=>{y(L,".products__catalog")},L=[{id:1,images:[{src:"/images/products/product-card-image-1.png",alt:"product-card-image-1"},{src:"/images/products/product-card-image-2.png",alt:"product-card-image-2"},{src:"/images/products/product-card-image-3.png",alt:"product-card-image-3"},{src:"/images/products/product-card-image-4.png",alt:"product-card-image-4"},{src:"/images/products/product-card-image-5.png",alt:"product-card-image-5"},{src:"/images/products/product-card-image-6.png",alt:"product-card-image-6"}],title:"Грецкий орех",sku:"0091",description:"Орех сладкий, классический, очищенный",weight:"40г.",packaging:"вакуумная",priceNew:"19",priceOld:"21",flag:"Акция"},{id:2,images:[{src:"/images/products/product-card-image-1.png",alt:"product-card-image-1"},{src:"/images/products/product-card-image-2.png",alt:"product-card-image-2"},{src:"/images/products/product-card-image-3.png",alt:"product-card-image-3"},{src:"/images/products/product-card-image-4.png",alt:"product-card-image-4"},{src:"/images/products/product-card-image-5.png",alt:"product-card-image-5"},{src:"/images/products/product-card-image-6.png",alt:"product-card-image-6"}],title:"Грецкий орех",sku:"0091",description:"Орех сладкий, классический, очищенный",weight:"40г.",packaging:"вакуумная",priceNew:"19",priceOld:null,flag:"Новинка"},{id:3,images:[{src:"/images/products/product-card-image-1.png",alt:"product-card-image-1"},{src:"/images/products/product-card-image-2.png",alt:"product-card-image-2"},{src:"/images/products/product-card-image-3.png",alt:"product-card-image-3"},{src:"/images/products/product-card-image-4.png",alt:"product-card-image-4"},{src:"/images/products/product-card-image-5.png",alt:"product-card-image-5"},{src:"/images/products/product-card-image-6.png",alt:"product-card-image-6"}],title:"Грецкий орех",sku:"0091",description:"Орех сладкий, классический, очищенный",weight:"40г.",packaging:"вакуумная",priceNew:"19",priceOld:"21",flag:null},{id:4,images:[{src:"/images/products/product-card-image-1.png",alt:"product-card-image-1"},{src:"/images/products/product-card-image-2.png",alt:"product-card-image-2"},{src:"/images/products/product-card-image-3.png",alt:"product-card-image-3"},{src:"/images/products/product-card-image-4.png",alt:"product-card-image-4"},{src:"/images/products/product-card-image-5.png",alt:"product-card-image-5"},{src:"/images/products/product-card-image-6.png",alt:"product-card-image-6"}],title:"Грецкий орех",sku:"0091",description:"Орех сладкий, классический, очищенный",weight:"40г.",packaging:"вакуумная",priceNew:"19",priceOld:"21",flag:null},{id:5,images:[{src:"/images/products/product-card-image-1.png",alt:"product-card-image-1"},{src:"/images/products/product-card-image-2.png",alt:"product-card-image-2"},{src:"/images/products/product-card-image-3.png",alt:"product-card-image-3"},{src:"/images/products/product-card-image-4.png",alt:"product-card-image-4"},{src:"/images/products/product-card-image-5.png",alt:"product-card-image-5"},{src:"/images/products/product-card-image-6.png",alt:"product-card-image-6"}],title:"Грецкий орех",sku:"0091",description:"Орех сладкий, классический, очищенный",weight:"40г.",packaging:"вакуумная",priceNew:"19",priceOld:"21",flag:null},{id:6,images:[{src:"/images/products/product-card-image-1.png",alt:"product-card-image-1"},{src:"/images/products/product-card-image-2.png",alt:"product-card-image-2"},{src:"/images/products/product-card-image-3.png",alt:"product-card-image-3"},{src:"/images/products/product-card-image-4.png",alt:"product-card-image-4"},{src:"/images/products/product-card-image-5.png",alt:"product-card-image-5"},{src:"/images/products/product-card-image-6.png",alt:"product-card-image-6"}],title:"Грецкий орех",sku:"0091",description:"Орех сладкий, классический, очищенный",weight:"40г.",packaging:"вакуумная",priceNew:"19",priceOld:"21",flag:null}],S=()=>{q(),C(".manufacturer__card")};function q(){return d(".manufacturer-slider",{slidesPerView:"auto",navigation:{nextEl:".manufacturer-slider__next",prevEl:".manufacturer-slider__prev"},modules:[o]})}const C=e=>{document.querySelectorAll(e).forEach(r=>{const c=r.querySelector(".card__button"),t=r.querySelector(".card__video");!c||!t||(t.addEventListener("click",()=>{t.paused?t.play():t.pause()}),c.addEventListener("click",()=>{t.src||(t.src=t.dataset.src),r.classList.add("card_playing"),t.play(),E(r)}))})};function E(e){document.querySelectorAll(".manufacturer__card").forEach(a=>{a!==e&&a.querySelector(".card__video").pause()})}const x=()=>{B()};function B(){return d(".news-section-slider",{slidesPerView:"1",spaceBetween:12,navigation:{nextEl:".news-section-slider__next",prevEl:".news-section-slider__prev"},modules:[o],breakpoints:{500:{slidesPerView:"2",spaceBetween:12},660:{slidesPerView:"3",spaceBetween:12},768:{slidesPerView:"3",spaceBetween:24},1338:{slidesPerView:"3",spaceBetween:33}}})}const l=e=>{const a=document.querySelector(e),r=a.querySelector(".banner__button"),c=a.querySelector(".banner__video");r.addEventListener("click",()=>{c.src||(c.src=c.dataset.src),a.classList.add("banner_playing"),c.play()})},P=()=>{l(".hero__banner")},$=()=>{l(".goal__banner")};document.addEventListener("DOMContentLoaded",()=>{_(".top-header__lang"),v(),k(),S(),x(),P(),$()});
