import React, { ButtonHTMLAttributes, ReactNode } from "react";
import classNames from "classnames";
import { Icon } from "@iconify/react";
import { IconifyIcon } from "@iconify/react/dist/offline";

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  children: ReactNode;
  type?: "primary" | "secondary" | "tertiary" | "text" | "primary-dark" | "danger";
  color?:
  | "danger"
  | "primary-normal"
  | "primary-dark"
  | "primary-bright"
  | "primary-light"
  | "primary-v"
  | "primary-v-dark"
  | "primary-v-bright"
  | "primary-v-light"
  | "secondary-normal"
  | "secondary-dark"
  | "secondary-bright"
  | "secondary-light"
  | "secondary-v"
  | "secondary-v-dark"
  | "secondary-v-bright"
  | "secondary-v-light"
  | "tertiary-normal"
  | "tertiary-dark"
  | "tertiary-bright"
  | "tertiary-light"
  | "tertiary-v"
  | "tertiary-v-dark"
  | "tertiary-v-bright"
  | "tertiary-v-light"
  | "text";
  size?: "xs" | "sm" | "base" | "md" | "lg";
  width?: "default" | "full";
  icon?: IconifyIcon; // Use IconifyIcon type for Iconify icons
  className?: string; // Add className prop for custom classes
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = "primary",
  color = "primary-normal",
  size = "base",
  width = "default",
  icon,
  className,
  ...rest
}) => {
  const sizeClasses = {
    xs: "text-sm font-semibold py-[8px] px-[24px] rounded-lg",
    sm: "text-sm font-bold py-[8px] px-[30px]",
    base: "text-base",
    md: "text-md py-[14px] px-[60px]",
    lg: "text-lg py-[16px] px-[66px] rounded-[34px]",
  };

  const colorClasses = {
    "danger":"bg-[#CB3A31] text-white",
    "primary-normal": "bg-primary-normal text-white",
    "primary-dark": "bg-primary-dark text-white hover:bg-blue-800",
    "primary-bright": "bg-primary-bright text-white",
    "primary-light": "bg-primary-light text-white",
    "primary-v": "bg-violet-normal text-white",
    "primary-v-dark": "bg-violet-dark text-white",
    "primary-v-bright": "bg-violet-bright text-white",
    "primary-v-light": "bg-violet-light text-white",
    "secondary-normal": "bg-white text-primary-normal",
    "secondary-dark": "text-primary-dark bg-white",
    "secondary-bright": "text-primary-bright bg-white",
    "secondary-light": "text-primary-light bg-white",
    "secondary-v": "text-violet-normal bg-white",
    "secondary-v-dark": "text-violet-dark bg-white",
    "secondary-v-bright": "text-violet-bright bg-white",
    "secondary-v-light": "text-violet-light bg-white",
    "tertiary-normal": "bg-transparent border border-white text-white",
    "tertiary-dark": "bg-transparent border border-primary-dark text-primary-dark",
    "tertiary-bright": "bg-transparent border border-primary-bright text-primary-bright",
    "tertiary-light": "bg-transparent border border-primary-light text-primary-light",
    "tertiary-v": "bg-transparent border border-violet-normal text-violet-normal",
    "tertiary-v-dark": "bg-transparent border border-violet-dark text-violet-dark",
    "tertiary-v-bright": "bg-transparent border border-violet-bright text-violet-bright",
    "tertiary-v-light": "bg-transparent border border-violet-light text-violet-dark",
    text: "bg-transparent text-white",
  };

  const widthClasses = {
    default: "w-fit",
    full: "w-full justify-center",
  };

  const typeClasses = {
    danger:"bg-[#CB3A31] text-white",
    primary: "bg-primary-normal text-white",
    "primary-dark": "bg-primary-dark text-white",
    secondary: "bg-white text-primary-normal",
    tertiary: "bg-transparent border border-white text-white",
    text: "bg-transparent text-white",
  };

  const buttonClasses = classNames(
    "flex items-center gap-2 font-medium py-[13px] px-[55px] rounded-[27px]",
    sizeClasses[size],
    typeClasses[type],
    colorClasses[color],
    widthClasses[width],
    className, // Add custom classes
    {
      "!bg-[#d3d3d3] text-white cursor-not-allowed": rest.disabled, // Default disabled styles
      "cursor-not-allowed !bg-transparent border-[#d3d3d3] opacity-70 text-[#d3d3d3]":
        rest.disabled && type === "tertiary",
      "!bg-transparent opacity-70 cursor-not-allowed": rest.disabled && type === "text",
    }
  );

  return (
    <button className={buttonClasses} {...rest}>
      {icon && <Icon icon={icon} />} {/* Display Iconify icon if provided */}
      {children}
    </button>
  );
};

export default Button;
