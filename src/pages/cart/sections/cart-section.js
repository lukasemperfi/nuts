import { Cart } from "@/features/cart/ui/cart";
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
export const initCartSection = () => {
  const cartContainer = document.querySelector(".cart-section__page-container");

  const initialEmptyRows = [
    { productName: "Орехи кешью", quantity: 2, price: 150, total: 300, id: 1 },
  ];
  const tableModel = new TableModel(initialEmptyRows);

  const initialData = {
    columns: columns,
    rows: tableModel.getRows(),
    totalAmount: tableModel.calculateTotalAmount(),
    footer: footer,
    showHeader: true,
  };

  const tableCart = new Table(cartContainer, initialData);
  // Cart({ container: cartContainer });
};
