import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ROUTES } from "@/constants/paths.ts";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    getProducts: builder.query<IProduct[], void>({
      query: () => `${ROUTES.PRODUCT_LIST}`,
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
