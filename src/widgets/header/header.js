import { initActiveLink } from "@/shared/ui/nav-menu/nav-menu";

export function initHeader() {
  initMenu();
  initResizeHandler();
  initActiveLink(".nav-menu__link");

  const authLinks = document.querySelectorAll(".auth a");

  authLinks.forEach((link) => {
    const linkPath = link.getAttribute("href").replace(/\/+$/, "");
    const currentPath = window.location.pathname.replace(/\/+$/, "");

    console.log(linkPath, currentPath);

    if (linkPath === currentPath) {
      link.classList.add("active");
      link.addEventListener("click", (e) => e.preventDefault());
    }
  });
}

function initMenu() {
  const menuButton = document.querySelector(".middle-header__burger-btn");
  const mobileMenu = document.querySelector(".mobile-menu");
  const closeButton = document.querySelector(".mobile-menu__close");

  if (!menuButton || !mobileMenu) {
    return;
  }

  menuButton.addEventListener("click", function () {
    const isOpen = mobileMenu.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", isOpen ? "true" : "false");
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  });

  if (closeButton) {
    closeButton.addEventListener("click", () => {
      mobileMenu.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "auto";
    });
  }
}

function initResizeHandler() {
  const mobileMenu = document.querySelector(".mobile-menu");
  const menuButton = document.querySelector(".middle-header__burger-btn");

  if (!mobileMenu || !menuButton) {
    return;
  }

  window.addEventListener("resize", function () {
    if (mobileMenu.classList.contains("is-open")) {
      mobileMenu.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "auto";
    }
  });
}
