export const ROUTES = {
  HOME: "/",
  PRODUCT_DETAILS: "/product/:id",
  PRODUCT: (id: string | number) => `/product/${id}`,
  CART: "/cart",
  NOT_FOUND: "*",
};
