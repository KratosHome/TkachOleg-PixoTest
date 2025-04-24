import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "@/store/cart-slice.ts";

interface CartItemProps {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

const CardList: React.FC<CartItemProps> = ({
  id,
  title,
  image,
  price,
  quantity,
}) => {
  const dispatch = useDispatch();

  const changeQuantity = (id: number, newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  return (
    <Card>
      <CardHeader className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img src={image} alt={title} className="w-16 h-16 object-contain" />
          <div>
            <CardTitle className="text-base">{title}</CardTitle>
            <CardDescription>${price.toFixed(2)}</CardDescription>
          </div>
        </div>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => dispatch(removeItem(id))}
        >
          Видалити
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => changeQuantity(id, quantity - 1)}
          >
            −
          </Button>
          <span className="w-6 text-center">{quantity}</span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => changeQuantity(id, quantity + 1)}
          >
            +
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardList;
