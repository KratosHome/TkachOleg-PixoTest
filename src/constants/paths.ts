export const ROUTES = {
  HOME: "/",
  PRODUCT_DETAILS: "/product/:id",
  PRODUCT: (id: string | number) => `/product/${id}`,
  PRODUCT_LIST: "/products",
  CART: "/cart",
  NOT_FOUND: "*",
};
