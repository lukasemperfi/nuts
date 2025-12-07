import { initDropdown } from "@/shared/ui/dropdown/dropdown.js";
import { initHeader } from "@/widgets/header/header.js";
import { lazyLoadElements } from "@/shared/helpers/lazy-loading/lazy-loading.js";
import { initPageFooter } from "@/widgets/footer/footer.js";
import { initCheckoutSection } from "./sections/checkout-section";
import { initCheckoutPageBreadcrumbs } from "./sections/breadcrumbs/breadcrumbs";

document.addEventListener("DOMContentLoaded", async () => {
  initDropdown({ selector: ".top-header__lang" });
  initHeader();
  initCheckoutPageBreadcrumbs();
  initCheckoutSection();

  initPageFooter();

  lazyLoadElements(".lazy", { rootMargin: "200px 0px" });
});
