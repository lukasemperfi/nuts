import { store } from "@/app/store/index.js";
import { fetchProducts } from "@/entities/product/model/products-slice.js";
import { PRODUCTS_STATUS } from "@/entities/product/model/products-slice.js";
import { createProductCard } from "@/entities/product/ui/product-card/product-card.js";

export const productList = async (containerSelector) => {
  const state = store.getState().products;

  store.subscribe("products", (newState) => {
    if (newState.status === PRODUCTS_STATUS.SUCCEEDED) {
      renderProductList(newState.items, containerSelector);
    }

    if (newState.status === PRODUCTS_STATUS.LOADING) {
      const container = document.querySelector(containerSelector);
      if (container) container.innerHTML = "<p>Loading products...</p>";
    }

    if (newState.status === PRODUCTS_STATUS.FAILED) {
      const container = document.querySelector(containerSelector);
      if (container)
        container.innerHTML = `<p style="color:red;">Error: ${newState.error}</p>`;
    }
  });

  if (state.items.length === 0 && state.status === PRODUCTS_STATUS.IDLE) {
    await fetchProducts();
  } else if (state.status === PRODUCTS_STATUS.SUCCEEDED) {
    renderProductList(state.items, containerSelector);
  }
};

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
