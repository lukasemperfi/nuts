import { initDropdown } from "@/shared/ui/dropdown/dropdown.js";
import { initHeader } from "@/widgets/header/header.js";
import { initProducts } from "./sections/products/products.js";
import { initManufacturerSection } from "./sections/manufacturer/manufacturer.js";

document.addEventListener("DOMContentLoaded", () => {
  initDropdown(".top-header__lang");
  initHeader();
  initProducts();
  initManufacturerSection();
});
