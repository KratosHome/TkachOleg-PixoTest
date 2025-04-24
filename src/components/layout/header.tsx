import { Link } from "react-router";
import { Button } from "@/components/ui/button.tsx";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge.tsx";
import { ThemeToggle } from "@/components/common/theme-toggle.tsx";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store.ts";
import { ROUTES } from "@/constants/paths.ts";

const Header = () => {
  const cartItemCount = useSelector((state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0),
  );

  return (
    <header className="w-full container mx-auto px-4 md:px-8 py-4 shadow-sm bg-white dark:bg-black flex justify-between items-center">
      <Link to={ROUTES.HOME} className="text-xl font-bold">
        Лого
      </Link>

      <div className="flex items-center gap-5">
        <ThemeToggle />

        <Link to={ROUTES.CART} className="relative">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Cart"
            className="cursor-pointer"
          >
            <ShoppingCart className="h-6 w-6" />
            {cartItemCount > 0 && (
              <Badge className="absolute -top-1 -right-1 text-xs h-5 w-5 p-0 flex items-center justify-center">
                {cartItemCount}
              </Badge>
            )}
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
