import { QuantityComponent } from "@/shared/ui/table/quantity";
import { Cart } from "@/features/cart/ui/cart";
import { createFormattedCurrencyElement } from "@/shared/ui/table/helpers";
import { initCheckoutForm } from "../../../features/checkout/ui/checkout-form";

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
  leftAction: null,

  rightGroup: [
    {
      type: "total",
      text: "Всего",
      amountKey: "totalAmount",
      unit: "грн.",
    },
  ],
};

export const initCheckoutSection = async () => {
  const checkoutContainer = document.querySelector(".checkout-section__cart");

  Cart({ container: checkoutContainer, columns, footer });

  initCheckoutForm();
};
