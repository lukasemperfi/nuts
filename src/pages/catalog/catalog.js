import { initDropdown } from "@/shared/ui/dropdown/dropdown.js";
import { initWalnutSection } from "@/pages/catalog/sections/walnut/walnut.js";
import { initProductsSection } from "@/pages/catalog/sections/products/products.js";
import { initHeroSection } from "./sections/hero/hero";
import { lazyLoadElements } from "@/shared/helpers/lazy-loading/lazy-loading.js";

document.addEventListener("DOMContentLoaded", () => {
  initDropdown({ selector: ".top-header__lang" });
  initHeroSection();
  initWalnutSection();
  initProductsSection();

  lazyLoadElements(".lazy", { rootMargin: "200px 0px" });
});
