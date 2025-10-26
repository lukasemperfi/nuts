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

document.addEventListener("DOMContentLoaded", async () => {
  initDropdown(".top-header__lang");
  initHeader();
  initProducts();
  initManufacturerSection();
  initNewsSection();
  initHero();
  initGoal();

  // console.log("products", await fetchProducts());
});

async function fetchProducts() {
  const { data: products, error } = await supabase
    .from("products")
    .select(`*`)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Ошибка при получении продуктов:", error.message);
    return [];
  }

  return products;
}

store.subscribe("productFilters", (newState) => {
  console.log("productFilters state changed:", newState);
});

store.dispatch(productFiltersActions.setSort("price-asc"));
