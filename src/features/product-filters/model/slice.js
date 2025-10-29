export const productFiltersSlice = {
  name: "productFilters",

  initialState: {
    category: "all",
    priceRange: [0, 1000],
    sort: "popularity",
    search: "",
  },

  reducers: {
    setCategory(state, action) {
      return { ...state, category: action.payload };
    },

    setPriceRange(state, action) {
      return { ...state, priceRange: action.payload };
    },

    setSort(state, action) {
      console.log("Setting sort to:", action.payload);
      console.log("from sort state:", state);
      return { ...state, sort: action.payload };
    },

    setSearch(state, action) {
      return { ...state, search: action.payload };
    },

    resetFilters() {
      return {
        category: "all",
        priceRange: [0, 1000],
        sort: "popularity",
        search: "",
      };
    },
  },
};

export const productFiltersActions = {
  setCategory: (value) => ({
    type: "productFilters/setCategory",
    payload: value,
  }),
  setPriceRange: (range) => ({
    type: "productFilters/setPriceRange",
    payload: range,
  }),
  setSort: (value) => ({ type: "productFilters/setSort", payload: value }),
  setSearch: (value) => ({ type: "productFilters/setSearch", payload: value }),
  resetFilters: () => ({ type: "productFilters/resetFilters" }),
};
