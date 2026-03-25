import { useCallback } from "react";
import VirtualList from "../components/VirtualList";
import SortHeader from "../components/SortHeader";
import { useTaskStore } from "../store/useTaskStore";
import { Task } from "../types";

const STATUS_OPTIONS: Task["status"][] = [
  "To Do",
  "In Progress",
  "In Review",
  "Done",
];

export default function ListView({ tasks }: { tasks: Task[] }) {
  const updateTaskStatus = useTaskStore((state) => state.updateTaskStatus);
  const setFilters = useTaskStore((state) => state.setFilters);

  const clearFilters = useCallback(() => {
    setFilters({
      status: [],
      priority: [],
      assignee: [],
      from: "",
      to: "",
    });
  }, [setFilters]);

  const renderRow = useCallback(
    (task: Task) => (
      <div
        key={task.id}
        className="grid grid-cols-4 gap-4 items-center px-3 h-14 border-b bg-white"
      >
        <div className="truncate">{task.title}</div>
        <div>{task.priority}</div>
        <div>{task.dueDate}</div>
        <select
          value={task.status}
          onChange={(e) =>
            updateTaskStatus(task.id, e.target.value as Task["status"])
          }
          className="border rounded-lg px-2 py-1 bg-white"
          aria-label={`Change status for ${task.title}`}
        >
          {STATUS_OPTIONS.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
    ),
    [updateTaskStatus]
  );

  if (tasks.length === 0) {
    return (
      <div className="bg-white border rounded-xl p-8 text-center">
        <p className="text-lg font-semibold mb-2">No tasks found</p>
        <p className="text-slate-500 mb-4">Clear filters to see all tasks.</p>
        <button
          onClick={clearFilters}
          className="px-4 py-2 rounded-lg bg-slate-900 text-white"
        >
          Clear filters
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-4 gap-4 bg-slate-200 p-3 rounded-t-lg font-semibold">
        <SortHeader label="Title" sortKey="title" />
        <SortHeader label="Priority" sortKey="priority" />
        <SortHeader label="Due Date" sortKey="dueDate" />
        <div>Status</div>
      </div>

      <VirtualList tasks={tasks} renderRow={renderRow} />
    </div>
  );
}