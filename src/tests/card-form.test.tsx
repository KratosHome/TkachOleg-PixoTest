import { describe, it, expect, vi, beforeEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
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

const renderWithProviders = (
  ui: React.ReactElement,
  initialItems: ICartItem[] = [],
) => {
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
    cleanup();
    navigateMock.mockClear();
  });

  it("renders form inputs and submits correctly", async () => {
    renderWithProviders(<CardForm />, [
      {
        id: 1,
        title: "Test Item",
        price: 10,
        quantity: 1,
        category: "electronics",
        image: "https://via.placeholder.com/150",
        description: "Test description",
        rating: { rate: 4.5, count: 100 },
      },
    ]);

    await userEvent.type(
      screen.getAllByPlaceholderText("Ваше імʼя")[0],
      "Олег",
    );
    await userEvent.type(
      screen.getAllByPlaceholderText("Адреса доставки")[0],
      "Київ, Україна",
    );
    await userEvent.type(
      screen.getAllByPlaceholderText("Email")[0],
      "oleg@example.com",
    );

    await userEvent.click(
      screen.getAllByRole("button", { name: /Оформити замовлення/i })[0],
    );

    expect(screen.queryByText(/обовʼязкове/i)).toBeNull();
    expect(navigateMock).toHaveBeenCalledWith("/");
  });

  it("shows validation errors on empty submit", async () => {
    renderWithProviders(<CardForm />);

    await userEvent.click(
      screen.getAllByRole("button", { name: /Оформити замовлення/i })[0],
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
