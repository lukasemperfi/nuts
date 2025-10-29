import { initDropdown } from "@/shared/ui/dropdown/dropdown.js";
import { initWalnutSection } from "@/pages/catalog/sections/walnut/walnut.js";
import { initProducts } from "@/pages/catalog/sections/products/products.js";

document.addEventListener("DOMContentLoaded", () => {
  initDropdown({ selector: ".top-header__lang" });
  initWalnutSection();
  initProducts();
});
