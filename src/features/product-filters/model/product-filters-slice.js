export const productFiltersSlice = {
  name: "productFilters",

  initialState: {
    weight: [],
    flavor: [],
    price: null,
  },

  reducers: {
    setFilters: (state, action) => ({ ...state, ...action.payload }),
  },
};

export const productFiltersActions = {};
