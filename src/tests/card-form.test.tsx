import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import CardForm from "@/components/cart/card-form.tsx";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/store/cart-slice.ts";

const navigateMock = vi.fn();

vi.mock("react-router", () => ({
  useNavigate: () => navigateMock,
}));

const renderWithProviders = (ui: React.ReactElement, initialItems = []) => {
  const store = configureStore({
    reducer: { cart: cartReducer },
    preloadedState: {
      cart: { items: initialItems },
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>,
  );
};

describe("CardForm", () => {
  beforeEach(() => {
    navigateMock.mockClear();
  });

  it("renders form inputs and submits correctly", async () => {
    renderWithProviders(<CardForm />, [
      { id: 1, title: "Test Item", price: 10, quantity: 1 },
    ]);

    await userEvent.type(screen.getByPlaceholderText("Ваше імʼя"), "Олег");
    await userEvent.type(
      screen.getByPlaceholderText("Адреса доставки"),
      "Київ, Україна",
    );
    await userEvent.type(
      screen.getByPlaceholderText("Email"),
      "oleg@example.com",
    );

    await userEvent.click(
      screen.getByRole("button", { name: /Оформити замовлення/i }),
    );

    expect(screen.queryByText(/обовʼязкове/i)).toBeNull();
    expect(navigateMock).toHaveBeenCalledWith("/");
  });

  it("shows validation errors on empty submit", async () => {
    renderWithProviders(<CardForm />);

    await userEvent.click(
      screen.getByRole("button", { name: /Оформити замовлення/i }),
    );

    expect(await screen.findByText("Імʼя обовʼязкове")).not.toBeNull();
    expect(await screen.findByText("Адреса обовʼязкова")).not.toBeNull();
    expect(await screen.findByText("Email обовʼязковий")).not.toBeNull();
  });

  it("validates incorrect email format", async () => {
    renderWithProviders(<CardForm />);

    await userEvent.type(screen.getByPlaceholderText("Ваше імʼя"), "Олег");
    await userEvent.type(
      screen.getByPlaceholderText("Адреса доставки"),
      "Київ, Україна",
    );
    await userEvent.type(screen.getByPlaceholderText("Email"), "wrongemail");

    await userEvent.click(
      screen.getByRole("button", { name: /Оформити замовлення/i }),
    );

    expect(await screen.findByText("Невірний формат email")).not.toBeNull();
  });
});
