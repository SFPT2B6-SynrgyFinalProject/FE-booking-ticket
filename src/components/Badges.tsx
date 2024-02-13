import React from "react";

interface BadgeProps {
  type: "success" | "fail" | "pending" | "tertunda" | "dibatalkan" | "tepat waktu";
  message: string;
}
const Badge: React.FC<BadgeProps> = ({ type, message }) => {
  let bgColorClass;
  switch (type.trim().toLowerCase()) {
    case "success":
    case "tepat waktu":
      bgColorClass = "bg-green-100 text-green-700";
      break;
    case "fail":
    case "dibatalkan":
      bgColorClass = "bg-red-500 text-red-700";
      break;
    case "pending":
    case "tertunda":
      bgColorClass = "bg-yellow-500 text-yellow-700";
      break;
    default:
      bgColorClass = "bg-gray-500 text-gray-700";
  }
  return (
    <div
      className={`my-2 align-middle !text-center inline-flex items-center rounded-md  px-2.5 py-1 text-l font-normal ring-1 ring-inset ring-gray-200 ${bgColorClass} `}
    >
      {message}
    </div>
  );
};

export default Badge;
