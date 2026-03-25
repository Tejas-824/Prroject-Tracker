import * as React from "react";
import { Task } from "../types";

const colors: Record<string, string> = {
  Critical: "bg-red-500",
  High: "bg-orange-500",
  Medium: "bg-yellow-500",
  Low: "bg-green-500",
};

export default function TimelineView({ tasks }: { tasks: Task[] }) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return (
    <div className="overflow-auto border rounded-xl bg-white">
      <div className="min-w-[1200px]">
        <div
          className="grid"
          style={{
            gridTemplateColumns: `220px repeat(${daysInMonth}, minmax(40px, 1fr))`,
          }}
        >
          <div className="p-3 font-bold border-b">Task</div>

          {Array.from({ length: daysInMonth }).map((_, i) => (
            <div key={i} className="p-2 text-center text-sm border-b">
              {i + 1}
            </div>
          ))}

          {tasks.map((task) => {
            const due = new Date(task.dueDate).getDate();
            const start = task.startDate
              ? new Date(task.startDate).getDate()
              : due;

            return (
              <React.Fragment key={task.id}>
                <div className="p-3 border-b text-sm">{task.title}</div>

                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const show = day >= start && day <= due;

                  return (
                    <div key={i} className="border-b border-l h-12">
                      {show && (
                        <div
                          className={`h-6 mt-3 rounded ${colors[task.priority]}`}
                        />
                      )}
                    </div>
                  );
                })}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}