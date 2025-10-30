import { initDropdown } from "@/shared/ui/dropdown/dropdown";

export const initProductFilters = () => {
  let filters = {
    weight: [],
    flavor: [],
    price: null,
  };

  loadFiltersFromURL();

  function updateFilter(type, value) {
    if (type === "price") {
      filters.price = value;
      updateURL();
      console.log(filters);
      return;
    }

    const arr = filters[type];

    if (arr.includes(value)) {
      filters[type] = arr.filter((v) => v !== value);
    } else {
      filters[type].push(value);
    }

    updateURL();

    console.log(filters);
  }

  function resetFilters() {
    filters.weight = [];
    filters.flavor = [];
    filters.price = null;

    resetURL();
  }

  function updateURL() {
    const params = new URLSearchParams();

    filters.weight.forEach((val) => params.append("weight", val));

    filters.flavor.forEach((val) => params.append("flavor", val));

    if (filters.price) {
      params.set("price", filters.price);
    }

    const newUrl =
      window.location.pathname +
      (params.toString() ? `?${params.toString()}` : "");

    window.history.replaceState({}, "", newUrl);
  }

  function resetURL() {
    const newUrl = window.location.pathname;
    window.history.replaceState({}, "", newUrl);

    console.log("Фильтры сброшены:", filters);
  }

  function loadFiltersFromURL() {
    const params = new URLSearchParams(window.location.search);

    filters.weight = params.getAll("weight");
    filters.flavor = params.getAll("flavor");
    filters.price = params.get("price") || null;
  }

  const flavorSelect = initDropdown({
    selector: ".product-filters-bar__flavor-select",
    onChange: (type, value) => updateFilter(type, value),
    defaultValues: [...filters.flavor],
  });

  const weightSelect = initDropdown({
    selector: ".product-filters-bar__weight-select",
    onChange: (type, value) => updateFilter(type, value),
    defaultValues: [...filters.weight],
  });

  const desktopPriceButton = initPriceButton({
    selector: ".filter-btn_price-desktop",
    onClick: (type, value) => updateFilter(type, value),
    defaultValue: filters.price,
  });

  const mobilePriceButton = initPriceButton({
    selector: ".filter-btn_price-mobile",
    onClick: (type, value) => updateFilter(type, value),
    defaultValue: filters.price,
  });

  initResetButton({
    selector: ".filter-actions__reset-btn",
    onClick: () => {
      flavorSelect.reset();
      weightSelect.reset();
      desktopPriceButton.reset();
      mobilePriceButton.reset();
      resetFilters();
      console.log(filters);
    },
  });
};

export const initPriceButton = ({ selector, defaultValue, onClick }) => {
  const button = document.querySelector(selector);
  if (!button) {
    return;
  }

  const iconAsc = button.querySelector(".filter-btn__icon_arrowUp");
  const iconDesc = button.querySelector(".filter-btn__icon_arrowDown");

  let currentValue = defaultValue || null;

  const updateIcons = () => {
    if (currentValue === "asc") {
      iconAsc.classList.add("filter-btn__icon_active");
      iconDesc.classList.remove("filter-btn__icon_active");
    } else if (currentValue === "desc") {
      iconDesc.classList.add("filter-btn__icon_active");
      iconAsc.classList.remove("filter-btn__icon_active");
    } else {
      iconAsc.classList.remove("filter-btn__icon_active");
      iconDesc.classList.remove("filter-btn__icon_active");
    }
  };

  updateIcons();

  button.addEventListener("click", () => {
    currentValue =
      currentValue === "asc" ? "desc" : currentValue === "desc" ? "asc" : "asc";
    updateIcons();

    if (onClick) {
      const type = button.dataset.name;
      onClick(type, currentValue);
    }
  });

  const reset = () => {
    currentValue = defaultValue || null;
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
