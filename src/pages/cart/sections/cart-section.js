import { Cart } from "@/features/cart/ui/cart";
import { QuantityComponent } from "@/shared/ui/table/quantity";
import { createFormattedCurrencyElement } from "@/features/cart/ui/helpers";
import { baseUrl } from "@/shared/helpers/base-url";

const columns = [
  {
    key: "productName",
    label: "Товар",
    type: "text",
    width: "max-content",
    align: "left",
  },

  {
    key: "quantity",
    label: "Кол-во",
    type: "component",
    render: (rowData) => {
      const quantityComp = new QuantityComponent(rowData.quantity, rowData.id);

      return quantityComp.element;
    },
    width: "max-content",
  },
  {
    key: "price",
    label: "Цена за товар",
    type: "currency",
    width: "max-content",
    render: (rowData) => {
      console.log("rowDat", rowData);
      return createFormattedCurrencyElement(rowData.price, "грн.");
    },
  },
  {
    key: "total",
    label: "Итоговая стоимость",
    type: "currency",
    width: "max-content",
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
    href: `${baseUrl}catalog/`,
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
      href: `${baseUrl}checkout/`,
    },
  ],
};
export const initCartSection = () => {
  const cartContainer = document.querySelector(".cart-section__page-container");

  Cart({ container: cartContainer, columns, footer });
};
