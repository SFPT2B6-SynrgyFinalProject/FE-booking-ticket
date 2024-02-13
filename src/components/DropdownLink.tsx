import { Menu } from "@headlessui/react";
import React from "react";
import { Link } from "react-router-dom";

interface DropdownLinkProps {
  to: string;
  customStyle?: string;
  children: string;
  onClick?: () => void;
  id?: string;
}

export const DropdownLink: React.FC<DropdownLinkProps> = ({ to, customStyle, children, onClick, id }) => {
  return (
    <Menu.Item>
      <Link
        id={id}
        to={to}
        className={`block px-4 py-2 text-black hover:text-blue-700 ${
          customStyle ? customStyle : ""
        }`}
        onClick={onClick}
      >
        {children}
      </Link>
    </Menu.Item>
  );
};
