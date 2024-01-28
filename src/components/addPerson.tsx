import { Icon } from '@iconify/react/dist/iconify.js';
import React, { useState } from 'react';


interface Options {
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

const CounterOption: React.FC<CounterOptionProps> = ({ label, value, onIncrement, onDecrement }) => (
  <div className="flex items-center justify-between mb-2">
    <div>
      <h3 className="font-medium leading-none text-gray-900">{label}</h3>
      <span className="text-xs font-medium tracking-normal text-gray-500">
        {label === 'dewasa' && '(12 thn atau lebih)'}
        {label === 'anak' && '(2 - 11 thn)'}
        {label === 'bayi' && '(dibawah 2 tahun)'}
      </span>
    </div>
    <div className="flex items-center justify-center">
      <button className="px-2 py-1 text-2xl font-semibold text-blue-600" onClick={onDecrement}>
        &#x2212;
      </button>
      <span className="px-2 py-1 mx-3 text-black bg-white rounded shadow">{value}</span>
      <button className="px-2 py-1 text-2xl font-semibold text-blue-600" onClick={onIncrement}>
        +
      </button>
    </div>
  </div>
);

const HeaderSearchItem: React.FC = () => {
   const [clickPassenger, setClickPassenger] = useState(false);
    // const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState<Options>({ bayi: 0, anak: 0, dewasa: 0, });

    const handleOption = (type: keyof Options, action: 'i' | 'd') => {
        setOptions(prevOptions => ({
            ...prevOptions,
            [type]: action === 'i' ? prevOptions[type] + 1 : Math.max(prevOptions[type] - 1, 0),
        }));
    };
    const handlePassanger = () => {
        setClickPassenger(!clickPassenger);
    };
    return (
        <div className="relative">
            <Icon icon="ic:outline-people" width={24} style={{ position: 'absolute', top: '50%', left: '20px', transform: 'translateY(-50%)' }} />
            <input
                type="text"
                placeholder="Passenger"
                className="bg-white border border-gray-400 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 !h-[55px] pl-14 rounded-[10px]"
                value={`${options.dewasa} Dewasa, ${options.anak} Anak, ${options.bayi} Bayi`}
                onClick={handlePassanger}
            />

            {clickPassenger && (
                <div className="absolute w-full px-5 py-3 mt-3 bg-white border border-gray-400 shadow-sm rounded-xl z-10">
                    <CounterOption label="dewasa" value={options.dewasa} onIncrement={() => handleOption('dewasa', 'i')} onDecrement={() => handleOption('dewasa', 'd')} />
                    <CounterOption label="anak" value={options.anak} onIncrement={() => handleOption('anak', 'i')} onDecrement={() => handleOption('anak', 'd')} />
                    <CounterOption label="bayi" value={options.bayi} onIncrement={() => handleOption('bayi', 'i')} onDecrement={() => handleOption('bayi', 'd')} />
                    <div className="flex items-center justify-end mb-2">
                        <button onClick={() => setClickPassenger(false)} className="px-2 pt-1 text-sm font-semibold text-blue-700">
                            Selesai
                        </button>
                    </div>
                </div>
            )}
        </div>
    );

};



export default HeaderSearchItem;
