import { memo } from "react";
import { useTaskStore } from "../store/useTaskStore";
import Avatar from "./Avatar";

function PresenceBarComponent() {
  const presence = useTaskStore((state) => state.presence);
  const count = presence.length;

  return (
    <div className="bg-white border rounded-lg p-3 flex items-center justify-between mb-4">
      <p className="text-sm font-medium">
        {count} {count === 1 ? "person is" : "people are"} viewing this board
      </p>

      <div
        className="flex -space-x-2"
        aria-label={`${count} active users viewing this board`}
      >
        {presence.map((user) => (
          <Avatar key={user.id} name={user.name} color={user.color} small />
        ))}
      </div>
    </div>
  );
}

const PresenceBar = memo(PresenceBarComponent);
export default PresenceBar;