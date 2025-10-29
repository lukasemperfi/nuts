import { initDropdown } from "@/shared/ui/dropdown/dropdown";

export const initProductFilters = () => {
  initDropdown({selector:".product-filters-bar__flavor-select"});
  initDropdown({selector:".product-filters-bar__weight-select"});
  initPriceButton({
    selector: ".filter-btn_price-desktop",
    onClick: (value) => console.log(value),
  });
  initPriceButton(".filter-btn_price-mobile");
};

export const initPriceButton = ({
  selector,
  defaultValue = "asc",
  onClick,
}) => {
  const button = document.querySelector(selector);
  if (!button) {
    return;
  }

  const iconAsc = button.querySelector(".filter-btn__icon_arrowUp");
  const iconDesc = button.querySelector(".filter-btn__icon_arrowDown");

  let currentValue = defaultValue;

  const updateIcons = () => {
    if (currentValue === "asc") {
      iconAsc.classList.add("filter-btn__icon_active");
      iconDesc.classList.remove("filter-btn__icon_active");
    } else {
      iconDesc.classList.add("filter-btn__icon_active");
      iconAsc.classList.remove("filter-btn__icon_active");
    }
  };

  updateIcons();

  button.addEventListener("click", () => {
    currentValue = currentValue === "asc" ? "desc" : "asc";
    updateIcons();

    if (onClick) {
      onClick(currentValue);
    }
  });
};
