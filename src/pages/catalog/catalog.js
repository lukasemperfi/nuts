import { initDropdown } from "@/shared/ui/dropdown/dropdown.js";
import { initWalnutSection } from "@/pages/catalog/sections/walnut/walnut.js";
import { initProducts } from "@/pages/catalog/sections/products/products.js";
import { initHeroSection } from "./sections/hero/hero";

document.addEventListener("DOMContentLoaded", () => {
  initDropdown({ selector: ".top-header__lang" });
  initHeroSection();
  initWalnutSection();
  // initProducts();
});
