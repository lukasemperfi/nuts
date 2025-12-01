import { GridTable } from "@/shared/ui/table/table";

export const initCartSection = () => {};

// import { store } from "@/app/store";
// import { fetchProductsWithCache } from "@/entities/product/model/products-slice";
// import { selectCartProductIds } from "../../../features/cart/model/cart-slice";

// export const initCartSection = () => {
//   const add = document.querySelector("#add-to-cart");
//   const get = document.querySelector("#get-cart-items");
//   const deleteItem = document.querySelector("#delete-from-cart");

//   const increment = document.querySelector("#increment");
//   const decrement = document.querySelector("#decrement");

//   store.subscribe("cart", async (newState) => {
//     const ids = selectCartProductIds(newState);
//     const cartProducts = await fetchProductsWithCache(ids);
//     console.log("cartProducts", cartProducts);
//   });

//   add.addEventListener("click", () => {
//     console.log("add");
//     store.dispatch({
//       type: "cart/addItem",
//       payload: { productId: 2 },
//     });
//   });

//   get.addEventListener("click", () => {
//     console.log("get");
//   });

//   deleteItem.addEventListener("click", () => {
//     console.log("delete");

//     store.dispatch({
//       type: "cart/removeItem",
//       payload: { productId: "555" },
//     });
//   });

//   increment.addEventListener("click", () => {
//     console.log("increment");

//     store.dispatch({
//       type: "cart/incrementQuantity",
//       payload: { productId: "555" },
//     });
//   });

//   decrement.addEventListener("click", () => {
//     console.log("decrement");

//     store.dispatch({
//       type: "cart/decrementQuantity",
//       payload: { productId: "555" },
//     });
//   });
// };
