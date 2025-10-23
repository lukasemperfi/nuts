import { initSwiper } from "@/shared/lib/swiper/init-swiper.js";
import { Navigation } from "swiper/modules";

export const initManufacturerSection = () => {
  initManufacturerSwiper();
  initPlay(".manufacturer__card");
};

function initManufacturerSwiper() {
  return initSwiper(".manufacturer-slider", {
    slidesPerView: "auto",
    navigation: {
      nextEl: ".manufacturer-slider__next",
      prevEl: ".manufacturer-slider__prev",
    },
    modules: [Navigation],
  });
}

export const initPlay = (cardSelector) => {
  const cards = document.querySelectorAll(cardSelector);

  cards.forEach((card) => {
    const playButton = card.querySelector(".card__button");
    const video = card.querySelector(".card__video");

    if (!playButton || !video) return;

    video.addEventListener("click", () => {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    });

    playButton.addEventListener("click", () => {
      if (!video.src) {
        video.src = video.dataset.src;
      }

      card.classList.add("card_playing");

      video.play();

      stopOtherVideos(card);
    });
  });
};

function stopOtherVideos(currentCard) {
  document.querySelectorAll(".manufacturer__card").forEach((card) => {
    if (card !== currentCard) {
      const video = card.querySelector(".card__video");
      video.pause();
      // card.classList.remove("card_playing");
    }
  });
}
