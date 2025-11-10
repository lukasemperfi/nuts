const u={catalog:"Магазин",product:"Карточка товара"},h=(o,i="")=>{const t=document.querySelector(o);if(!t)return;console.log("mode","production");const n="/nuts/",a=window.location.pathname.split("/").filter(Boolean);a[0]===n&&a.shift();let c=n;const l=`
    <svg class="breadcrumbs__icon" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.00001 11L6.3 10.3L10.1 6.5H0V5.50002H10.1L6.3 1.7L7.00001 1.00002L12 6.00001L7.00001 11Z" fill="white" />
    </svg>
    `,m=(e,s)=>{c+=e+"/";const r=u[e]||decodeURIComponent(e.replace(/-/g," "));return s?`<li class="breadcrumbs__item">${l}<span class="breadcrumbs__link breadcrumbs__link_current">${r}</span></li>`:`<li class="breadcrumbs__item">${l}<a class="breadcrumbs__link" href="${c}" name="${r}" aria-label="${r}">${r}</a></li>`},b=`
        <ul class="breadcrumbs ${i}">
          <li class="breadcrumbs__item"><a class="breadcrumbs__link" href="/" name="breadcrumb-link" aria-label="Главная">Главная</a></li>
          ${a.map((e,s)=>m(e,s===a.length-1)).join("")}
        </ul>
      `;t.innerHTML=b};export{h as i};
