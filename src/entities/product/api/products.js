import { supabase } from "@/shared/api/supabase/client.js";

class Products {
  getAllProducts = async (filters = {}) => {
    console.log("from API:", filters);
    const { flavor = [], weight = [], price = null } = filters;

    let query = supabase
      .from("products")
      .select(
        `
        *,
        product_images (*),
        product_flavors!inner (
          flavor_id,
          flavors!inner (*)
        ),
        packaging_types (*),
        product_statuses (*)
      `
      )
      .limit(6);

    if (flavor.length > 0) {
      query = query.in("product_flavors.flavors.value", flavor);
    }

    if (weight.length > 0) {
      query = query.in("weight", weight);
    }

    if (price === "asc" || price === "desc") {
      query = query.order("price", { ascending: price === "asc" });
    }

    const { data: products, error } = await query;

    if (error) {
      console.error("Ошибка при получении продуктов:", error.message);
      return [];
    }

    return products;
  };
}

export const productsApi = new Products();
