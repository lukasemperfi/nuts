import { store } from "@/app/store/index.js";
import { initAuthListener } from "@/entities/auth/model/auth-slice";

initAuthListener();

store.subscribe("auth", async (newState) => {
  console.log("Auth State Changed:", newState);
});
