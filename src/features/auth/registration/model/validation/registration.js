import JustValidate from "just-validate";

const FORM_SELECTORS = {
  FORM: "#registration-form",

  // Common Fields
  FULL_NAME: "#registration-full-name",
  EMAIL: "#registration-email",
  PHONE: "#registration-phone",
  // COUNTRY: "#registration-country",
  // REGION_NAME: "#registration-region",
  // CITY_NAME: "#registration-city",
  PASSWORD: "#registration-password",
  CONFIRM_PASSWORD: "#registration-confirm-password",
  AGREE: "#registration-agree",
  FILE: "#registration__avatar-file",

  //  FOP Fields
  FOP_EDRPOU: "#registration-fop-edrpou",
  FOP_COUNTRY: "#registration-fop-country",
  FOP_CITY: "#registration-fop-city",

  // Legal Entity Field
  LEGAL_OKPO: "#registration-legal-entity-okpo",
  LEGAL_COUNTRY: "#registration-legal-entity-country",
  LEGAL_CITY: "#registration-legal-entity-city",
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

const FILE_RULE = [
  {
    rule: "files",
    value: {
      files: {
        extensions: ["jpeg", "jpg", "png"],
        // maxSize: 2000000,
        types: ["image/jpeg", "image/jpg", "image/png"],
      },
    },
    errorMessage: "Неверный формат (JPG, PNG)",
  },
  {
    rule: "files",
    value: {
      files: {
        maxSize: 2000000,
      },
    },
    errorMessage: "Макс 2MB",
  },
];

const OKPO_CODE_RULE = [
  {
    rule: "minNumber",
    value: 8,
  },
  {
    rule: "maxNumber",
    value: 8,
  },
];

/////////////

const COMMON_RULES = {
  [FORM_SELECTORS.FULL_NAME]: [REQUIRED_RULE, FULL_NAME_RULE],
  [FORM_SELECTORS.EMAIL]: [REQUIRED_RULE, EMAIL_RULE],
  [FORM_SELECTORS.PHONE]: [REQUIRED_RULE, PHONE_RULE],
  [FORM_SELECTORS.PASSWORD]: [REQUIRED_RULE, PASSWORD_RULE],
  [FORM_SELECTORS.CONFIRM_PASSWORD]: [REQUIRED_RULE, CONFIRM_PASSWORD_RULE],
  [FORM_SELECTORS.AGREE]: [AGREE_RULE],
  [FORM_SELECTORS.FILE]: [...FILE_RULE],
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

    // console.log(" payload:", payload);
    console.log("registration validated finalpayload:", finalPayload);
  });
}

///Form Payload Conversion////
const groupFieldsByPrefix = (payload, prefix, groupKey) => {
  const groupData = {};
  const keysToDelete = [];

  for (const key in payload) {
    if (key.startsWith(prefix)) {
      const newKey = key.replace(prefix, "");

      // *** Изменение: Пустые поля теперь сохраняются (нет проверки на payload[key] !== "") ***
      groupData[newKey] = payload[key];

      keysToDelete.push(key);
    }
  }

  // Удаляем исходные поля с префиксом
  keysToDelete.forEach((key) => delete payload[key]);

  // *** Изменение: Вложенный объект groupKey добавляется всегда, даже если он пустой (чтобы сохранить структуру) ***
  payload[groupKey] = groupData;

  return groupData;
};

const groupRegistrationData = (payload) => {
  const type = payload["person_type"];

  // Выполняем группировку для "fop"
  if (type === "fop") {
    groupFieldsByPrefix(payload, "fop_", "fop");
  }

  // Выполняем группировку для "legal"
  if (type === "legal") {
    groupFieldsByPrefix(payload, "legal_entity_", "legal_entity");
  }

  // *** Изменение: Удален цикл, который удалял пустые поля из payload. ***
  /* for (const key in payload) {
    if (payload[key] === "") {
      delete payload[key];
    }
  }
  */

  return payload;
};

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
