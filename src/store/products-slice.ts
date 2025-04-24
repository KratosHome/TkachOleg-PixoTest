import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

interface PriceRange {
  min: number;
  max: number;
}

interface ProductsState {
  products: IProduct[];
  filteredProducts: IProduct[];
  categories: string[];
  selectedCategory: string;
  priceRange: PriceRange;
  sort: string;
}

const initialState: ProductsState = {
  products: [],
  filteredProducts: [],
  categories: [],
  selectedCategory: "",
  priceRange: { min: 0, max: 1000 },
  sort: "",
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get<IProduct[]>(`${API_URL}/products`);
    return response.data;
  },
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload === "all" ? "" : action.payload;
    },
    setPriceRange(state, action) {
      state.priceRange = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    filterAndSortProducts(state) {
      let result = [...state.products];

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
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.products = action.payload;
      state.filteredProducts = action.payload;
      state.categories = Array.from(
        new Set(action.payload.map((p) => p.category)),
      );
    });
  },
});

export const {
  setSelectedCategory,
  setPriceRange,
  setSort,
  filterAndSortProducts,
} = productsSlice.actions;

export default productsSlice.reducer;
