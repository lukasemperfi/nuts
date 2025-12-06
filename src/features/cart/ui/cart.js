import { Table } from "@/shared/ui/table/table";
import { QuantityComponent } from "@/shared/ui/table/quantity";
import { createDeleteButton, createLinkIcon } from "@/shared/ui/table/table";
import { TableModel } from "@/shared/ui/table/model/table-model";
import { store } from "@/app/store";
import { mapProductsToTableRows } from "./map-products-to-table-rows";
import { createOverlaySpinner } from "../../../shared/ui/overlay-spinner/overlay-spinner";
import { PRODUCTS_STATUS } from "../../../entities/product/model/products-slice";
import { CART_STATUS } from "../model/cart-slice";

export function Cart({ container }) {
  const columns = [
    {
      key: "productName",
      label: "Товар",
      type: "text",
      width: "1fr",
      align: "left",
    },

    {
      key: "quantity",
      label: "Кол-во",
      type: "component",
      render: (rowData) => {
        const quantityComp = new QuantityComponent(
          rowData.quantity,
          rowData.id
        );

        return quantityComp.element;
      },
      width: "1fr",
    },
    { key: "price", label: "Цена", type: "currency", width: "1fr" },
    {
      key: "total",
      label: "Итоговая стоимость",
      type: "currency",
      width: "0.5fr",
      align: "left",
      render: (rowData) => {
        return createFormattedCurrencyElement(rowData.total, "грн.");
      },
    },
  ];

  const footer = {
    leftAction: {
      type: "button",
      text: "Продолжить покупки",
      icon: "back",
      className: "button_secondary button_size-sm",
      href: "/catalog/",
    },

    rightGroup: [
      {
        type: "total",
        text: "Всего",
        amountKey: "totalAmount",
        unit: "грн.",
      },
      {
        type: "button",
        text: "Оформить заказ",
        className: "button_primary button_size-lg",
        href: "/checkout/",
      },
    ],
  };

  const cartContainer = document.createElement("div");
  cartContainer.classList.add("cart");

  const initialEmptyRows = [];
  const tableModel = new TableModel(initialEmptyRows);

  const initialData = {
    columns: columns,
    rows: tableModel.getRows(),
    totalAmount: tableModel.calculateTotalAmount(),
    footer: footer,
    showHeader: true,
  };

  const table = new Table(cartContainer, initialData);
  const overlay = createOverlaySpinner({
    className: "cart__overlay",
    blockBody: false,
  });
  cartContainer.appendChild(overlay.element);

  container.appendChild(cartContainer);

  cartContainer.addEventListener("dataUpdateRequest", (event) => {
    const { action, itemId, newQuantity } = event.detail;

    if (action === "updateQuantity") {
      store.dispatch({
        type: "cart/setQuantity",
        payload: {
          productId: String(itemId),
          quantity: newQuantity,
        },
      });
    }
  });

  store.subscribe("cart", async (newState) => {
    const cartItems = newState.items;
    const cartProducts = newState.products;
    const isCartProductsLoading = newState.isProductsLoading;

    if (isCartProductsLoading) {
      overlay.show();
      table.element.style.visibility = "hidden";
      return;
    }
    overlay.hide();

    table.element.style.visibility = "visible";

    const newRows = mapProductsToTableRows(cartProducts, cartItems);

    tableModel.setRows(newRows);

    const newTotalAmount = tableModel.calculateTotalAmount();

    table.update({
      rows: newRows,
      totalAmount: newTotalAmount,
    });
  });
}

export function createFormattedCurrencyElement(amount, unit) {
  const wrapper = document.createElement("div");
  wrapper.classList.add("currency-cell");

  const formattedAmount = Number(amount).toFixed(2);

  wrapper.innerHTML = `
      <span class="currency-cell__amount">${formattedAmount}</span>
      <span class="currency-cell__unit">${unit}</span>
  `;
  return wrapper;
}
