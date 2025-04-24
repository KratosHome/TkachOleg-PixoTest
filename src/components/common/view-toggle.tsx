import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group.tsx";
import { LayoutGrid, List } from "lucide-react";

export default function ViewToggle({
  view,
  setView,
}: {
  view: string;
  setView: (v: string) => void;
}) {
  return (
    <ToggleGroup value={view} onValueChange={setView} type="single">
      <ToggleGroupItem value="grid">
        <LayoutGrid />
      </ToggleGroupItem>
      <ToggleGroupItem value="list">
        <List />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
