export const initDropdown = ({ selector, onChange, defaultValues = [] }) => {
  const select = document.querySelector(selector);
  const isMultiple = select.dataset.multiple === "true";
  const button = select.querySelector(".dropdown__button");
  const selectedText = select.querySelector(".dropdown__selected");
  const options = select.querySelectorAll(".dropdown__option");
  const optionsContainer = select.querySelector(".dropdown__dropdown");

  let selected = [];

  const toggleDropdown = () => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!expanded));
  };

  const closeDropdown = () => {
    button.setAttribute("aria-expanded", "false");
  };

  const updateSelected = () => {
    const labels = selected.map((opt) =>
      opt.querySelector(".dropdown__label").textContent.trim()
    );

    selectedText.textContent =
      labels.length > 0
        ? labels.join(", ")
        : selectedText.dataset.placeholder || "Select...";
  };

  const handleOptionClick = (option) => {
    const isSelected = option.getAttribute("aria-selected") === "true";

    if (isMultiple) {
      if (isSelected) {
        option.setAttribute("aria-selected", "false");
        selected = selected.filter((opt) => opt !== option);
      } else {
        option.setAttribute("aria-selected", "true");
        selected.push(option);
      }
    } else {
      options.forEach((opt) => opt.removeAttribute("aria-selected"));
      option.setAttribute("aria-selected", "true");
      selected = [option];
      closeDropdown();
    }

    updateSelected();
  };

  button.addEventListener("click", toggleDropdown);

  optionsContainer.addEventListener("click", (e) => {
    const option = e.target.closest(".dropdown__option");
    if (!option) {
      return;
    }

    e.stopPropagation();
    handleOptionClick(option);

    if (onChange) {
      const value = option.dataset.value;
      const type = select.dataset.name;

      onChange(type, value);
    }
  });

  document.addEventListener("click", (e) => {
    if (!select.contains(e.target)) {
      closeDropdown();
    }
  });

  selectedText.dataset.placeholder = selectedText.textContent.trim();

  if (defaultValues.length > 0) {
    options.forEach((opt) => {
      const value = opt.dataset.value;
      if (defaultValues.includes(value)) {
        opt.setAttribute("aria-selected", "true");
        selected.push(opt);
      }
    });
    updateSelected();
  }

  const reset = () => {
    options.forEach((opt) => opt.removeAttribute("aria-selected"));
    selected = [];
    updateSelected();
  };

  return {
    reset,
  };
};
