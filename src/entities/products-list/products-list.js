import { createProductCard } from "@/entities/product-card/product-card.js";

export function renderProductList(products, containerSelector) {
  const mainContainer = document.querySelector(containerSelector);

  if (!mainContainer) {
    console.error(
      `Ошибка: Основной контейнер с селектором "${containerSelector}" не найден.`
    );
    return;
  }

  mainContainer.innerHTML = "";

  const catalogDiv = document.createElement("div");
  catalogDiv.className = "catalog";

  products.forEach((product) => {
    const card = createProductCard(product);
    catalogDiv.appendChild(card);
  });

  mainContainer.appendChild(catalogDiv);
}
