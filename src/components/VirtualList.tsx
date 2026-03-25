import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Task } from "../types";

const ROW_HEIGHT = 56;
const BUFFER = 5;
const CONTAINER_HEIGHT = 500;

export default function VirtualList({
  tasks,
  renderRow,
}: {
  tasks: Task[];
  renderRow: (task: Task) => React.ReactNode;
}) {
  const [scrollTop, setScrollTop] = useState(0);
  const frameRef = useRef<number | null>(null);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const nextScrollTop = e.currentTarget.scrollTop;

    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
    }

    frameRef.current = requestAnimationFrame(() => {
      setScrollTop(nextScrollTop);
    });
  }, []);

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  const { startIndex, endIndex, visibleItems } = useMemo(() => {
    const start = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - BUFFER);
    const end = Math.min(
      tasks.length,
      Math.ceil((scrollTop + CONTAINER_HEIGHT) / ROW_HEIGHT) + BUFFER
    );

    return {
      startIndex: start,
      endIndex: end,
      visibleItems: tasks.slice(start, end),
    };
  }, [scrollTop, tasks]);

  const topSpace = startIndex * ROW_HEIGHT;
  const bottomSpace = (tasks.length - endIndex) * ROW_HEIGHT;

  return (
    <div
      className="border rounded-lg overflow-auto bg-white"
      style={{ height: CONTAINER_HEIGHT }}
      onScroll={handleScroll}
    >
      <div style={{ height: topSpace }} />
      {visibleItems.map((task) => renderRow(task))}
      <div style={{ height: bottomSpace }} />
    </div>
  );
}