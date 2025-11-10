import { renderProductDetailsCard } from "@/entities/product/ui/product-card/product-details-card.js";
import { initProductTabs } from "@/pages/product/product-tabs/product-tabs.js";
import { fetchProductById } from "@/entities/product/model/product-slice.js";
import { renderProductDescription } from "../../ui/product-description/product-description";

export const initProductContent = async () => {
  const product = await fetchProductById(1);

  renderProductDetailsCard(product, ".product-content__card .page-container");
  renderProductDescription(".tabs__panel-product-tabs-1", product.description);

  initProductTabs();
};
