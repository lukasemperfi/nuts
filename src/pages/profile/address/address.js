import { initDropdown } from "@/shared/ui/dropdown/dropdown.js";
import { initHeader } from "@/widgets/header/header.js";
import { lazyLoadElements } from "@/shared/helpers/lazy-loading/lazy-loading.js";
import { initPageFooter } from "@/widgets/footer/footer.js";
import { initProfilePageBreadcrumbs } from "@//pages/profile/sections/breadcrumbs/breadcrumbs";
import { initProfileSection } from "@//pages/profile/sections/profile-section/profile-section";
import { initAddressForm } from "./ui/address-form/address-form";

document.addEventListener("DOMContentLoaded", async () => {
  initDropdown({ selector: ".top-header__lang" });
  initHeader();
  initProfilePageBreadcrumbs();
  initProfileSection();
  initAddressForm();
  initPageFooter();
  lazyLoadElements(".lazy", { rootMargin: "200px 0px" });
});
