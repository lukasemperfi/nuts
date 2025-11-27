import JustValidate from "just-validate";

export const LOGIN_FORM_SELECTORS = {
  FORM: "#login-form",
  EMAIL: "#login-email",
  PASSWORD: "#login-password",
};

////RULES/////
const REQUIRED_RULE = {
  rule: "required",
  errorMessage: "Поле обязательно для заполнения",
};

const EMAIL_RULE = { rule: "email", errorMessage: "Введите корректный email" };

const PASSWORD_RULE = {
  rule: "password",
  errorMessage: "Минимум восемь символов, одна буква и одна цифра",
};

///////////////////////////////////////////////////

export function initLoginFormValidation() {
  const validatorConfig = {
    errorFieldCssClass: "form-field__input_error",
    errorLabelCssClass: "form-field__error",
    focusInvalidField: true,
    lockForm: true,
    validateBeforeSubmitting: true,
    errorFieldStyle: {},
    errorLabelStyle: {},
  };

  const validator = new JustValidate(
    LOGIN_FORM_SELECTORS.FORM,
    validatorConfig
  );

  validator
    .addField(LOGIN_FORM_SELECTORS.EMAIL, [REQUIRED_RULE, EMAIL_RULE])
    .addField(LOGIN_FORM_SELECTORS.PASSWORD, [REQUIRED_RULE]);

  return validator;
}
