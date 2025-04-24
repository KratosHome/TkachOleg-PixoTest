import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Link } from "react-router";
import { useDispatch } from "react-redux";
import { addItem } from "@/store/cart-slice.ts";
import { Button } from "@/components/ui/button.tsx";
import { ROUTES } from "@/constants/paths.ts";

export default function ProductCard({ product }: { product: IProduct }) {
  const dispatch = useDispatch();

  return (
    <Card className="w-full h-full flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-primary">
      <Link to={ROUTES.PRODUCT(product.id)}>
        <CardHeader>
          <img src={product.image} className="w-full h-40 object-contain" />
        </CardHeader>
        <CardContent>
          <CardTitle>{product.title}</CardTitle>
          <p className="mt-2 font-semibold text-red-50">${product.price}</p>
          <p className="text-sm">Rating: {product.rating.rate}</p>
        </CardContent>
      </Link>
      <Button className="mx-2" onClick={() => dispatch(addItem(product))}>
        Додати в кошик
      </Button>
    </Card>
  );
}
