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
};
