import { initUploadPhoto } from "@/shared/ui/upload-photo/upload-photo.js";
import { initDropdown } from "@/shared/ui/dropdown/dropdown";

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
};

function initPersonTypeSwitcher() {
  const radios = document.querySelectorAll('input[name="person-type-group"]');
  const fop = document.querySelector(".fop-entity");
  const legal = document.querySelector(".legal-entity");

  const updateVisibility = (value) => {
    fop.classList.add("hidden");
    legal.classList.add("hidden");

    if (value === "fop") {
      fop.classList.remove("hidden");
    }
    if (value === "legal") {
      legal.classList.remove("hidden");
    }
  };

  radios.forEach((radio) => {
    radio.addEventListener("change", () => updateVisibility(radio.value));
  });

  const checked = document.querySelector(
    'input[name="person-type-group"]:checked'
  );
  if (checked) {
    updateVisibility(checked.value);
  }
}
