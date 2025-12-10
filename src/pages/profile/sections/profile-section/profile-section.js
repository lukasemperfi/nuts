export const initProfileSection = () => {
  initAccountMenu();
};

function initAccountMenu() {
  const currentUrl = window.location.href;
  const menuLinks = document.querySelectorAll(".account-menu-list__link");
  toogleAccountMenu();

  menuLinks.forEach((link) => {
    const linkUrl = link.href;

    if (linkUrl === currentUrl) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
}

function toogleAccountMenu() {
  const menu = document.querySelector(".profile-section__menu");
  const toggleBtn = document.querySelector(".user-info-bar__menu-button");

  toggleBtn.addEventListener("click", () => {
    menu.classList.toggle("is-collapsed");
  });
}
