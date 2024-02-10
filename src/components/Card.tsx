import React, { ReactNode } from "react";

interface CardProps {
  title?: string;
  customStyle?: string;
  children: ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, customStyle, children }) => {
  return (
    <div
      className={`${
        customStyle ? customStyle : ""
      } bg-white shadow-xl shadow-gray-300/70 rounded-3xl p-5 sm:p-8 lg:px-10 lg:py-12`}
    >
      <h1 className={`mb-5 text-xl sm:text-2xl font-bold text-black ${title ? "block" : "hidden"}`}>
        {title ? title : ""}
      </h1>

      {children}
    </div>
  );
};
