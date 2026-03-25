export function getInitials(name: string) {
  return name
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((item) => item[0])
    .join("")
    .toUpperCase();
}

function getTodayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function isToday(dateStr: string) {
  return getTodayStr() === dateStr;
}

export function overdueDays(dateStr: string) {
  const today = new Date();
  const due = new Date(dateStr);

  // normalize time to avoid partial day issues
  today.setHours(0, 0, 0, 0);
  due.setHours(0, 0, 0, 0);

  const diff = today.getTime() - due.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

export function formatDue(dateStr: string) {
  if (isToday(dateStr)) return "Due Today";

  const days = overdueDays(dateStr);

  if (days > 0) {
    if (days > 7) return `${days} days overdue`;
    return `${days}d overdue`;
  }

  return dateStr;
}