import Avatar from "./Avatar";
import { formatDue, overdueDays } from "../utils/date";
import { useTaskStore } from "../store/useTaskStore";
import { Task } from "../types";

const priorityClass: Record<string, string> = {
  Critical: "bg-red-100 text-red-700",
  High: "bg-orange-100 text-orange-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-green-100 text-green-700",
};

export default function TaskCard({ task }: { task: Task }) {
  const allPresence = useTaskStore((state) => state.presence);
  const presence = allPresence.filter((item) => item.taskId === task.id);
  const overdue = overdueDays(task.dueDate) > 0;

  return (
    <div className="bg-white border rounded-xl p-3 shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-sm">{task.title}</h3>
        <span className={`text-xs px-2 py-1 rounded-full ${priorityClass[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      <div className="flex items-center justify-between mt-3">
        <Avatar name={task.assignee} small />
        <span className={`text-xs ${overdue ? "text-red-600 font-semibold" : "text-slate-500"}`}>
          {formatDue(task.dueDate)}
        </span>
      </div>

      {presence.length > 0 && (
        <div className="flex -space-x-2 mt-3">
          {presence.slice(0, 2).map((user) => (
            <Avatar key={user.id} name={user.name} color={user.color} small />
          ))}
          {presence.length > 2 && (
            <div className="w-7 h-7 rounded-full bg-slate-200 text-xs flex items-center justify-center border">
              +{presence.length - 2}
            </div>
          )}
        </div>
      )}
    </div>
  );
}