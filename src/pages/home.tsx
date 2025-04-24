import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/store/store";
import {
  fetchProducts,
  setPriceRange,
  setSelectedCategory,
  setSort,
  filterAndSortProducts,
} from "@/store/products-slice.ts";
import ProductCard from "@/components/product/product-card.tsx";
import ViewToggle from "@/components/common/view-toggle.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@radix-ui/react-dropdown-menu";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { filteredProducts, categories, selectedCategory, priceRange, sort } =
    useSelector((state: RootState) => state.products);

  const [view, setView] = useState("grid");

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(filterAndSortProducts());
  }, [selectedCategory, priceRange, sort, dispatch]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center mb-4 flex-wrap">
        <ViewToggle view={view} setView={setView} />

        <Select
          value={selectedCategory}
          onValueChange={(value) => dispatch(setSelectedCategory(value))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Оберіть категорію" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Усі категорії</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={sort}
          onValueChange={(value) => dispatch(setSort(value))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Сортувати за:" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price">Прайсом</SelectItem>
            <SelectItem value="name">Ім'ям</SelectItem>
            <SelectItem value="rating">Рейтингом</SelectItem>
          </SelectContent>
        </Select>

        <div className="w-40 flex flex-col items-center">
          <Label className="text-sm mb-5 font-medium text-muted-foreground">
            Ціновий діапазон
          </Label>
          <Slider
            value={[priceRange.min, priceRange.max]}
            min={0}
            max={1000}
            step={10}
            onValueChange={([min, max]) =>
              dispatch(setPriceRange({ min, max }))
            }
          />
        </div>
      </div>

      <div
        className={
          view === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
            : "flex flex-col gap-4"
        }
      >
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
