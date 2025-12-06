import { store } from "@/app/store/index.js";
import { initAuthListener } from "@/entities/auth/model/auth-slice";
import { fetchCartProducts } from "@/features/cart/model/cart-slice";

async function initializeApp() {
  initAuthListener();
  initializeCart();
}

initializeApp();

store.subscribe("auth", async (newState) => {
  console.log("Auth State Changed:", newState);
});

store.subscribe("cart", async (newState) => {
  console.log("Cart State Changed:", newState);
});

function initializeCart() {
  try {
    const cartItems = store.getState().cart.items;

    if (cartItems && cartItems.length > 0) {
      fetchCartProducts();
    } else {
      console.log("Кошик порожній, деталі продуктів не завантажуються.");
    }
  } catch (error) {
    console.error("Помилка під час ініціалізації кошика:", error);
  }
}
