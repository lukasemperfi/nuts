export const initDropdown = (selector) => {
  const select = document.querySelector(selector);
  const isMultiple = select.dataset.multiple === "true";
  const button = select.querySelector(".dropdown__button");
  const selectedText = select.querySelector(".dropdown__selected");
  const options = select.querySelectorAll(".dropdown__option");
  const hiddenInput = select.querySelector('input[type="hidden"]');

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

    hiddenInput.value = labels.join(",");
  };

  const handleOptionClick = (option) => {
    const isSelected = option.getAttribute("aria-selected") === "true";

    if (isMultiple) {
      if (isSelected) {
        option.setAttribute("aria-selected", "false");
        selected = selected.filter((opt) => opt !== option);
      } else {
        option.setAttribute("aria-selected", "true");
        selected.push(option); // сохраняем порядок добавления
      }
    } else {
      options.forEach((opt) => opt.removeAttribute("aria-selected"));
      option.setAttribute("aria-selected", "true");
      selected = [option];
      closeDropdown();
    }

    updateSelected();

    const event = new Event("change", { bubbles: true });
    hiddenInput.dispatchEvent(event);
  };

  button.addEventListener("click", toggleDropdown);

  options.forEach((option) => {
    option.addEventListener("click", (e) => {
      e.stopPropagation();
      handleOptionClick(option);
    });
  });

  document.addEventListener("click", (e) => {
    if (!select.contains(e.target)) {
      closeDropdown();
    }
  });

  selectedText.dataset.placeholder = selectedText.textContent.trim();
};

// export const initDropdown = (selector) => {
//   const select = document.querySelector(selector);
//   const isMultiple = select.dataset.multiple === "true";
//   const button = select.querySelector(".dropdown__button");
//   const selectedText = select.querySelector(".dropdown__selected");
//   const options = select.querySelectorAll(".dropdown__option");
//   const hiddenInput = select.querySelector('input[type="hidden"]');

//   const toggleDropdown = () => {
//     const expanded = button.getAttribute("aria-expanded") === "true";
//     button.setAttribute("aria-expanded", String(!expanded));
//   };

//   const closeDropdown = () => {
//     button.setAttribute("aria-expanded", "false");
//   };

//   const updateSelected = () => {
//     const selectedOptions = select.querySelectorAll("[aria-selected='true']");
//     const labels = Array.from(selectedOptions).map((opt) =>
//       opt.querySelector(".dropdown__label").textContent.trim()
//     );

//     selectedText.textContent =
//       labels.length > 0
//         ? labels.join(", ")
//         : selectedText.dataset.placeholder || "Select...";

//     hiddenInput.value = labels.join(",");
//   };

//   const handleOptionClick = (option) => {
//     if (isMultiple) {
//       const isSelected = option.getAttribute("aria-selected") === "true";
//       option.setAttribute("aria-selected", String(!isSelected));
//     } else {
//       options.forEach((opt) => opt.removeAttribute("aria-selected"));
//       option.setAttribute("aria-selected", "true");
//       closeDropdown();
//     }

//     updateSelected();

//     const event = new Event("change", { bubbles: true });
//     hiddenInput.dispatchEvent(event);
//   };

//   button.addEventListener("click", toggleDropdown);

//   options.forEach((option) => {
//     option.addEventListener("click", (e) => {
//       e.stopPropagation();
//       handleOptionClick(option);
//     });
//   });

//   document.addEventListener("click", (e) => {
//     if (!select.contains(e.target)) {
//       closeDropdown();
//     }
//   });

//   selectedText.dataset.placeholder = selectedText.textContent.trim();
// };

// export const initDropdown = (selectClass) => {
//   const select = document.querySelector(selectClass);
//   const button = select.querySelector(".dropdown__button");
//   const selectedText = select.querySelector(".dropdown__selected");
//   const options = select.querySelectorAll(".dropdown__option");
//   const hiddenInput = select.querySelector('input[type="hidden"]');

//   const closeDropdown = () => {
//     button.setAttribute("aria-expanded", "false");
//   };

//   const toggleDropdown = () => {
//     const isExpanded = button.getAttribute("aria-expanded") === "true";
//     button.setAttribute("aria-expanded", !isExpanded);
//   };

//   const selectOption = (option) => {
//     options.forEach((opt) => opt.removeAttribute("aria-selected"));

//     option.setAttribute("aria-selected", "true");
//     selectedText.textContent = option.textContent.trim();
//     hiddenInput.value = option.dataset.value;

//     closeDropdown();

//     const event = new Event("change", { bubbles: true });
//     hiddenInput.dispatchEvent(event);
//   };

//   button.addEventListener("click", toggleDropdown);

//   options.forEach((option) => {
//     option.addEventListener("click", () => selectOption(option));
//   });

//   document.addEventListener("click", (e) => {
//     if (!select.contains(e.target)) {
//       closeDropdown();
//     }
//   });

//   return {
//     closeDropdown,
//     toggleDropdown,
//     selectOption,
//   };
// };
