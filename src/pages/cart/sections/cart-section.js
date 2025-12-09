import { Cart } from "@/features/cart/ui/cart";
import { QuantityComponent } from "@/shared/ui/table/quantity";
import { createFormattedCurrencyElement } from "@/features/cart/ui/helpers";
import { baseUrl } from "@/shared/helpers/base-url";
import { getSession } from "@/app/providers/auth-guard";
import { store } from "@/app/store";

export const initCartSection = async () => {
  // const isAuthenticated = await getSession();
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
        const quantityComp = new QuantityComponent(
          rowData.quantity,
          rowData.id
        );

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
        className: "button_primary button_size-lg order-link",
        href: `${baseUrl}checkout/`,
      },
    ],
  };
  const cartContainer = document.querySelector(".cart-section__page-container");

  Cart({
    container: cartContainer,
    columns,
    footer,
    onChange: () => {
      const orderLink = cartContainer.querySelector(".order-link");

      store.subscribe("auth", (newCartState) => {
        const isAuthenticated = newCartState.isAuth;
        console.log("orderLink", orderLink);

        if (!isAuthenticated) {
          if (orderLink) {
            orderLink.classList.add("disabled-link");
          }
        } else {
          if (orderLink) {
            orderLink.classList.remove("disabled-link");
          }
        }
      });
    },
  });

  store.subscribe("auth", (newCartState) => {
    const isAuthenticated = newCartState.isAuth;
    const authItem = cartContainer.querySelector(".auth-item");

    if (!isAuthenticated) {
      const authItem = createAuthItem();

      cartContainer.appendChild(authItem);
    } else {
      if (authItem) {
        cartContainer.removeChild(authItem);
      }
    }
  });
};
//TODO: add rediraction path to login/registration page
function createAuthItem() {
  const element = document.createElement("div");

  element.className = "auth-item";
  element.innerHTML = `
      <div class="auth-item__title">Для оформления заказа необходимо</div>
      <div class="auth-item__links">
          <a href="${baseUrl}login/" class="auth-item__link">Авторизоваться</a>
          или 
          <a href="${baseUrl}registration/" class="auth-item__link">Зарегистрироваться</a>
      </div>
  `;

  return element;
}
