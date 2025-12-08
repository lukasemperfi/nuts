export const initCheckoutForm = () => {
  initDeliveryMethodSwitcher();
};

export function initDeliveryMethodSwitcher() {
  const form = document.getElementById("checkout-form");
  if (!form) {
    return;
  }

  const novaPoshtaFields = form.querySelector(".nova-poshta__fields");
  const courierFields = form.querySelector(".courier__fields");
  const radios = form.querySelectorAll('input[name="dalivery_method"]');

  function updateVisibility(value) {
    if (value === "nova-poshta") {
      novaPoshtaFields.classList.add("active");
      courierFields.classList.remove("active");
    } else if (value === "courier") {
      courierFields.classList.add("active");
      novaPoshtaFields.classList.remove("active");
    } else {
      novaPoshtaFields.classList.remove("active");
      courierFields.classList.remove("active");
    }
  }

  const checked = form.querySelector('input[name="dalivery_method"]:checked');
  if (checked) {
    updateVisibility(checked.value);
  }

  radios.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      updateVisibility(e.target.value);
    });
  });
}
