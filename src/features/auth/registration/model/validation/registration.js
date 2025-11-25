import JustValidate from "just-validate";

const FORM_SELECTORS = {
  FORM: "#registration-form",

  // Основные поля
  FULL_NAME: "#registration-full-name",
  EMAIL: "#registration-email",
  PHONE: "#registration-phone",

  // COUNTRY: "#registration-country",
  // REGION_NAME: "#registration-region",
  // CITY_NAME: "#registration-city",
  PASSWORD: "#registration-password",
  CONFIRM_PASSWORD: "#registration-confirm-password",
  AGREE: "#registration-agree",

  //  Поля ФОП
  // FOP_EDRPOU: "#registration-fop-edrpou",
  // FOP_COUNTRY: "#registration-fop-country",
  // FOP_CITY: "#registration-fop-city",

  // Поля Юр. лица
  // LEGAL_OKPO: "#registration-legal-entity-okpo",
  // LEGAL_COUNTRY: "#registration-legal-entity-country",
  // LEGAL_CITY: "#registration-legal-entity-city",
};

////RULES/////
const REQUIRED_RULE = {
  rule: "required",
  errorMessage: "Поле обязательно для заполнения",
};

const FULL_NAME_RULE = {
  rule: "customRegexp",
  value:
    /^[А-ЯЁІЇЄҐа-яёіїєґ]+(?:-[А-ЯЁІЇЄҐа-яёіїєґ]+)?\s+[А-ЯЁІЇЄҐа-яёіїєґ]+(?:-[А-ЯЁІЇЄҐа-яёіїєґ]+)?(?:\s+[А-ЯЁІЇЄҐа-яёіїєґ]+(?:-[А-ЯЁІЇЄҐа-яёіїєґ]+)?)?$/,
  errorMessage: "Введите корректное ФИО",
};
const EMAIL_RULE = { rule: "email", errorMessage: "Введите корректный email" };
const PHONE_RULE = {
  rule: "customRegexp",
  value: /^(?:\+380\d{9}|0\d{9})$/,
  errorMessage: "Введите корректный номер (+380501234567, 0501234567)",
};

const PASSWORD_RULE = {
  rule: "password",
  errorMessage: "Минимум восемь символов, одна буква и одна цифра",
};

const CONFIRM_PASSWORD_RULE = {
  validator: (value, fields) => {
    if (
      fields[FORM_SELECTORS.PASSWORD] &&
      fields[FORM_SELECTORS.PASSWORD].elem
    ) {
      const repeatPasswordValue = fields[FORM_SELECTORS.PASSWORD].elem.value;

      return value === repeatPasswordValue;
    }

    return true;
  },
  errorMessage: "Пароли должны быть одинаковыми",
};

const AGREE_RULE = {
  ...REQUIRED_RULE,
  errorMessage: "Подтвердите согласие",
};

/////////////

const COMMON_RULES = {
  [FORM_SELECTORS.FULL_NAME]: [REQUIRED_RULE, FULL_NAME_RULE],
  [FORM_SELECTORS.EMAIL]: [REQUIRED_RULE, EMAIL_RULE],
  [FORM_SELECTORS.PHONE]: [REQUIRED_RULE, PHONE_RULE],
  [FORM_SELECTORS.PASSWORD]: [REQUIRED_RULE, PASSWORD_RULE],
  [FORM_SELECTORS.CONFIRM_PASSWORD]: [REQUIRED_RULE, CONFIRM_PASSWORD_RULE],
  [FORM_SELECTORS.AGREE]: [AGREE_RULE],
};

export function initRegistrationFormValidation() {
  const formSelector = "#registration-form";
  const validatorConfig = {
    errorFieldCssClass: "form-field__input_error",
    errorLabelCssClass: "form-field__error",
    focusInvalidField: true,
    lockForm: true,
    validateBeforeSubmitting: true,
    errorFieldStyle: {},
    errorLabelStyle: {},
  };

  const validator = new JustValidate(formSelector, validatorConfig);

  for (const selector in COMMON_RULES) {
    validator.addField(selector, COMMON_RULES[selector]);
  }

  validator.onSuccess((event) => {
    event.preventDefault();

    const form = document.querySelector(formSelector);
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    const finalPayload = groupRegistrationData(payload);

    console.log("registration validated payload:", finalPayload);
  });
}

///Form Payload Conversion////
const groupFieldsByPrefix = (payload, prefix, groupKey) => {
  const groupData = {};

  const keysToDelete = [];

  for (const key in payload) {
    if (key.startsWith(prefix)) {
      const newKey = key.replace(prefix, "");

      groupData[newKey] = payload[key];

      keysToDelete.push(key);
    }
  }

  keysToDelete.forEach((key) => delete payload[key]);

  if (Object.keys(groupData).length > 0) {
    payload[groupKey] = groupData;
  }

  return groupData;
};

