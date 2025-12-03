import { Table } from "@/shared/ui/table/table";
import { QuantityComponent } from "../../../shared/ui/table/quantity";

const initialData = {
  columns: [
    { key: "productName", label: "Товар", type: "text" },

    {
      key: "quantity",
      label: "Кол-во",
      type: "component",
      render: (rowData, tableInstance) => {
        const quantityComp = new QuantityComponent(
          rowData.quantity,
          rowData.id
        );

        return quantityComp.element;
      },
    },
    { key: "price", label: "Цена", type: "currency" },
    { key: "total", label: "Итоговая стоимость", type: "currency" },
  ],
  rows: [
    {
      id: 1,
      productName: "Орех соленый 80г.",
      quantity: 1,
      price: 29.99,
      total: 29.99,
    },
    {
      id: 2,
      productName: "Клавиатура X1",
      quantity: 2,
      price: 89.0,
      total: 178.0,
    },
    {
      id: 3,
      productName: "Мышь Logitech",
      quantity: 1,
      price: 49.5,
      total: 49.5,
    },
  ],
};

export const initCartSection = () => {
  const tableContainer = document.querySelector(
    ".cart-section__page-container"
  );
  const table = new Table(tableContainer, initialData);

  tableContainer.addEventListener("dataUpdateRequest", (event) => {
    const { action, itemId, newQuantity } = event.detail;

    console.log("--- ВНЕШНИЙ КОНТРОЛЛЕР ПОЛУЧИЛ ЗАПРОС ---");
    console.log(
      `Действие: ${action} для Item ID: ${itemId}. Новое значение: ${newQuantity}`
    );

    const newTotal =
      newQuantity * initialData.rows.find((r) => r.id === itemId).price;
    const newRows = initialData.rows.map((row) =>
      row.id === itemId
        ? { ...row, quantity: newQuantity, total: newTotal }
        : row
    );

    table.update({ rows: newRows });
  });
};

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
