import { useEffect, useMemo } from "react";
import FilterBar from "../components/FilterBar";
import Header from "../components/Header";
import PresenceBar from "../components/PresenceBar";
import { users } from "../data/seed";
import { useTaskStore } from "../store/useTaskStore";
import { filterTasks } from "../utils/filters";
import { sortTasks } from "../utils/sort";
import KanbanView from "../views/KanbanView";
import ListView from "../views/ListView";
import TimelineView from "../views/TimelineView";

export default function TrackerPage() {
  const tasks = useTaskStore((s) => s.tasks);
  const view = useTaskStore((s) => s.view);
  const filters = useTaskStore((s) => s.filters);
  const sortKey = useTaskStore((s) => s.sortKey);
  const sortDirection = useTaskStore((s) => s.sortDirection);
  const setPresence = useTaskStore((s) => s.setPresence);

  const processedTasks = useMemo(() => {
    const filtered = filterTasks(tasks, filters);
    return sortTasks(filtered, sortKey, sortDirection);
  }, [tasks, filters, sortKey, sortDirection]);

  useEffect(() => {
    if (!tasks.length) return;

    const interval = setInterval(() => {
      const activeUsers = users.slice(0, 3).map((user) => {
        const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
        return {
          ...user,
          taskId: randomTask.id,
        };
      });

      setPresence(activeUsers);
    }, 2500);

    return () => clearInterval(interval);
  }, [setPresence]); 

  return (
    <div className="p-4 md:p-6 max-w-[1440px] mx-auto">
      <h1 className="text-2xl font-bold mb-4">Project Tracker</h1>

      <PresenceBar />
      <Header />
      <FilterBar />

      {view === "kanban" && <KanbanView tasks={processedTasks} />}
      {view === "list" && <ListView tasks={processedTasks} />}
      {view === "timeline" && <TimelineView tasks={processedTasks} />}
    </div>
  );
}