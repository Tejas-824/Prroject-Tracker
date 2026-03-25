import { Filters, Task } from "../types";

export function filterTasks(tasks: Task[], filters: Filters) {
  const statusSet = filters.status.length ? new Set(filters.status) : null;
  const prioritySet = filters.priority.length
    ? new Set(filters.priority)
    : null;
  const assigneeSet = filters.assignee.length
    ? new Set(filters.assignee)
    : null;

  const { from, to } = filters;

  return tasks.filter((task) => {
    if (statusSet && !statusSet.has(task.status)) return false;
    if (prioritySet && !prioritySet.has(task.priority)) return false;
    if (assigneeSet && !assigneeSet.has(task.assignee)) return false;
    if (from && task.dueDate < from) return false;
    if (to && task.dueDate > to) return false;
    return true;
  });
}