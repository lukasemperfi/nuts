import { initDropdown } from "@/shared/ui/dropdown/dropdown";

export const initProductFilters = () => {
  const flavorSelect = initDropdown({
    selector: ".product-filters-bar__flavor-select",
    onChange: (value) => console.log(value),
  });

  const weightSelect = initDropdown({
    selector: ".product-filters-bar__weight-select",
    onChange: (value) => console.log(value),
  });

  const desktopPriceButton = initPriceButton({
    selector: ".filter-btn_price-desktop",
    onClick: (value) => console.log(value),
  });

  const mobilePriceButton = initPriceButton({
    selector: ".filter-btn_price-mobile",
    onClick: (value) => console.log(value),
  });

  initResetButton({
    selector: ".filter-actions__reset-btn",
    onClick: () => {
      flavorSelect.reset();
      weightSelect.reset();
      desktopPriceButton.reset();
      mobilePriceButton.reset();
    },
  });
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

  const reset = () => {
    currentValue = defaultValue;
    updateIcons();
  };

  return {
    reset,
  };
};

export const initResetButton = ({ selector, onClick }) => {
  const resetButton = document.querySelector(selector);
  if (!resetButton) {
    return;
  }

  resetButton.addEventListener("click", () => {
    if (onClick) {
      onClick();
    }
  });
};
