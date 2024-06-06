import { formatDatetimeToHoursMinutes } from "@/utils/date";

interface IBubbleChat {
  role: "sender" | "receiver";
  message: string;
  time: string;
}

export default function BubbleChat({ role, message, time }: IBubbleChat) {
  const variant = {
    sender: {
      justify: "justify-end",
      bg: "bg-green-secondary",
    },
    receiver: {
      justify: "justify-start",
      bg: "bg-gray-light",
    },
  };

  const s = variant[role];

  return (
    <div className={`w-full flex px-40 ${s.justify}`}>
      <div
        className={`relative w-fit max-w-80 mb-1 pr-20 p-2 ${s.bg} rounded-[6px]`}
      >
        {message}
        <span className="absolute right-2 bottom-2 text-xs text-[rgb(220,220,220)]">
          {formatDatetimeToHoursMinutes(time)}
        </span>
      </div>
    </div>
  );
}
