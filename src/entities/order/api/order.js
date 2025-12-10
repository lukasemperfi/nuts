import { supabase } from "@/shared/api/supabase/client.js";

class Orders {
  async createOrder(orderData) {
    if (!orderData || !orderData.products || orderData.products.length === 0) {
      throw new Error("Объект заказа или список продуктов недействителен.");
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("Необходимо авторизоваться для оформления заказа.");
    }

    const userId = user.id;
    const deliveryDetails = orderData[orderData.delivery_method];
    let orderId = null;

    try {
      const orderPayload = {
        user_id: userId,
        order_number: this.generateOrderNumber(),
        full_name: orderData.full_name,
        email: orderData.email,
        phone: orderData.phone,
        delivery_method: orderData.delivery_method,
        payment_method: orderData.payment_method,
        status: "новый",
        total_amount: orderData.total_amount,
      };

      const { data, error } = await supabase
        .from("orders")
        .insert([orderPayload])
        .select("id")
        .single();

      if (error) throw error;
      orderId = data.id;
    } catch (error) {
      console.error("Ошибка (A) при вставке в orders:", error);
      throw new Error("Не удалось создать основную запись заказа.");
    }

    try {
      const itemsPayload = orderData.products.map((p) => ({
        order_id: orderId,
        product_id: p.productId,
        quantity: p.quantity,
      }));

      const { error } = await supabase.from("order_items").insert(itemsPayload);

      if (error) {
        await this.rollbackOrder(orderId, "order_items");
        throw error;
      }
    } catch (error) {
      console.error("Ошибка (B) при вставке в order_items:", error);
      throw new Error("Не удалось добавить продукты в заказ.");
    }

    if (deliveryDetails) {
      try {
        const deliveryPayload = {
          order_id: orderId,
          country: deliveryDetails.country || null,
          region: deliveryDetails.region || null,
          city: deliveryDetails.city || null,
          address: deliveryDetails.address || null,
        };

        const { error } = await supabase
          .from("order_delivery_details")
          .insert([deliveryPayload]);

        if (error) {
          await this.rollbackOrder(orderId, "order_delivery_details");
          throw error;
        }
      } catch (error) {
        console.error(
          "Ошибка (C) при вставке в order_delivery_details:",
          error
        );
        throw new Error("Не удалось добавить детали доставки.");
      }
    }

    return orderId;
  }

  async getOrders() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("Необходимо авторизоваться для просмотра заказов.");
    }

    const userId = user.id;

    try {
      const { data: orders, error } = await supabase
        .from("orders")
        .select(
          `
                    *,
                    order_items (
                        product_id,
                        quantity
                    ),
                    order_delivery_details (
                        country,
                        region,
                        city,
                        address
                    )
                `
        )
        .eq("user_id", userId)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Ошибка Supabase при получении заказов:", error);
        throw new Error(error.message || "Не удалось получить список заказов.");
      }

      return orders;
    } catch (e) {
      console.error("Ошибка в ordersApi.getOrders:", e);
      throw e;
    }
  }

  generateOrderNumber() {
    return (
      Date.now().toString().slice(-8) +
      Math.random().toString(36).substring(2, 6)
    );
  }

  async rollbackOrder(orderId, failedStep) {
    console.warn(
      `Попытка отката заказа ${orderId} после ошибки на шаге: ${failedStep}`
    );
    try {
      const { error } = await supabase
        .from("orders")
        .delete()
        .eq("id", orderId);

      if (error) {
        throw error;
      }
      console.warn(`Успешно откатили неполный заказ ${orderId}.`);
    } catch (rollbackError) {
      console.error(
        `Критическая ошибка при откате заказа ${orderId}. Требуется ручная чистка!`,
        rollbackError
      );
    }
  }
}

export const ordersApi = new Orders();
