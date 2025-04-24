import { Button } from "@/components/ui/button.tsx";
import { clearCart } from "@/store/cart-slice.ts";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store.ts";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

interface CheckoutFormData {
  name: string;
  address: string;
  email: string;
}

const CardForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const items = useSelector((state: RootState) => state.cart.items);
  const { register, handleSubmit, formState } = useForm<CheckoutFormData>();
  const { errors } = formState;

  const onSubmit = (data: CheckoutFormData) => {
    console.log("Checkout Data:", data);
    console.log("Cart Items:", items);
    dispatch(clearCart());
    navigate("/");
  };

  return (
    <form
      className="mt-8 max-w-md mx-auto space-y-4 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Label>Імʼя</Label>
      <Input
        {...register("name", {
          required: "Імʼя обовʼязкове",
          minLength: { value: 2, message: "Мінімум 2 символи" },
          maxLength: { value: 50, message: "Максимум 50 символів" },
        })}
        placeholder="Ваше імʼя"
      />
      {errors.name && (
        <p className="text-sm text-red-500">{errors.name.message}</p>
      )}

      <Label>Адреса</Label>
      <Input
        {...register("address", {
          required: "Адреса обовʼязкова",
          minLength: { value: 5, message: "Мінімум 5 символів" },
          maxLength: { value: 100, message: "Максимум 100 символів" },
        })}
        placeholder="Адреса доставки"
      />
      {errors.address && (
        <p className="text-sm text-red-500">{errors.address.message}</p>
      )}

      <Label>Email</Label>
      <Input
        type="email"
        {...register("email", {
          required: "Email обовʼязковий",
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Невірний формат email",
          },
        })}
        placeholder="Email"
      />
      {errors.email && (
        <p className="text-sm text-red-500">{errors.email.message}</p>
      )}

      <Button type="submit" className="w-full">
        Оформити замовлення
      </Button>
    </form>
  );
};

export default CardForm;
