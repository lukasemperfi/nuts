import { initProductFilters } from "@/features/product-filters/ui/product-filters-bar";
import { productList } from "@/entities/product/ui/product-list/product-list";

export const initProducts = () => {
  initProductFilters();
  productList(".products__catalog");
};
