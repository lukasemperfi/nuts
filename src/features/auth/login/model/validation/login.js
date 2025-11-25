import JustValidate from "just-validate";

export function initLoginFormValidation() {
  const formSelector = "#login-form";

  const validator = new JustValidate(formSelector, {
    errorFieldCssClass: "form-field__input_error",
    errorLabelCssClass: "form-field__error",
    focusInvalidField: true,
    lockForm: true,
    validateBeforeSubmitting: true,
  });

  validator
    .addField("#login-email", [
      {
        rule: "required",
        errorMessage: "Введите email",
      },
      {
        rule: "email",
        errorMessage: "Введите корректный email",
      },
    ])
    .addField("#login-password", [
      {
        rule: "required",
        errorMessage: "Введите пароль",
      },
      {
        rule: "minLength",
        value: 6,
        errorMessage: "Пароль должен быть не меньше 6 символов",
      },
    ])
    .onSuccess((event) => {
      event.preventDefault();

      const form = document.querySelector(formSelector);
      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());

      // TODO: replace with an actual submit logic
      console.log("Login validated payload:", payload);
    });
}
