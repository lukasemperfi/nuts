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

  cachedProducts: [],
  cachedStatus: "idle",
  cachedError: null,
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

    setCachedLoading: (state) => ({
      ...state,
      cachedStatus: PRODUCTS_STATUS.LOADING,
      cachedError: null,
    }),
    setCachedProducts: (state, action) => ({
      ...state,
      cachedProducts: action.payload,
      cachedStatus: PRODUCTS_STATUS.SUCCEEDED,
      cachedError: null,
    }),
    setCachedError: (state, action) => ({
      ...state,
      cachedStatus: PRODUCTS_STATUS.FAILED,
      cachedError: action.payload,
    }),
  },
};

export async function fetchProducts(filters) {
  const currentState = store.getState().products;
  if (currentState.status === PRODUCTS_STATUS.LOADING) {
    return;
  }

  store.dispatch({ type: "products/setLoading" });

  try {
    const updatedFilters = {
      ...filters,
      weight: filters?.weight?.map((w) => Number(w)) || [],
    };
    console.log("Fetching products", updatedFilters);
    const products = await productsApi.getAllProducts(updatedFilters);
    // const products = [];

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

export async function fetchProductsWithCache(ids = []) {
  const state = store.getState().products;

  const cachedIds = state.cachedProducts.map((p) => p.id);
  const idsToFetch = ids.filter((id) => !cachedIds.includes(id));
  const alreadyCached = state.cachedProducts.filter((p) => ids.includes(p.id));

  if (idsToFetch.length === 0) {
    return alreadyCached;
  }

  store.dispatch({ type: "products/setCachedLoading" });

  try {
    const products = await productsApi.getProductsByIds(idsToFetch);
    const updatedCache = [...alreadyCached, ...products];

    store.dispatch({
      type: "products/setCachedProducts",
      payload: updatedCache,
    });

    return updatedCache;
  } catch (err) {
    const errorMessage = err.message || "Unknown error";
    store.dispatch({ type: "products/setCachedError", payload: errorMessage });
    throw err;
  }
}
