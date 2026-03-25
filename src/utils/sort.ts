import { Task } from "../types";
import type { SortKey, SortDirection } from "../store/useTaskStore";

const priorityOrder: Record<string, number> = {
  Critical: 4,
  High: 3,
  Medium: 2,
  Low: 1,
};

export function sortTasks(
  tasks: Task[],
  key: SortKey,
  direction: SortDirection
) {
  const mul = direction === "asc" ? 1 : -1;

  return [...tasks].sort((a, b) => {
    switch (key) {
      case "title":
        return a.title.localeCompare(b.title) * mul;

      case "priority":
        return (
          (priorityOrder[b.priority] - priorityOrder[a.priority]) * mul
        );

      case "dueDate":
        return (
          (new Date(a.dueDate).getTime() -
            new Date(b.dueDate).getTime()) * mul
        );

      default:
        return 0;
    }
  });
}