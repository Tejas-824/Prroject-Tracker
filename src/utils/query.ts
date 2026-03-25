import { Filters } from "../types";

export function getFiltersFromQuery(search: string): Filters {
  const params = new URLSearchParams(search);

  const parseArray = (key: string) =>
    params.get(key)?.split(",").filter(Boolean) ?? [];

  return {
    status: parseArray("status"),
    priority: parseArray("priority"),
    assignee: parseArray("assignee"),
    from: params.get("from") ?? "",
    to: params.get("to") ?? "",
  };
}

export function setQueryFromFilters(filters: Filters) {
  const params = new URLSearchParams();

  const setArray = (key: string, values: string[]) => {
    if (values.length) params.set(key, values.join(","));
  };

  setArray("status", filters.status);
  setArray("priority", filters.priority);
  setArray("assignee", filters.assignee);

  if (filters.from) params.set("from", filters.from);
  if (filters.to) params.set("to", filters.to);

  return params.toString();
}