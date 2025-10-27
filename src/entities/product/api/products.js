import { supabase } from "@/shared/api/supabase/client.js";

class Products {
  getAllProducts = async () => {
    const { data: products, error } = await supabase.from("products").select(`
      *,
      product_images (*),
      product_flavors (
        flavor_id,
        flavors (*)
      ),
      packaging_types (*),
      product_statuses (*)
    `);

    if (error) {
      console.error("Ошибка при получении продуктов:", error.message);
      return [];
    }

    return products;
  };
}

export const productsApi = new Products();
