import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "@/pages/home.tsx";
import Header from "@/components/layout/header.tsx";
import ProductDetails from "@/pages/product-details.tsx";
import { ThemeProvider } from "@/components/providers/theme-provider.tsx";
import NotFound from "@/pages/not-found.tsx";
import { Provider } from "react-redux";
import { store } from "@/store/store.ts";
import Cart from "@/pages/cart.tsx";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
