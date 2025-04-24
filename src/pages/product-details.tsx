import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { useDispatch } from "react-redux";
import { addItem } from "@/store/cart-slice.ts";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import NotFound from "@/pages/not-found.tsx";

export default function ProductDetails() {
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct | null | "not_found">(null);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${API_URL}/products/${id}`)
      .then((res) => {
        if (res.data.length === 0) {
          setProduct("not_found");
        } else {
          setProduct(res.data);
        }
      })
      .catch(() => setProduct("not_found"));
  }, [id]);

  if (!product) {
    return (
      <div className="container mx-auto p-4">
        <Skeleton className="w-full h-64 mb-4" />
        <Skeleton className="w-1/2 h-6 mb-2" />
        <Skeleton className="w-1/3 h-5 mb-2" />
        <Skeleton className="w-full h-24" />
      </div>
    );
  }

  if (product === "not_found") return <NotFound />;

  return (
    <div className="container mx-auto p-4">
      <Card className="flex flex-col md:flex-row items-start gap-6">
        <CardHeader className="w-full md:w-1/3">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-64 object-contain"
          />
        </CardHeader>
        <CardContent className="flex-1 space-y-4">
          <CardTitle className="text-2xl font-bold">{product.title}</CardTitle>
          <p className="text-muted-foreground capitalize">{product.category}</p>
          <p className="text-lg font-semibold text-green-700">
            ${product.price}
          </p>
          <p className="text-sm text-gray-700">{product.description}</p>
          <p className="text-sm text-yellow-600">
            Rating: {product.rating?.rate}
          </p>
          <Button onClick={() => dispatch(addItem(product))}>
            Додати в кошик
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
