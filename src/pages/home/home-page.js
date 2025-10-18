import { initDropdown } from "@/shared/ui/dropdown/dropdown.js";
import { initHeader } from "@/widgets/header/header.js";

document.addEventListener("DOMContentLoaded", () => {
  initDropdown(".top-header__lang");
  initHeader();
});
