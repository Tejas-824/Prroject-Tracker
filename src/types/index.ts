export type Status = "To Do" | "In Progress" | "In Review" | "Done";
export type Priority = "Critical" | "High" | "Medium" | "Low";

export interface User {
  id: string;
  name: string;
  color: string;
}

export interface Task {
  id: string;
  title: string;
  assignee: string;
  priority: Priority;
  status: Status;
  startDate: string | null;
  dueDate: string;
}

export interface Filters {
  status: string[];
  priority: string[];
  assignee: string[];
  from: string;
  to: string;
}

export interface PresenceUser {
  id: string;
  name: string;
  color: string;
  taskId: string;
}