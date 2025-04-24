import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import CardList from "@/components/cart/card-list.tsx";
import CardForm from "@/components/cart/card-form.tsx";

export default function Cart() {
  const items = useSelector((state: RootState) => state.cart.items);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">🛒 Ваш кошик</h1>
      {items.length === 0 ? (
        <p className="text-center text-muted-foreground">Кошик порожній.</p>
      ) : (
        <div className="flex w-full md:flex-row flex-col gap-8">
          <CardForm />
          <div className="space-y-4 w-full md:w-2/3">
            {items.map((item) => (
              <CardList
                key={item.id}
                id={item.id}
                quantity={item.quantity}
                image={item.image}
                title={item.title}
                price={item.price}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
