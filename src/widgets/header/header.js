import { initActiveLink } from "@/shared/ui/nav-menu/nav-menu";
import { store } from "@/app/store";
import { AUTH_STATUS } from "@/entities/auth/model/auth-slice";
import { logoutUser } from "@/entities/auth/model/auth-slice";

const mode = import.meta.env.MODE;
let baseUrl = mode === "production" ? "/nuts/" : import.meta.env.BASE_URL;

export function initHeader() {
  initMenu();
  initResizeHandler();
  initActiveLink(".nav-menu__link");

  const authLinks = document.querySelectorAll(".auth a");

  authLinks.forEach((link) => {
    const linkPath = link.getAttribute("href").replace(/\/+$/, "");
    const currentPath = window.location.pathname.replace(/\/+$/, "");

    if (linkPath === currentPath) {
      link.classList.add("active");
      link.addEventListener("click", (e) => e.preventDefault());
    }
  });

  const authBlock = document.querySelector(".top-header__auth");
  const logOutButton = document.createElement("button");

  logOutButton.textContent = "Выйти X";
  logOutButton.style.color = "red";

  logOutButton.addEventListener("click", async () => {
    await logoutUser();
  });

  store.subscribe("auth", (newState) => {
    if (newState.status === AUTH_STATUS.IDLE) {
      if (authBlock.contains(logOutButton)) {
        authBlock.removeChild(logOutButton);
      }
    }
    if (newState.status === AUTH_STATUS.LOADING) {
    }
    if (newState.status === AUTH_STATUS.SUCCEEDED) {
      if (!authBlock.contains(logOutButton)) {
        authBlock.appendChild(logOutButton);
      }
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
