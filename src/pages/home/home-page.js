import { initDropdown } from "@/shared/ui/dropdown/dropdown.js";
import { initHeader } from "@/widgets/header/header.js";
import { initProducts } from "./sections/products/products.js";
import { initManufacturerSection } from "./sections/manufacturer/manufacturer.js";
import { initNewsSection } from "@/widgets/news-section/news-section.js";
import { initHero } from "./sections/hero/hero.js";
import { initGoal } from "./sections/goal/goal.js";
import { store } from "@/app/store/index.js";
import { productFiltersActions } from "../../feautures/product-filters/model/slice.js";
// import { supabase } from "@/shared/api/supabase/client.js";
import { productsApi } from "../../entities/product/api/products.js";

document.addEventListener("DOMContentLoaded", async () => {
  initDropdown(".top-header__lang");
  initHeader();
  initProducts();
  initManufacturerSection();
  initNewsSection();
  initHero();
  initGoal();

  // console.log("one product with images", await fetchProductWithImages(1));

  console.log("products", await productsApi.getAllProducts());
});

// store.subscribe("productFilters", (newState) => {
//   console.log("productFilters state changed:", newState);
// });

// store.dispatch(productFiltersActions.setSort("price-asc"));

async function fetchProductWithImages(productId) {
  const { data, error } = await supabase
    .from("products")
    .select("*, product_images (*)")
    .eq("id", productId)
    .single();

  if (error) {
    console.error("Ошибка при получении товара и изображений:", error.message);
    return null;
  }

  return data;
}
