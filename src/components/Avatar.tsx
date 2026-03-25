import { getInitials } from "../utils/date";

interface Props {
  name: string;
  color?: string;
  small?: boolean;
}

export default function Avatar({ name, color = "#334155", small }: Props) {
  return (
    <div
      className={`rounded-full text-white flex items-center justify-center font-bold ${small ? "w-7 h-7 text-xs" : "w-9 h-9 text-sm"}`}
      style={{ background: color }}
    >
      {getInitials(name)}
    </div>
  );
}