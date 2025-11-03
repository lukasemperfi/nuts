import { initDropdown } from "@/shared/ui/dropdown/dropdown.js";
import { initHeader } from "@/widgets/header/header.js";
import { initProducts } from "./sections/products/products.js";
import { initManufacturerSection } from "./sections/manufacturer/manufacturer.js";
import { initNewsSection } from "@/widgets/news-section/news-section.js";
import { initHero } from "./sections/hero/hero.js";
import { initGoal } from "./sections/goal/goal.js";
// import { initLazyImages } from "@/shared/helpers/lazy-loading/lazy-loading.js";
import { lazyLoadElements } from "@/shared/helpers/lazy-loading/lazy-loading.js";

document.addEventListener("DOMContentLoaded", async () => {
  initDropdown({ selector: ".top-header__lang" });
  initHeader();
  initProducts();
  initManufacturerSection();
  initNewsSection();
  initHero();
  initGoal();

  lazyLoadElements(".lazy", { rootMargin: "200px 0px" });

  // initLazyImages();
});
