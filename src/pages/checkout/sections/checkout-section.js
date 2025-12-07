import { Table } from "../../../shared/ui/table/table";
import { TableModel } from "../../../shared/ui/table/model/table-model";
import { QuantityComponent } from "../../../shared/ui/table/quantity";

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
      const quantityComp = new QuantityComponent(rowData.quantity, rowData.id);

      return quantityComp.element;
    },
    width: "1fr",
  },
  { key: "price", label: "Цена", type: "currency", width: "1fr" },
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
export const initCheckoutSection = () => {
  const checkoutContainer = document.querySelector(
    ".checkout-section__page-container"
  );
};
