import { Priority, Status, Task } from "../types";

const titles = [
  "Design dashboard",
  "Fix login bug",
  "Create API docs",
  "Build table view",
  "Update timeline",
  "Test filters",
  "Refactor card layout",
  "Prepare release",
  "Check drag logic",
  "Improve UI spacing",
] as const;

const assignees = ["Aman", "Priya", "Ravi", "Neha", "Karan", "Sneha"] as const;
const priorities: readonly Priority[] = ["Critical", "High", "Medium", "Low"];
const statuses: readonly Status[] = ["To Do", "In Progress", "In Review", "Done"];

function randomIndex(length: number): number {
  return Math.floor(Math.random() * length);
}

function randomItem<T>(arr: readonly T[]): T {
  return arr[randomIndex(arr.length)];
}

function pad2(value: number): string {
  return value < 10 ? `0${value}` : String(value);
}

function formatDateParts(year: number, month: number, day: number): string {
  return `${year}-${pad2(month + 1)}-${pad2(day)}`;
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

export function generateTasks(count: number): Task[] {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = getDaysInMonth(year, month);

  return Array.from({ length: count }, (_, index) => {
    const i = index + 1;
    const hasStartDate = Math.random() >= 0.15;

    let startDate: string | null = null;
    let dueDate: string;

    if (hasStartDate) {
      const startDay = randomIndex(daysInMonth) + 1;
      const maxDuration = Math.min(7, daysInMonth - startDay);
      const duration = randomIndex(maxDuration + 1);
      const dueDay = startDay + duration;

      startDate = formatDateParts(year, month, startDay);
      dueDate = formatDateParts(year, month, dueDay);
    } else {
      const dueDay = randomIndex(daysInMonth) + 1;
      dueDate = formatDateParts(year, month, dueDay);
    }

    return {
      id: `task-${i}`,
      title: `${randomItem(titles)} ${i}`,
      assignee: randomItem(assignees),
      priority: randomItem(priorities),
      status: randomItem(statuses),
      startDate,
      dueDate,
    };
  });
}