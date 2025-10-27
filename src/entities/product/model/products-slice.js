import { store } from "@/app/store/index.js";
import { productsApi } from "../api/products.js";

export const PRODUCTS_STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCEEDED: "succeeded",
  FAILED: "failed",
};

const initialState = {
  items: [],
  status: PRODUCTS_STATUS.IDLE,
  error: null,
  lastFetched: null,
};

export const productsSlice = {
  name: "products",
  initialState,
  reducers: {
    setLoading: (state) => ({
      ...state,
      status: PRODUCTS_STATUS.LOADING,
      error: null,
    }),
    setProducts: (state, action) => ({
      ...state,
      items: action.payload,
      status: PRODUCTS_STATUS.SUCCEEDED,
      error: null,
      lastFetched: new Date().toISOString(),
    }),
    setError: (state, action) => ({
      ...state,
      status: PRODUCTS_STATUS.FAILED,
      error: action.payload,
    }),
    clearError: (state) => ({
      ...state,
      error: null,
    }),
    reset: () => initialState,
  },
};

export async function fetchProducts() {
  const currentState = store.getState().products;
  if (currentState.status === PRODUCTS_STATUS.LOADING) {
    return;
  }

  store.dispatch({ type: "products/setLoading" });

  try {
    const products = await productsApi.getAllProducts();
    store.dispatch({
      type: "products/setProducts",
      payload: products,
    });
    return products;
  } catch (err) {
    const errorMessage = err.message || "Unknown error occurred";
    store.dispatch({
      type: "products/setError",
      payload: errorMessage,
    });
    throw err;
  }
}
