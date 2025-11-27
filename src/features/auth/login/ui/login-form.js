import { loginUser } from "@/entities/auth/model/auth-slice";
import {
  LOGIN_FORM_SELECTORS,
  initLoginFormValidation,
} from "../model/validation/login";

export const initLoginForm = () => {
  initLoginFormValidation().onSuccess(async (event) => {
    event.preventDefault();

    const form = document.querySelector(LOGIN_FORM_SELECTORS.FORM);
    const formData = new FormData(form);
    const { email, password } = Object.fromEntries(formData.entries());

    await loginUser(email, password);

    // console.log("Login validated payload:", payload);
  });
};
