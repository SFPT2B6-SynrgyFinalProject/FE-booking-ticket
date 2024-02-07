import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";

interface OptionPersonAgeType {
  bayi: number;
  anak: number;
  dewasa: number;
}

interface CounterOptionProps {
  label: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

const CounterOption: React.FC<CounterOptionProps> = ({
  label,
  value,
  onIncrement,
  onDecrement,
}) => (
  <div className="flex items-center justify-between mb-2">
    <div>
      <h3 className="font-medium leading-none text-gray-600">{label}</h3>
      <span className="text-xs font-medium tracking-normal text-gray-500">
        {label === "dewasa" && "(12 thn atau lebih)"}
        {label === "anak" && "(2 - 11 thn)"}
        {label === "bayi" && "(dibawah 2 tahun)"}
      </span>
    </div>
    <div className="flex items-center justify-center">
      <button
        className="px-2 py-1 text-2xl font-semibold text-blue-600"
        onClick={onDecrement}
        type="button"
      >
        &#x2212;
      </button>
      <span className="px-2 py-1 mx-3 text-black bg-white rounded shadow">
        {value}
      </span>
      <button
        className="px-2 py-1 text-2xl font-semibold text-blue-600"
        onClick={onIncrement}
        type="button"
      >
        +
      </button>
    </div>
  </div>
);

interface HeaderSearchItemProps {
  optionPersonAgeUser: OptionPersonAgeType;
  handleOptionPersonUser: (
    type: keyof OptionPersonAgeType,
    action: "i" | "d"
  ) => void;
}

const HeaderSearchItem: React.FC<HeaderSearchItemProps> = ({
  optionPersonAgeUser,
  handleOptionPersonUser,
}) => {
  const [clickPassenger, setClickPassenger] = useState(false);
  const handlePassanger = () => {
    setClickPassenger(!clickPassenger);
  };
  return (
    <div className="relative">
      <Icon
        icon="ci:users"
        width={23}
        style={{
          position: "absolute",
          top: "50%",
          left: "20px",
          transform: "translateY(-50%)",
        }}
        className="text-gray-600"
      />
      <input
        type="text"
        placeholder="Passenger"
        className="bg-white border border-gray-400 text-gray-700 font-medium text-sm focus:border-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 !h-[55px] pl-14 rounded-[10px] focus:outline-none"
        value={`${optionPersonAgeUser.dewasa} Dewasa, ${optionPersonAgeUser.anak} Anak, ${optionPersonAgeUser.bayi} Bayi`}
        onClick={handlePassanger}
      />

      {clickPassenger && (
        <div className="absolute w-full px-5 py-3 mt-3 bg-white border border-slate-200 shadow-lg rounded-xl z-10">
          <CounterOption
            label="dewasa"
            value={optionPersonAgeUser.dewasa}
            onIncrement={() => handleOptionPersonUser("dewasa", "i")}
            onDecrement={() => handleOptionPersonUser("dewasa", "d")}
          />
          <CounterOption
            label="anak"
            value={optionPersonAgeUser.anak}
            onIncrement={() => handleOptionPersonUser("anak", "i")}
            onDecrement={() => handleOptionPersonUser("anak", "d")}
          />
          <CounterOption
            label="bayi"
            value={optionPersonAgeUser.bayi}
            onIncrement={() => handleOptionPersonUser("bayi", "i")}
            onDecrement={() => handleOptionPersonUser("bayi", "d")}
          />
          <div className="flex items-center justify-end mb-2">
            <button
              onClick={() => setClickPassenger(false)}
              className="px-2 pt-1 text-sm font-medium text-blue-700"
            >
              Selesai
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderSearchItem;
export type { OptionPersonAgeType };
