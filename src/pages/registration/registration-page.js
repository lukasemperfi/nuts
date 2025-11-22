import { initDropdown } from "@/shared/ui/dropdown/dropdown.js";
import { initHeader } from "@/widgets/header/header.js";
import { lazyLoadElements } from "@/shared/helpers/lazy-loading/lazy-loading.js";
import { initPageFooter } from "@/widgets/footer/footer.js";
import { initRegistrationPageBreadcrumbs } from "@/pages/registration/sections/breadcrumbs/breadcrumbs";

document.addEventListener("DOMContentLoaded", async () => {
  initDropdown({ selector: ".top-header__lang" });
  initHeader();
  initRegistrationPageBreadcrumbs();
  initPageFooter();

  lazyLoadElements(".lazy", { rootMargin: "200px 0px" });
});
