import React, { ReactNode } from "react";

interface ContainerPageProps {
  customStyle?: string;
  children: ReactNode;
}

export const ContainerPage: React.FC<ContainerPageProps> = ({ customStyle, children }) => {
  return (
    <div className={`${customStyle ? customStyle : ""} container my-12 sm:mt-20 sm:mb-24`}>
      <div className="py-0">{children}</div>
    </div>
  );
};
