import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-6xl font-bold tracking-tight">404</h1>
      <p className="text-xl mt-4 text-muted-foreground">Сторінку не знайдено</p>
      <p className="text-sm text-muted-foreground mt-2">
        Можливо вона була видалена або ніколи не існувала
      </p>
      <Button asChild className="mt-6">
        <Link to="/">Повернутись на головну</Link>
      </Button>
    </div>
  );
}
