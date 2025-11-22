import { initDropdown } from "@/shared/ui/dropdown/dropdown.js";
import { initHeader } from "@/widgets/header/header.js";
import { lazyLoadElements } from "@/shared/helpers/lazy-loading/lazy-loading.js";
import { initPageFooter } from "@/widgets/footer/footer.js";
import { initLoginPageBreadcrumbs } from "@/pages/forgot-password/sections/breadcrumbs/breadcrumbs";

document.addEventListener("DOMContentLoaded", async () => {
  initDropdown({ selector: ".top-header__lang" });
  initHeader();
  initLoginPageBreadcrumbs();
  initPageFooter();

  lazyLoadElements(".lazy", { rootMargin: "200px 0px" });
});
