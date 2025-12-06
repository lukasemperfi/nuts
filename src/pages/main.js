import { store } from "@/app/store/index.js";
import { initAuthListener } from "@/entities/auth/model/auth-slice";
import { CART_STATUS } from "../features/cart/model/cart-slice";
import { fetchProductsWithCache } from "@/entities/product/model/products-slice";

initAuthListener();

store.subscribe("auth", async (newState) => {
  console.log("Auth State Changed:", newState);
});

store.subscribe("cart", async (newState) => {
  if (newState.status !== CART_STATUS.LOADING) {
    const cartItems = newState.items;
    const ids = cartItems.map((item) => String(item.productId));
    await fetchProductsWithCache(ids);
  }
});
