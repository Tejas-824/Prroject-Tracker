import { User, Task } from "../types";
import { generateTasks } from "./generator";

export const users: User[] = [
  { id: "u1", name: "Aman", color: "#ef4444" },
  { id: "u2", name: "Priya", color: "#3b82f6" },
  { id: "u3", name: "Ravi", color: "#10b981" },
  { id: "u4", name: "Neha", color: "#f59e0b" },
  { id: "u5", name: "Karan", color: "#8b5cf6" },
  { id: "u6", name: "Sneha", color: "#ec4899" },
];

export const seedTasks: readonly Task[] = generateTasks(500);