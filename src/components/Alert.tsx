import React from "react";

interface AlertProps {
  message?: string;
  type: "success" | "fail";
}

const Alert: React.FC<AlertProps> = ({ message, type }) => {
  let bgColorClass;

  switch (type) {
    case "success":
      bgColorClass = "bg-green-500 text-md font-medium";
      break;
    case "fail":
      bgColorClass = "bg-red-500 text-md font-medium";
      break;
    default:
      bgColorClass = "bg-gray-500 text-md font-medium";
  }

  return (
    <div
      className={`absolute px-5 py-3 text-center text-white rounded-md ${bgColorClass} top-5 right-5`}
    >
      {message}
    </div>
  );
};

export default Alert;
