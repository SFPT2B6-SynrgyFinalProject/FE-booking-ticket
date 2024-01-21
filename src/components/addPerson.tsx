import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPerson } from '@fortawesome/free-solid-svg-icons';

interface Options {
  bayi: number;
  anak: number;
  dewasa: number;
}

const CounterOption: React.FC<{ label: string; value: number; onIncrement: () => void; onDecrement: () => void }> = ({ label, value, onIncrement, onDecrement }) => (
    <div className="optionItem flex items-center mt-2 bottom-line">
        <span className="optionText">{label}</span>
        <div className="optionCounter  justify-space-between tex-end ml-auto ">
            

                <button
                    disabled={value <= 0}
                    className="optionCounterButton"
                    onClick={onDecrement}
        
                >
                    -
                </button>
                <span className="optionCounterNumber">{value}</span>
                <button className="optionCounterButton" onClick={onIncrement}>
                    +
                </button>
          
        </div>
      
        
        
    </div>
);

const HeaderSearchItem: React.FC = () => {
    const [openOptions, setOpenOptions] = useState(false);
    const [options, setOptions] = useState<Options>({ bayi: 0, anak: 0, dewasa: 0, });

    const handleOption = (type: keyof Options, action: 'i' | 'd') => {
        setOptions(prevOptions => ({
            ...prevOptions,
            [type]: action === 'i' ? prevOptions[type] + 1 : Math.max(prevOptions[type] - 1, 0),
        }));
    };

    return (
        <div className="bg-white border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
            <FontAwesomeIcon icon={faPerson} className="headerIcon mr-2 text-gray-400" />
            <span
                onClick={() => setOpenOptions(!openOptions)}
                className="headerSearchText"
            >{`${options.bayi} bayi · ${options.anak} anak · ${options.dewasa} dewasa`}</span>
            {openOptions && (
                <div className="mt-2">
                    <CounterOption label="bayi" value={options.bayi} onIncrement={() => handleOption('bayi', 'i')} onDecrement={() => handleOption('bayi', 'd')} />
                    <CounterOption label="anak" value={options.anak} onIncrement={() => handleOption('anak', 'i')} onDecrement={() => handleOption('anak', 'd')} />
                    <CounterOption label="dewasa" value={options.dewasa} onIncrement={() => handleOption('dewasa', 'i')} onDecrement={() => handleOption('dewasa', 'd')} />
                </div>
            )}
        </div>
    );
};

export default HeaderSearchItem;
