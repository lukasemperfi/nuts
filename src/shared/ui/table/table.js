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
    const { columns = [], rows = [] } = this.#props;

    this.#element.innerHTML = "";

    if (columns.length > 0) {
      // 🚀 1. Сбор динамического шаблона Grid (Например, "2fr 80px 1fr 1fr 50px")
      const templateString = columns.map((col) => col.width).join(" ");

      // 🚀 2. Установка шаблона для корневого элемента таблицы (.table)
      this.#element.style.gridTemplateColumns = templateString;

      const headerElement = this.#createTableHeader(columns);
      this.#element.appendChild(headerElement);
    } else {
      console.warn("Table requires columns");
      return;
    }

    const bodyElement = this.#createTableBody(rows, columns);
    this.#element.appendChild(bodyElement);
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
