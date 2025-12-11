const d={catalog:"Магазин",product:"Карточка товара",production:"О производстве","payment-delivery":"Оплата и доставка",gallery:"Галерея","corporate-customers":"Оптовым и корпоративным клиентам",news:"Новости и статьи",contacts:"Контакты","one-news":"Новости и статьи",login:"Вход","forgot-password":"Восстановление пароля",registration:"Регистрация",checkout:"Оформление заказа",profile:"Личный кабинет",orders:"История заказов"},p=(i,m="")=>{const t=document.querySelector(i);if(!t)return;const r=window.location.pathname.split("/").filter(Boolean);let n="/nuts/";const c=n.replace(/^\/|\/$/g,"");r[0]===c&&r.shift();let l=c;const o=`
    <svg class="breadcrumbs__icon" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.00001 11L6.3 10.3L10.1 6.5H0V5.50002H10.1L6.3 1.7L7.00001 1.00002L12 6.00001L7.00001 11Z" fill="white" />
    </svg>
    `,b=(e,s)=>{l+=e+"/";const a=d[e]||decodeURIComponent(e.replace(/-/g," "));return s?`<li class="breadcrumbs__item">${o}<span class="breadcrumbs__link breadcrumbs__link_current">${a}</span></li>`:`<li class="breadcrumbs__item">${o}<a class="breadcrumbs__link" href="${l}" name="${a}" aria-label="${a}">${a}</a></li>`},u=`
        <ul class="breadcrumbs ${m}">
          <li class="breadcrumbs__item"><a class="breadcrumbs__link" href="${n}" name="breadcrumb-link" aria-label="Главная">Главная</a></li>
          ${r.map((e,s)=>b(e,s===r.length-1)).join("")}
        </ul>
      `;t.innerHTML=u};export{p as i};
