import { initDropdown } from "@/shared/ui/dropdown/dropdown.js";
import { initHeader } from "@/widgets/header/header.js";
import { lazyLoadElements } from "@/shared/helpers/lazy-loading/lazy-loading.js";
import { initPageFooter } from "@/widgets/footer/footer.js";
import { initCheckoutSection } from "./sections/checkout-section";
import { initCheckoutPageBreadcrumbs } from "./sections/breadcrumbs/breadcrumbs";
import { baseUrl } from "@/shared/helpers/base-url";
import { store } from "@/app/store";
import { requireAuth } from "@/app/providers/auth-guard";

document.addEventListener("DOMContentLoaded", async () => {
  await requireAuth();
  requireCart();

  initDropdown({ selector: ".top-header__lang" });
  initHeader();
  initCheckoutPageBreadcrumbs();
  initCheckoutSection();
  initPageFooter();

  lazyLoadElements(".lazy", { rootMargin: "200px 0px" });
});
//TODO: Если удалить корзину через попап, то нужно делать редирект
function requireCart() {
  if (store.getState().cart.items.length === 0) {
    window.location.replace(`${baseUrl}`);
    return;
  }
  const privateContent = document.querySelector("#private-content");

  if (privateContent) {
    privateContent.removeAttribute("id");
  }
}
