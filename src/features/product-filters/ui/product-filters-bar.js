import { initDropdown } from "@/shared/ui/dropdown/dropdown";

export const initProductFilters = () => {
  initDropdown(".product-filters-bar__flavor-select");
  initDropdown(".product-filters-bar__weight-select");
};
