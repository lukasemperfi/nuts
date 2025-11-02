export const productFiltersSlice = {
  name: "productFilters",

  initialState: {
    filters: {
      weight: [],
      flavor: [],
      price: null,
    },
    isInitialized: false,
  },

  reducers: {
    setFilters: (state, action) => ({
      ...state,
      filters: {
        ...state.filters,
        ...action.payload,
      },
    }),

    setInitialized: (state, action) => ({
      ...state,
      isInitialized: action.payload,
    }),
  },
};

export const productFiltersActions = {
  setFilters: (payload) => ({
    type: "productFilters/setFilters",
    payload,
  }),

  setInitialized: (value) => ({
    type: "productFilters/setInitialized",
    payload: value,
  }),
};
