import { initDropdown } from "@/shared/ui/dropdown/dropdown.js";
import { initHeader } from "@/widgets/header/header.js";
import { initGoal } from "@/pages/home/sections/goal/goal.js";
import { lazyLoadElements } from "@/shared/helpers/lazy-loading/lazy-loading.js";
import { initPageFooter } from "@/widgets/footer/footer.js";

document.addEventListener("DOMContentLoaded", async () => {
  initDropdown({ selector: ".top-header__lang" });
  initHeader();
  initGoal();
  initPageFooter();

  lazyLoadElements(".lazy", { rootMargin: "200px 0px" });
});
