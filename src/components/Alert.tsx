import React from "react";

interface AlertProps {
  message?: string;
  type: "success" | "fail";
  customStyle?: string;
}

const Alert: React.FC<AlertProps> = ({ message, type, customStyle }) => {
  let bgColorClass;

  switch (type) {
    case "success":
      bgColorClass = "bg-green-500 text-md font-medium";
      break;
    case "fail":
      bgColorClass = "bg-red-500 text-md font-medium";
      break;
    default:
      bgColorClass = "bg-blue-500 text-md font-medium";
  }

  return (
    <div
      className={`${
        customStyle ? customStyle : "absolute"
      } z-50 whitespace-pre-line px-5 py-3 text-center text-white rounded-md ${bgColorClass} top-5 right-5`}
    >
      {message}
    </div>
  );
};

export default Alert;
