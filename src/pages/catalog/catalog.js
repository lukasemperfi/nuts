import { initDropdown } from "@/shared/ui/dropdown/dropdown.js";
import { initWalnutSection } from "@/pages/catalog/sections/walnut/walnut.js";

document.addEventListener("DOMContentLoaded", () => {
  initDropdown(".top-header__lang");
  initWalnutSection();
});
