const breadcrumbNames = {
  catalog: "Магазин",
};

export const initBreadcrumbs = (containerSelector) => {
  const container = document.querySelector(containerSelector);
  if (!container) {
    return;
  }

  const basePath = import.meta.env.BASE_URL.replace(/^\/|\/$/g, "");
  const path = window.location.pathname;
  const parts = path.split("/").filter(Boolean);

  if (basePath && parts[0] === basePath) {
    parts.shift();
  }

  let currentPath = "/";

  const arrowSvg = `
    <svg class="breadcrumbs__icon" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.00001 11L6.3 10.3L10.1 6.5H0V5.50002H10.1L6.3 1.7L7.00001 1.00002L12 6.00001L7.00001 11Z" fill="white" />
    </svg>
    `;

  const createBreadcrumbItem = (part, isLast) => {
    currentPath += part + "/";
    const name =
      breadcrumbNames[part] || decodeURIComponent(part.replace(/-/g, " "));

    if (isLast) {
      return `<li class="breadcrumbs__item">${arrowSvg}<span class="breadcrumbs__link breadcrumbs__link_current">${name}</span></li>`;
    } else {
      return `<li class="breadcrumbs__item">${arrowSvg}<a class="breadcrumbs__link" href="${currentPath}" name="${name}" aria-label="${name}">${name}</a></li>`;
    }
  };

  const html = `
        <ul class="breadcrumbs">
          <li class="breadcrumbs__item"><a class="breadcrumbs__link" href="/" name="breadcrumb-link" aria-label="Главная">Главная</a></li>
          ${parts
            .map((part, index) =>
              createBreadcrumbItem(part, index === parts.length - 1)
            )
            .join("")}
        </ul>
      `;

  container.innerHTML = html;
};
