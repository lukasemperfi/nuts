import { Table } from "@/shared/ui/table/table";
import { QuantityComponent } from "@/shared/ui/table/quantity";
import { createDeleteButton, createLinkIcon } from "@/shared/ui/table/table";
import { CopyButton } from "@/shared/ui/table/copy-button";
import { TableModel } from "@/shared/ui/table/model/table-model";

export function CartPopup({ trigger, cartPopupContainer }) {
  const columns = [
    { key: "productName", label: "Товар", type: "text", width: "1fr" },

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
      width: "1fr",
    },
    {
      key: "deleteAction",
      label: "",
      type: "action",
      width: "50px",
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
        href: "/cart/",
      },
    ],
  };

  const initialData = {
    columns: columns,
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
    totalAmount: 175,
    footer: footer,
    showHeader: false,
  };

  const cartPopup = document.createElement("div");
  cartPopup.classList.add(["cart-popup"]);
  const tableModel = new TableModel(initialData.rows);

  const currentInitialData = {
    ...initialData,
    rows: tableModel.getRows(),
    totalAmount: tableModel.calculateTotalAmount(),
  };

  const table = new Table(cartPopup, currentInitialData);

  if (cartPopupContainer) {
    cartPopupContainer.appendChild(cartPopup);
  } else {
    console.error("Контейнер для cartPopup не найден.");
  }

  cartPopupContainer.appendChild(cartPopup);

  let cartPopupId = "cart-popup-" + Math.random().toString(36).slice(2);

  setTrigger(trigger, cartPopupId);
  setCartPopupTarget(cartPopup, cartPopupId);

  cartPopup.addEventListener("dataUpdateRequest", (event) => {
    const { action, itemId, newQuantity } = event.detail;

    console.log("--- ВНЕШНИЙ КОНТРОЛЛЕР ПОЛУЧИЛ ЗАПРОС ---");

    if (action === "updateQuantity") {
      const newRows = tableModel.updateQuantity(itemId, newQuantity);
      const newTotalAmount = tableModel.calculateTotalAmount();

      table.update({
        rows: newRows,
        totalAmount: newTotalAmount,
      });
    }
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
  console.log(`[Корзина]: Запрос на удаление товара с ID: ${itemId}`);
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
