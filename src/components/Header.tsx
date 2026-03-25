import { useTaskStore } from "../store/useTaskStore";
import type { ViewType } from "../store/useTaskStore";

export default function Header() {
  const view = useTaskStore((s) => s.view);
  const setView = useTaskStore((s) => s.setView);

  const btnClass = (name: ViewType) =>
    `px-4 py-2 rounded-lg border ${
      view === name ? "bg-slate-900 text-white" : "bg-white"
    }`;

  return (
    <div className="flex gap-3 mb-4">
      <button onClick={() => setView("kanban")} className={btnClass("kanban")}>
        Kanban
      </button>
      <button onClick={() => setView("list")} className={btnClass("list")}>
        List
      </button>
      <button
        onClick={() => setView("timeline")}
        className={btnClass("timeline")}
      >
        Timeline
      </button>
    </div>
  );
}