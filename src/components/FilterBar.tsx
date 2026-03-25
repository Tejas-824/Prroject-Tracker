import { useEffect, useMemo, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { users } from "../data/seed";
import { useTaskStore } from "../store/useTaskStore";
import { getFiltersFromQuery, setQueryFromFilters } from "../utils/query";

const STATUSES = ["To Do", "In Progress", "In Review", "Done"];
const PRIORITIES = ["Critical", "High", "Medium", "Low"];

const EMPTY_FILTERS = {
  status: [],
  priority: [],
  assignee: [],
  from: "",
  to: "",
};

export default function FilterBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const filters = useTaskStore((state) => state.filters);
  const setFilters = useTaskStore((state) => state.setFilters);

  useEffect(() => {
    const nextFilters = getFiltersFromQuery(location.search);

    const isSame =
      JSON.stringify(nextFilters) === JSON.stringify(filters);

    if (!isSame) {
      setFilters(nextFilters);
    }
  }, [location.search, filters, setFilters]);

  const updateUrl = useCallback(
    (nextFilters: typeof filters) => {
      const query = setQueryFromFilters(nextFilters);
      navigate(query ? `?${query}` : "", { replace: true });
    },
    [navigate]
  );

  const updateMulti = useCallback(
    (field: "status" | "priority" | "assignee", value: string) => {
      const current = filters[field];
      const updated = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];

      const next = { ...filters, [field]: updated };
      setFilters(next);
      updateUrl(next);
    },
    [filters, setFilters, updateUrl]
  );

  const updateDate = useCallback(
    (field: "from" | "to", value: string) => {
      const next = { ...filters, [field]: value };
      setFilters(next);
      updateUrl(next);
    },
    [filters, setFilters, updateUrl]
  );

  const hasActive = useMemo(() => {
    return Boolean(
      filters.status.length ||
        filters.priority.length ||
        filters.assignee.length ||
        filters.from ||
        filters.to
    );
  }, [filters]);

  const clearAll = useCallback(() => {
    setFilters(EMPTY_FILTERS);
    navigate("", { replace: true });
  }, [navigate, setFilters]);

  return (
    <div className="bg-white border rounded-lg p-4 mb-4 space-y-4">
      <div>
        <p className="font-semibold mb-2">Status</p>
        <div className="flex gap-2 flex-wrap">
          {STATUSES.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => updateMulti("status", item)}
              className={`px-3 py-1 rounded-full border ${
                filters.status.includes(item)
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white"
              }`}
              aria-pressed={filters.status.includes(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="font-semibold mb-2">Priority</p>
        <div className="flex gap-2 flex-wrap">
          {PRIORITIES.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => updateMulti("priority", item)}
              className={`px-3 py-1 rounded-full border ${
                filters.priority.includes(item)
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white"
              }`}
              aria-pressed={filters.priority.includes(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="font-semibold mb-2">Assignee</p>
        <div className="flex gap-2 flex-wrap">
          {users.map((user) => (
            <button
              key={user.id}
              type="button"
              onClick={() => updateMulti("assignee", user.name)}
              className={`px-3 py-1 rounded-full border ${
                filters.assignee.includes(user.name)
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white"
              }`}
              aria-pressed={filters.assignee.includes(user.name)}
            >
              {user.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-3 flex-wrap items-end">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">From</span>
          <input
            type="date"
            value={filters.from}
            onChange={(e) => updateDate("from", e.target.value)}
            className="border rounded-lg px-3 py-2"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">To</span>
          <input
            type="date"
            value={filters.to}
            onChange={(e) => updateDate("to", e.target.value)}
            className="border rounded-lg px-3 py-2"
          />
        </label>

        {hasActive && (
          <button
            type="button"
            onClick={clearAll}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Clear All Filters
          </button>
        )}
      </div>
    </div>
  );
}