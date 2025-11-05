import { initDropdown } from "@/shared/ui/dropdown/dropdown.js";
import { initHeader } from "@/widgets/header/header.js";
import { initPageFooter } from "@/widgets/footer/footer.js";
import { lazyLoadElements } from "@/shared/helpers/lazy-loading/lazy-loading.js";
import { initProductPageBreadcrumbs } from "@/pages/product/ui/breadcrumbs/breadcrumbs.js";

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initDropdown({ selector: ".top-header__lang" });
  initProductPageBreadcrumbs();
  initPageFooter();
  lazyLoadElements(".lazy", { rootMargin: "200px 0px" });
});
