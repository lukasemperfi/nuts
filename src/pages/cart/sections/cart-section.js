import { Cart } from "../../../features/cart/ui/cart";

export const initCartSection = () => {
  const cartContainer = document.querySelector(".cart-section__page-container");

  Cart({ container: cartContainer });
};
