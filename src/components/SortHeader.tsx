import { useTaskStore } from "../store/useTaskStore";
import type { SortKey } from "../store/useTaskStore";

export default function SortHeader({
  label,
  sortKey,
}: {
  label: string;
  sortKey: SortKey;
}) {
  const activeKey = useTaskStore((s) => s.sortKey);
  const direction = useTaskStore((s) => s.sortDirection);
  const setSort = useTaskStore((s) => s.setSort);

  return (
    <button className="font-semibold" onClick={() => setSort(sortKey)}>
      {label} {activeKey === sortKey ? (direction === "asc" ? "↑" : "↓") : ""}
    </button>
  );
}