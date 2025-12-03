export class Table {
  #container;
  #props;
  #element;

  constructor(containerElement, initialProps = {}) {
    if (!containerElement) {
      console.warn("TableComponent requires a container element.");
      return;
    }

    this.#container = containerElement;
    this.#props = initialProps;
    this.#element = this.#createBaseElement();
    this.#container.appendChild(this.#element);

    this.#setupEventListeners();

    this.render();
  }

  #createBaseElement() {
    return createTableElement(["table"]);
  }

  #createTableHeader(columns) {
    return createTableHeader(columns);
  }

  #createTableBody(rows, columns) {
    return createTableBody(rows, columns, this);
  }

  #createTableFooter(totalAmount) {
    return createTableFooter(totalAmount);
  }

  #setupEventListeners() {
    this.#element.addEventListener(
      "quantityChange",
      this.#handleQuantityChange
    );
  }

  #handleQuantityChange = (event) => {
    const { itemId, newQuantity } = event.detail;

    console.log(
      `[Table Component]: Получено изменение. ID: ${itemId}, Новое кол-во: ${newQuantity}`
    );

    this.#element.dispatchEvent(
      new CustomEvent("dataUpdateRequest", {
        bubbles: true,
        detail: {
          action: "updateQuantity",
          itemId: itemId,
          newQuantity: newQuantity,
        },
      })
    );

    event.stopPropagation();
  };

  update(newProps) {
    this.#props = { ...this.#props, ...newProps };
    this.render();
  }

  render() {
    const {
      columns = [],
      rows = [],
      totalAmount = 175,
      footer = {},
    } = this.#props;

    this.#element.innerHTML = "";

    if (columns.length > 0) {
      const templateString = columns.map((col) => col.width).join(" ");

      this.#element.style.gridTemplateColumns = templateString;

      const headerElement = this.#createTableHeader(columns);
      this.#element.appendChild(headerElement);
    } else {
      console.warn("Table requires columns");
      return;
    }

    const bodyElement = this.#createTableBody(rows, columns);
    this.#element.appendChild(bodyElement);

    const footerElement = this.#createTableFooter({
      ...footer,
      totalAmount,
    });
    this.#element.appendChild(footerElement);
  }
}

//////////////Fabrics/////////////////////////////

export function createTableElement(classNames = ["table"]) {
  const table = document.createElement("div");

  table.classList.add(...classNames);
  table.setAttribute("role", "table");
  table.setAttribute("aria-label", "Dynamic Table");

  return table;
}

export function createTableHeader(columns) {
  const headGroup = document.createElement("div");
  headGroup.classList.add("table__head");
  headGroup.setAttribute("role", "rowgroup");

  const headerRow = document.createElement("div");
  headerRow.classList.add("table__row", "table__row_head");
  headerRow.setAttribute("role", "row");

  columns.forEach((column) => {
    const cell = document.createElement("div");
    cell.classList.add("table__cell", "table__cell_head");
    cell.setAttribute("role", "columnheader");
    cell.setAttribute("scope", "col");
    cell.setAttribute("tabindex", "0");
    cell.setAttribute("aria-sort", "none");

    cell.textContent = column.label;
    cell.setAttribute("data-key", column.key);

    headerRow.appendChild(cell);
  });

  headGroup.appendChild(headerRow);
  return headGroup;
}

export function createTableBody(rows, columns, tableInstance) {
  const body = document.createElement("div");
  body.classList.add("table__body");
  body.setAttribute("role", "rowgroup");

  if (rows && rows.length > 0) {
    rows.forEach((rowData) => {
      const rowElement = createTableRow(rowData, columns, tableInstance);
      body.appendChild(rowElement);
    });
  } else {
    body.innerHTML =
      '<div class="table__row table__empty-message">Нет данных для отображения.</div>';
  }

  return body;
}

export function createTableFooter(footerProps) {
  const { leftAction, rightGroup, totalAmount } = footerProps;

  const footer = document.createElement("div");
  footer.classList.add("table__footer", "table-footer");
  footer.setAttribute("role", "contentinfo");

  let contentAdded = false;

  if (leftAction) {
    const continueButton = createFooterElement(leftAction, totalAmount);

    if (continueButton) {
      continueButton.classList.add("table-footer__left-action");

      footer.appendChild(continueButton);
      contentAdded = true;
    }
  }

  if (rightGroup && rightGroup.length > 0) {
    const checkoutGroup = document.createElement("div");
    checkoutGroup.classList.add("table-footer__right-group");

    let rightContentAdded = false;

    rightGroup.forEach((config) => {
      const element = createFooterElement(config, totalAmount);

      if (element) {
        checkoutGroup.appendChild(element);
        rightContentAdded = true;
      }
    });

    if (rightContentAdded) {
      footer.appendChild(checkoutGroup);
      contentAdded = true;
    }
  }

  if (!contentAdded) {
    return document.createElement("div");
  }

  return footer;
}

function getContinueShoppingIconSvg() {
  return `
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.83332 12.832L6.65 12.0154L2.21665 7.58203H14V6.41538H2.21665L6.65 1.98203L5.83332 1.16538L0 6.99871L5.83332 12.832Z" fill="#337D5A"/>
      </svg> 
  `;
}

function createFooterElement(config, totalAmount) {
  let element;

  switch (config.type) {
    case "button":
      element = document.createElement("button");

      const classNames = (config.className || "button__primary").split(" ");

      element.classList.add("button", ...classNames);

      if (config.text === "Продолжить покупки") {
        element.classList.add(
          "button_secondary",
          "button_size-sm",
          "table-footer__left-action"
        );
      } else if (config.text === "Оформить заказ") {
        element.classList.add(
          "button_primary",
          "button_size-lg",
          "table-footer__right-action"
        );
      }

      if (config.icon) {
        element.innerHTML = `${getContinueShoppingIconSvg()} ${config.text}`;
      } else {
        element.textContent = config.text;
      }

      if (config.onClick && typeof config.onClick === "function") {
        element.addEventListener("click", config.onClick);
      }
      break;

    case "total":
      element = document.createElement("div");
      element.classList.add("table-footer__total-group", "total-group");

      element.innerHTML = `
              <span class="total-group__text">${config.text}</span>
              <span class="total-group__price">${totalAmount}</span>
              <span class="total-group__unit">${config.unit}</span>
          `;
      break;

    default:
      return null;
  }
  return element;
}

export function createTableCell(content) {
  const cell = document.createElement("div");
  cell.classList.add("table__cell");
  cell.setAttribute("role", "cell");
  cell.textContent = content;
  return cell;
}

export function createTableRow(rowData, columns, tableInstance) {
  const row = document.createElement("div");
  row.classList.add("table__row");
  row.setAttribute("role", "row");
  row.setAttribute("tabindex", "0");

  columns.forEach((column) => {
    const cell = document.createElement("div");
    cell.classList.add("table__cell");
    cell.setAttribute("role", "cell");

    if (column.render) {
      const customContent = column.render(rowData, tableInstance);

      cell.appendChild(customContent);
    } else {
      const value =
        rowData[column.key] !== undefined ? String(rowData[column.key]) : "";
      cell.textContent = value;
    }

    row.appendChild(cell);
  });

  return row;
}

export function createLinkIcon(href, iconSvg) {
  const link = document.createElement("a");
  link.href = href;
  link.classList.add("table__action-link"); // Ваш CSS класс для стилей
  link.setAttribute(
    "aria-label",
    `Перейти к детали заказа №${href.split("/").pop()}`
  );

  link.innerHTML = iconSvg;

  return link;
}
