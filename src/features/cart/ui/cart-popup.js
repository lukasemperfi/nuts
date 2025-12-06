import { Table } from "@/shared/ui/table/table";
import { QuantityComponent } from "@/shared/ui/table/quantity";
import { createDeleteButton, createLinkIcon } from "@/shared/ui/table/table";
import { TableModel } from "@/shared/ui/table/model/table-model";
import { store } from "@/app/store";
import { fetchProductsWithCache } from "@/entities/product/model/products-slice";
import { mapProductsToTableRows } from "./map-products-to-table-rows";
import { baseUrl } from "../../../shared/helpers/base-url";
import { PRODUCTS_STATUS } from "../../../entities/product/model/products-slice";
import { createOverlaySpinner } from "../../../shared/ui/overlay-spinner/overlay-spinner";

export function CartPopup({ trigger, cartPopupContainer }) {
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
    {
      key: "deleteAction",
      label: "",
      type: "action",
      width: "50px",
      align: "right",
      render: (rowData) => {
        return createDeleteButton(rowData.id, handleItemDelete);
      },
    },
  ];

  const footer = {
    rightGroup: [
      {
        type: "total",
        text: "Всего",
        amountKey: "totalAmount",
        unit: "грн.",
      },
      {
        type: "button",
        text: "Перейти в корзину",
        className: "button_primary button_size-lg",
        href: `${baseUrl}cart/`,
      },
    ],
  };

  const cartPopup = document.createElement("div");
  cartPopup.classList.add("cart-popup");

  if (!cartPopupContainer) {
    console.error("Контейнер .middle-header__cart-popup не найден.");
    return;
  }

  const cartPopupId = "cart-popup-" + Math.random().toString(36).slice(2);
  setTrigger(trigger, cartPopupId);
  setCartPopupTarget(cartPopup, cartPopupId);

  cartPopupContainer.appendChild(cartPopup);

  const initialEmptyRows = [];
  const tableModel = new TableModel(initialEmptyRows);

  const initialData = {
    columns: columns,
    rows: tableModel.getRows(),
    totalAmount: tableModel.calculateTotalAmount(),
    footer: footer,
    showHeader: false,
  };

  const table = new Table(cartPopup, initialData);

  cartPopup.addEventListener("dataUpdateRequest", (event) => {
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

  store.subscribe("products", (newState) => {
    if (newState.cachedStatus === PRODUCTS_STATUS.LOADING) {
      //TODO: show loading spinner
    }
  });

  store.subscribe("cart", async (newState) => {
    const cartItems = newState.items;
    const ids = cartItems.map((item) => String(item.productId));
    const cartProducts = await fetchProductsWithCache(ids);

    const newRows = mapProductsToTableRows(cartProducts, cartItems);

    tableModel.setRows(newRows);
    const newTotalAmount = tableModel.calculateTotalAmount();

    table.update({
      rows: newRows,
      totalAmount: newTotalAmount,
    });
  });
}

function setTrigger(trigger, cartPopupId) {
  trigger.setAttribute("popovertarget", cartPopupId);
}

function setCartPopupTarget(cartPopup, cartPopupId) {
  cartPopup.id = cartPopupId;
  cartPopup.setAttribute("popover", "");
}

function handleItemDelete(itemId) {
  console.log("delete", itemId);
  store.dispatch({
    type: "cart/removeItem",
    payload: { productId: itemId },
  });
}

export function renderDetailsLink(rowData) {
  const orderId = rowData.id;
  const url = `/orders/${orderId}`;

  const iconHtml = `
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M23.8475 12.4669C23.6331 12.7602 18.5245 19.6484 11.9999 19.6484C5.47529 19.6484 0.36647 12.7602 0.152297 12.4672C-0.0507657 12.1889 -0.0507657 11.8115 0.152297 11.5333C0.36647 11.24 5.47529 4.35174 11.9999 4.35174C18.5245 4.35174 23.6331 11.24 23.8475 11.533C24.0508 11.8113 24.0508 12.1889 23.8475 12.4669ZM11.9999 5.93415C7.19383 5.93415 3.03127 10.506 1.79907 12.0006C3.02968 13.4966 7.18352 18.066 11.9999 18.066C16.8057 18.066 20.968 13.495 22.2007 11.9995C20.9701 10.5037 16.8163 5.93415 11.9999 5.93415Z"
          fill="#8A8A8A"
        />
        <path
          d="M11.9992 16.748C9.38163 16.748 7.25195 14.6184 7.25195 12.0008C7.25195 9.38317 9.38163 7.25349 11.9992 7.25349C14.6168 7.25349 16.7465 9.38317 16.7465 12.0008C16.7465 14.6184 14.6168 16.748 11.9992 16.748ZM11.9992 8.83595C10.2541 8.83595 8.83441 10.2557 8.83441 12.0008C8.83441 13.7459 10.2541 15.1656 11.9992 15.1656C13.7443 15.1656 15.164 13.7459 15.164 12.0008C15.164 10.2557 13.7444 8.83595 11.9992 8.83595Z"
          fill="#8A8A8A"
        />
      </svg>
    `;

  return createLinkIcon(url, iconHtml);
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