const groupRegistrationData = (payload) => {
  const type = payload["person-type-group"];

  if (type === "fop") {
    groupFieldsByPrefix(payload, "fop-", "fop");
  }

  if (type === "legal") {
    groupFieldsByPrefix(payload, "legal-entity-", "legalEntity");
  }

  for (const key in payload) {
    if (payload[key] === "") {
      delete payload[key];
    }
  }

  return payload;
};

// import JustValidate from "just-validate";

// const COMMON_RULES = {
//   "#registration-fop-city": [
//     { rule: "required", errorMessage: "Город ФОП обязателен" },
//   ],
//   "#registration-fop-edrpou": [
//     { rule: "required", errorMessage: "ЕДРПОУ обязателен" },
//   ],
//   "#registration-fop-country": [
//     { rule: "required", errorMessage: "Страна ФОП обязательна" },
//   ],
// };

// const FOP_FIELDS_RULES = {
//   "#registration-fop-city": [
//     { rule: "required", errorMessage: "Город ФОП обязателен" },
//   ],
//   "#registration-fop-edrpou": [
//     { rule: "required", errorMessage: "ЕДРПОУ обязателен" },
//   ],
//   "#registration-fop-country": [
//     { rule: "required", errorMessage: "Страна ФОП обязательна" },
//   ],
// };

// const LEGAL_FIELDS_RULES = {
//   "#registration-legal-entity-city": [
//     { rule: "required", errorMessage: "Город Юр. лица обязателен" },
//   ],
//   "#registration-legal-entity-okpo": [
//     { rule: "required", errorMessage: "ОКПО обязателен" },
//   ],
//   "#registration-legal-entity-country": [
//     { rule: "required", errorMessage: "Страна Юр. лица обязательна" },
//   ],
// };

// const DROPDOWN_CONFIGS = [
//   {
//     id: "#registration-country",
//     wrapperSelector: ".registration-form__country-dropdown",
//   },
//   {
//     id: "#registration-fop-country",
//     wrapperSelector: ".registration-form__fop-country-dropdown",
//   },
//   {
//     id: "#registration-legal-entity-country",
//     wrapperSelector: ".registration-form__legal-entity-country-dropdown",
//   },
//   {
//     id: "#registration-region",
//     wrapperSelector: ".registration-form__region-dropdown",
//   },
// ];

// export function initRegistrationFormValidation() {
//   const formSelector = "#registration-form";

//   const validator = new JustValidate(formSelector, {
//     errorFieldCssClass: "form-field__input_error",
//     errorLabelCssClass: "form-field__error",
//     focusInvalidField: true,
//     lockForm: true,
//     validateBeforeSubmitting: true,
//   });

//   for (const selector in COMMON_RULES) {
//     validator.addField(selector, COMMON_RULES[selector]);
//   }

//   validator
//     .addField("#registration-country", [
//       { rule: "required", errorMessage: "Выберите страну" },
//     ])
//     .onFail((fields) => {
//       DROPDOWN_CONFIGS.forEach((config) => {
//         const wrapper = document.querySelector(config.wrapperSelector);
//         if (wrapper) {
//           wrapper.classList.remove("dropdown_error");
//         }
//       });

//       DROPDOWN_CONFIGS.forEach((config) => {
//         if (fields[config.id]) {
//           const wrapper = document.querySelector(config.wrapperSelector);
//           if (wrapper) {
//             wrapper.classList.add("dropdown_error");
//           }
//         }
//       });
//     })
//     .onSuccess((event) => {
//       event.preventDefault();

//       const form = document.querySelector(formSelector);
//       const formData = new FormData(form);
//       const payload = Object.fromEntries(formData.entries());

//       // TODO: replace with an actual submit logic
//       console.log("registration validated payload:", payload);
//     });

//   initDropdownValidationListener(
//     "#registration-country",
//     validator,
//     ".registration-form__country-dropdown"
//   );

//   // 2. Дропдаун ФОП "Страна"
//   initDropdownValidationListener(
//     "#registration-fop-country",
//     validator,
//     ".registration-form__fop-country-dropdown"
//   );

//   // 3. Дропдаун Юр. лица "Страна"
//   initDropdownValidationListener(
//     "#registration-legal-entity-country",
//     validator,
//     ".registration-form__legal-entity-country-dropdown"
//   );
// }

// export const initDropdownValidationListener = (
//   selectId,
//   validator,
//   wrapperSelector
// ) => {
//   const nativeSelect = document.querySelector(selectId);

//   const wrapper = nativeSelect ? nativeSelect.closest(wrapperSelector) : null;

//   if (nativeSelect && wrapper) {
//     nativeSelect.addEventListener("change", () => {
//       validator.revalidateField(selectId);
//       wrapper.classList.remove("dropdown_error");
//     });
//   } else {
//     console.warn(
//       `Dropdown elements not found for ID: ${selectId} and selector: ${wrapperSelector}`
//     );
//   }
// };
