import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IPriceRange {
  min: number;
  max: number;
}

interface IProductsState {
  filteredProducts: IProduct[];
  categories: string[];
  selectedCategory: string;
  priceRange: IPriceRange;
  sort: string;
}

const initialState: IProductsState = {
  filteredProducts: [],
  categories: [],
  selectedCategory: "",
  priceRange: { min: 0, max: 1000 },
  sort: "",
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSelectedCategory(state, action: PayloadAction<string>) {
      state.selectedCategory = action.payload === "all" ? "" : action.payload;
    },
    setPriceRange(state, action: PayloadAction<IPriceRange>) {
      state.priceRange = action.payload;
    },
    setSort(state, action: PayloadAction<string>) {
      state.sort = action.payload;
    },
    filterAndSortProducts(state, action: PayloadAction<IProduct[]>) {
      let result = [...action.payload];

      if (state.selectedCategory) {
        result = result.filter((p) => p.category === state.selectedCategory);
      }

      result = result.filter(
        (p) =>
          p.price >= state.priceRange.min && p.price <= state.priceRange.max,
      );

      if (state.sort === "price") result.sort((a, b) => a.price - b.price);
      if (state.sort === "name")
        result.sort((a, b) => a.title.localeCompare(b.title));
      if (state.sort === "rating")
        result.sort((a, b) => b.rating.rate - a.rating.rate);

      state.filteredProducts = result;
      state.categories = Array.from(
        new Set(action.payload.map((p) => p.category)),
      );
    },
  },
});

export const {
  setSelectedCategory,
  setPriceRange,
  setSort,
  filterAndSortProducts,
} = productsSlice.actions;

export default productsSlice.reducer;
