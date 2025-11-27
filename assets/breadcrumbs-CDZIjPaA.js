const d={catalog:"Магазин",product:"Карточка товара",production:"О производстве","payment-delivery":"Оплата и доставка",gallery:"Галерея","corporate-customers":"Оптовым и корпоративным клиентам",news:"Новости и статьи",contacts:"Контакты","one-news":"Новости и статьи",login:"Вход","forgot-password":"Восстановление пароля",registration:"Регистрация"},p=(o,m="")=>{const t=document.querySelector(o);if(!t)return;const a=window.location.pathname.split("/").filter(Boolean);let n="/nuts/";const c=n.replace(/^\/|\/$/g,"");a[0]===c&&a.shift();let l=c;const i=`
    <svg class="breadcrumbs__icon" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.00001 11L6.3 10.3L10.1 6.5H0V5.50002H10.1L6.3 1.7L7.00001 1.00002L12 6.00001L7.00001 11Z" fill="white" />
    </svg>
    `,b=(e,s)=>{l+=e+"/";const r=d[e]||decodeURIComponent(e.replace(/-/g," "));return s?`<li class="breadcrumbs__item">${i}<span class="breadcrumbs__link breadcrumbs__link_current">${r}</span></li>`:`<li class="breadcrumbs__item">${i}<a class="breadcrumbs__link" href="${l}" name="${r}" aria-label="${r}">${r}</a></li>`},u=`
        <ul class="breadcrumbs ${m}">
          <li class="breadcrumbs__item"><a class="breadcrumbs__link" href="${n}" name="breadcrumb-link" aria-label="Главная">Главная</a></li>
          ${a.map((e,s)=>b(e,s===a.length-1)).join("")}
        </ul>
      `;t.innerHTML=u};export{p as i};
