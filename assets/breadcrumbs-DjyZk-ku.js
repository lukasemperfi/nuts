const d={catalog:"Магазин",product:"Карточка товара",production:"О производстве","payment-delivery":"Оплата и доставка",gallery:"Галерея","corporate-customers":"Оптовым и корпоративным клиентам",news:"Новости и статьи",contacts:"Контакты","one-news":"Новости и статьи"},_=(i,m="")=>{const n=document.querySelector(i);if(!n)return;const a=window.location.pathname.split("/").filter(Boolean);let c="/nuts/";const l=c.replace(/^\/|\/$/g,"");a[0]===l&&a.shift();let s=l;console.log(s);const o=`
    <svg class="breadcrumbs__icon" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.00001 11L6.3 10.3L10.1 6.5H0V5.50002H10.1L6.3 1.7L7.00001 1.00002L12 6.00001L7.00001 11Z" fill="white" />
    </svg>
    `,b=(e,t)=>{s+=e+"/";const r=d[e]||decodeURIComponent(e.replace(/-/g," "));return t?`<li class="breadcrumbs__item">${o}<span class="breadcrumbs__link breadcrumbs__link_current">${r}</span></li>`:`<li class="breadcrumbs__item">${o}<a class="breadcrumbs__link" href="${s}" name="${r}" aria-label="${r}">${r}</a></li>`},u=`
        <ul class="breadcrumbs ${m}">
          <li class="breadcrumbs__item"><a class="breadcrumbs__link" href="${c}" name="breadcrumb-link" aria-label="Главная">Главная</a></li>
          ${a.map((e,t)=>b(e,t===a.length-1)).join("")}
        </ul>
      `;n.innerHTML=u};export{_ as i};
