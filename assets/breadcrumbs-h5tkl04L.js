const u={catalog:"Магазин",product:"Карточка товара"},_=(i,o="")=>{const c=document.querySelector(i);if(!c)return;const s="/nuts/".replace(/^\/|\/$/g,""),a=window.location.pathname.split("/").filter(Boolean);s&&a[0]===s&&a.shift();let n=s;const l=`
    <svg class="breadcrumbs__icon" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.00001 11L6.3 10.3L10.1 6.5H0V5.50002H10.1L6.3 1.7L7.00001 1.00002L12 6.00001L7.00001 11Z" fill="white" />
    </svg>
    `,b=(e,t)=>{n+=e+"/";const r=u[e]||decodeURIComponent(e.replace(/-/g," "));return t?`<li class="breadcrumbs__item">${l}<span class="breadcrumbs__link breadcrumbs__link_current">${r}</span></li>`:`<li class="breadcrumbs__item">${l}<a class="breadcrumbs__link" href="${n}" name="${r}" aria-label="${r}">${r}</a></li>`},m=`
        <ul class="breadcrumbs ${o}">
          <li class="breadcrumbs__item"><a class="breadcrumbs__link" href="/" name="breadcrumb-link" aria-label="Главная">Главная</a></li>
          ${a.map((e,t)=>b(e,t===a.length-1)).join("")}
        </ul>
      `;c.innerHTML=m};export{_ as i};
