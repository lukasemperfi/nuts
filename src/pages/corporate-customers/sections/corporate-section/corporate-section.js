import { initTabs } from "@/shared/ui/tabs/tabs.js";
export const initCorporateSection = () => {
  const tabsContainer = document.querySelector(
    '[data-tabs-id="corporate-section__tabs"]'
  );
  initTabs(tabsContainer, true);
};
