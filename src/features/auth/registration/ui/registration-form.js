import { initUploadPhoto } from "@/shared/ui/upload-photo/upload-photo.js";
import { initDropdown } from "@/shared/ui/dropdown/dropdown";
import {
  REG_FORM_SELECTORS,
  initRegistrationFormValidation,
} from "@/features/auth/registration/model/validation/registration";
import { groupRegistrationData } from "@/features/auth/registration/lib/registration-data-mapper";
import { registerUser, logoutUser } from "@/entities/auth/model/auth-slice";
import { createOverlaySpinner } from "@/shared/ui/overlay-spinner/overlay-spinner";
import { store } from "@/app/store";
import { AUTH_STATUS } from "@/entities/auth/model/auth-slice";
import { redirect } from "@/shared/helpers/redirect";

const mode = import.meta.env.MODE;
let baseUrl = mode === "production" ? "/nuts/" : import.meta.env.BASE_URL;

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

  initRegistrationFormValidation().onSuccess(async (event) => {
    event.preventDefault();

    const form = document.querySelector(REG_FORM_SELECTORS.FORM);
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    const finalPayload = groupRegistrationData(payload);

    const overlay = createOverlaySpinner("Регистрация прошла успешно!");

    store.subscribe("auth", async (newState) => {
      if (newState.status === AUTH_STATUS.LOADING) {
        overlay.show();
      }
      if (newState.status === AUTH_STATUS.SUCCEEDED) {
        overlay.success();
        redirect(baseUrl, 2000);
        //TODO: clearForm
      }
    });

    const signUpData = await registerUser(finalPayload);
  });
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

  const clearCustomDropdownFormFields = (container) => {
    if (!container) {
      return;
    }
    const dropdownFields = container.querySelectorAll(".dropdown_select");

    dropdownFields.forEach((dropdown) => {
      const selected = dropdown.querySelector(".dropdown__selected");
      const selectedOption = dropdown.querySelector(
        '.dropdown__option[aria-selected="true"]'
      );

      selected.innerHTML = selected.dataset.placeholder;

      if (selectedOption) {
        selectedOption.removeAttribute("aria-selected");
      }
    });
  };
  const clearFormFields = (container) => {
    if (!container) {
      return;
    }

    const fields = container.querySelectorAll("input, select, textarea");

    fields.forEach((field) => {
      if (field.type === "checkbox" || field.type === "radio") {
        field.checked = false;
      } else {
        field.value = "";
      }
    });

    clearCustomDropdownFormFields(container);
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
