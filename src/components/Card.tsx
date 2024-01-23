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
      } bg-white shadow-xl lg:py-12 shadow-gray-300/70 rounded-3xl md:pt-0 md:px-0 lg:px-10`}
    >
      <h1 className={`mb-5 text-2xl font-bold text-black ${title ? "block" : "hidden"}`}>
        {title ? title : ""}
      </h1>

      {children}
    </div>
  );
};
