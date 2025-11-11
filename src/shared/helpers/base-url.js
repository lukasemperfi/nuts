export const baseUrl =
  import.meta.env.MODE === "development"
    ? "/"
    : import.meta.env.VITE_PROD_URL || "";
