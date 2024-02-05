import React from "react";

interface InputRadioProps {
  label?: string;
  id: string;
  name: string;
  value?: string;
  checked?: boolean;
  customStyle?: string;
  customStyleLabel?: string;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputRadioComponent: React.FC<InputRadioProps> = ({
  label,
  id,
  name,
  value,
  checked,
  customStyle,
  required,
  customStyleLabel,
  onChange = () => {},
}) => {
  return (
    <>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        className={`${customStyle ? customStyle : ""} w-5 h-5`}
        checked={checked}
        required={required}
        onChange={onChange}
      />
      <label
        htmlFor={id}
        className={`${
          customStyleLabel ? customStyleLabel : ""
        } ml-2 sm:ml-3 sm:text-lg text-gray-800 select-none`}
      >
        {label}
      </label>
    </>
  );
};
