export class QuantityComponent {
  #element;
  #input;
  #increaseButton;
  #decreaseButton;
  #itemId;

  constructor(initialValue, itemId) {
    this.#itemId = itemId;

    this.#element = createQuantityDomStructure(initialValue);

    this.#input = this.#element.querySelector(".quantity__input");
    this.#increaseButton = this.#element.querySelector(".quantity__increase");
    this.#decreaseButton = this.#element.querySelector(".quantity__decrease");

    this.#setupEventListeners();
  }

  #setupEventListeners() {
    this.#decreaseButton.addEventListener("click", () =>
      this.#updateQuantity(-1)
    );
    this.#increaseButton.addEventListener("click", () =>
      this.#updateQuantity(1)
    );

    this.#input.addEventListener("change", (e) =>
      this.#handleInputChange(e.target.value)
    );
  }

  #updateQuantity(delta) {
    let currentValue = Number(this.#input.value);
    let newValue = Math.max(1, currentValue + delta);

    if (newValue !== currentValue) {
      this.#input.value = newValue;
      this.#notifyChange(newValue);
    }
  }

  #handleInputChange(inputValue) {
    let newValue = Math.max(1, Math.floor(Number(inputValue)));

    this.#input.value = newValue;

    this.#notifyChange(newValue);
  }

  #notifyChange(newQuantity) {
    this.#element.dispatchEvent(
      new CustomEvent("quantityChange", {
        bubbles: true,
        detail: {
          itemId: this.#itemId,
          newQuantity: newQuantity,
        },
      })
    );
  }

  get element() {
    return this.#element;
  }
}

///////Fabrics/////////////

function createDecreaseIcon() {
  return `
        <svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_15004_11)">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M2.56815 4.99357L6.4 1.22265L5.05478 0L0 4.99357L5.05478 10L6.4 8.77735L2.56815 4.99357Z"
                    fill="#8A8A8A" />
            </g>
            <defs>
                <clipPath id="clip0_15004_11">
                    <rect width="10" height="8" fill="white" transform="matrix(0 1 1 0 0 0)" />
                </clipPath>
            </defs>
        </svg>`;
}

function createIncreaseIcon() {
  return `
        <svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_15004_7)">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M5.43185 4.99357L1.6 1.22265L2.94522 0L8 4.99357L2.94522 10L1.6 8.77735L5.43185 4.99357Z"
                    fill="#8A8A8A" />
            </g>
            <defs>
                <clipPath id="clip0_15004_7">
                    <rect width="10" height="8" fill="white" transform="matrix(0 1 -1 0 8 0)" />
                </clipPath>
            </defs>
        </svg>`;
}

function createQuantityDomStructure(initialValue) {
  const template = `
        <button class="quantity__decrease" type="button">${createDecreaseIcon()}</button>
        <input type="number" class="quantity__input" value="${initialValue}" min="1" aria-label="Количество" name="quantity-input">
        <button class="quantity__increase" type="button">${createIncreaseIcon()}</button>
    `;

  const container = document.createElement("div");
  container.classList.add("quantity");
  container.innerHTML = template;

  return container;
}
