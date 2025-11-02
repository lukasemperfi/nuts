import { initDropdown } from "@/shared/ui/dropdown/dropdown.js";
import { initWalnutSection } from "@/pages/catalog/sections/walnut/walnut.js";
import { initProducts } from "@/pages/catalog/sections/products/products.js";
import { store } from "../../app/store";

document.addEventListener("DOMContentLoaded", () => {
  // store.subscribe("productFilters", (newState) => {
  //   console.log("from catalog:", newState);
  // });

  initDropdown({ selector: ".top-header__lang" });
  initWalnutSection();
  initProducts();
});

// store.dispatch({
//   type: "productFilters/setFilters",
//   payload: { weight: "test" },
// });

// store.subscribe("productFilters", (newState) => {
//   console.log("from productList subscribe (PRODUCTS):", newState);
// });
