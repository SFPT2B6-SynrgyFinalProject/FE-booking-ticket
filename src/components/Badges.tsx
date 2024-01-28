import React from "react";

interface BadgeProps {
    type: "success" | "fail" |"pending" | "tertunda" | "dibatalkan" |"tepat waktu";
    message: string;
}
const Badge: React.FC<BadgeProps> = ({ type, message }) => {
    let bgColorClass;
    switch (type.trim().toLowerCase()) {
        case "success":
        case "tepat waktu":
            bgColorClass = "bg-green-500";
            break;
        case "fail":
        case "dibatalkan":
            bgColorClass = "bg-red-500";
            break;
        case "pending":
        case "tertunda":
            bgColorClass = "bg-yellow-500";
            break;
        default:
            bgColorClass = "bg-gray-500";
    }
    return (
        <div
            className={`my-2  align-middle !text-center inline-flex items-center rounded-md  px-2 py-1 text-l font-medium text-white ring-1 ring-inset ring-gray-500/10 ${bgColorClass} `}
        >
            {message}
        </div>
    );
};

export default Badge;