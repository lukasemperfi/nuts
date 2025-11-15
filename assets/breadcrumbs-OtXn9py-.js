const d={catalog:"Магазин",product:"Карточка товара",production:"О производстве","payment-delivery":"Оплата и доставка",gallery:"Галерея"},_=(o,m="")=>{const l=document.querySelector(o);if(!l)return;const a=window.location.pathname.split("/").filter(Boolean);let n="/nuts/";const c=n.replace(/^\/|\/$/g,"");a[0]===c&&a.shift();let s=c;console.log(s);const i=`
    <svg class="breadcrumbs__icon" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.00001 11L6.3 10.3L10.1 6.5H0V5.50002H10.1L6.3 1.7L7.00001 1.00002L12 6.00001L7.00001 11Z" fill="white" />
    </svg>
    `,b=(e,t)=>{s+=e+"/";const r=d[e]||decodeURIComponent(e.replace(/-/g," "));return t?`<li class="breadcrumbs__item">${i}<span class="breadcrumbs__link breadcrumbs__link_current">${r}</span></li>`:`<li class="breadcrumbs__item">${i}<a class="breadcrumbs__link" href="${s}" name="${r}" aria-label="${r}">${r}</a></li>`},u=`
        <ul class="breadcrumbs ${m}">
          <li class="breadcrumbs__item"><a class="breadcrumbs__link" href="${n}" name="breadcrumb-link" aria-label="Главная">Главная</a></li>
          ${a.map((e,t)=>b(e,t===a.length-1)).join("")}
        </ul>
      `;l.innerHTML=u};export{_ as i};
