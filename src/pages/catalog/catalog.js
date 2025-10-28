import { initDropdown } from "@/shared/ui/dropdown/dropdown.js";
import { initWalnutSection } from "@/pages/catalog/sections/walnut/walnut.js";
import { initProducts } from "@/pages/catalog/sections/products/products.js";
import { store } from "@/app/store/index.js";

document.addEventListener("DOMContentLoaded", () => {
  initDropdown(".top-header__lang");
  initWalnutSection();
  initProducts();

  console.log("catalog page store state:", store.getState());
});
