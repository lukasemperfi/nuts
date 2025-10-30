import { supabase } from "@/shared/api/supabase/client.js";

class Products {
  getAllProducts = async (filters = {}) => {
    const {
      flavorValues = ["raw"],
      weightValues = [],
      sortOrder = "desc",
    } = filters;

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
      .limit(6)
      .order("price", { ascending: sortOrder === "asc" });

    if (flavorValues.length > 0) {
      query = query.in("product_flavors.flavors.value", flavorValues);
    }

    if (weightValues.length > 0) {
      query = query.in("weight", weightValues);
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
