import { initUploadPhoto } from "@/shared/ui/upload-photo/upload-photo.js";
import { initDropdown } from "@/shared/ui/dropdown/dropdown";
import { initRegistrationFormValidation } from "../model/validation/registration";

export const initRegistrationForm = () => {
  initUploadPhoto();
  initDropdown({
    selector: ".registration-form__country-dropdown",
  });
  initDropdown({
    selector: ".registration-form__region-dropdown",
  });

  initDropdown({
    selector: ".registration-form__fop-country-dropdown",
  });

  initDropdown({
    selector: ".registration-form__fop-region-dropdown",
  });

  initDropdown({
    selector: ".registration-form__legal-entity-country-dropdown",
  });

  initDropdown({
    selector: ".registration-form__legal-entity-region-dropdown",
  });

  initPersonTypeSwitcher();
  initRegistrationFormValidation();
};

function initPersonTypeSwitcher() {
  const radios = document.querySelectorAll('input[name="person_type"]');
  const fop = document.querySelector(".fop-entity");
  const legal = document.querySelector(".legal-entity");

  const toggleFieldsDisabled = (container, isDisabled) => {
    if (!container) {
      return;
    }

    const fields = container.querySelectorAll("input, select, textarea");

    fields.forEach((field) => {
      field.disabled = isDisabled;
    });
  };

  const clearFormFields = (container) => {
    if (!container) return;

    const fields = container.querySelectorAll("input, select, textarea");

    fields.forEach((field) => {
      if (field.type === "checkbox" || field.type === "radio") {
        field.checked = false;
      } else {
        field.value = "";
      }
    });
  };

  const updateVisibility = (value) => {
    clearFormFields(fop);
    clearFormFields(legal);

    toggleFieldsDisabled(fop, true);
    toggleFieldsDisabled(legal, true);

    fop.classList.add("hidden");
    legal.classList.add("hidden");

    if (value === "fop") {
      fop.classList.remove("hidden");
      toggleFieldsDisabled(fop, false);
    }
    if (value === "legal") {
      legal.classList.remove("hidden");
      toggleFieldsDisabled(legal, false);
    }
  };

  radios.forEach((radio) => {
    radio.addEventListener("change", () => updateVisibility(radio.value));
  });

  const checked = document.querySelector('input[name="person_type"]:checked');
  if (checked) {
    updateVisibility(checked.value);
  }
}
