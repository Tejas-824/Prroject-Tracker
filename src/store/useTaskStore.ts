import { create } from "zustand";
import { seedTasks } from "../data/seed";
import { Filters, PresenceUser, Task } from "../types";

export type ViewType = "kanban" | "list" | "timeline";
export type SortKey = "title" | "priority" | "dueDate";
export type SortDirection = "asc" | "desc";

interface TaskState {
  tasks: Task[];
  view: ViewType;
  filters: Filters;
  sortKey: SortKey;
  sortDirection: SortDirection;
  presence: PresenceUser[];
  setView: (view: ViewType) => void;
  setFilters: (filters: Filters) => void;
  updateTaskStatus: (taskId: string, status: Task["status"]) => void;
  setSort: (key: SortKey) => void;
  setPresence: (users: PresenceUser[]) => void;
}

const defaultFilters: Filters = {
  status: [],
  priority: [],
  assignee: [],
  from: "",
  to: "",
};

function arePresenceUsersEqual(a: PresenceUser[], b: PresenceUser[]) {
  if (a === b) return true;
  if (a.length !== b.length) return false;

  for (let i = 0; i < a.length; i++) {
    if (a[i].id !== b[i].id || a[i].name !== b[i].name) return false;
  }

  return true;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: seedTasks as Task[], 
  view: "kanban",
  filters: defaultFilters,
  sortKey: "title",
  sortDirection: "asc",
  presence: [],

  setView: (view) => set((state) => (state.view === view ? state : { view })),

  setFilters: (filters) => set({ filters }),

  updateTaskStatus: (taskId, status) =>
    set((state) => {
      let changed = false;

      const updated = state.tasks.map((task) => {
        if (task.id !== taskId) return task;
        if (task.status === status) return task;

        changed = true;
        return { ...task, status };
      });

      return changed ? { tasks: updated } : state;
    }),

  setSort: (key) =>
    set((state) => ({
      sortKey: key,
      sortDirection:
        state.sortKey === key && state.sortDirection === "asc"
          ? "desc"
          : "asc",
    })),

  setPresence: (users) =>
    set((state) =>
      arePresenceUsersEqual(state.presence, users)
        ? state
        : { presence: users }
    ),
}));