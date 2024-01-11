import React from 'react';
import { Icon } from '@iconify/react';

interface InputProps {
    type: string;
    placeholder: string;
    disabled?: boolean;
    customStyle?: string;
    icon?: string;
    iconPosition?: 'left' | 'right'; // The icon position
}

const InputComponent: React.FC<InputProps> = ({
    type,
    placeholder,
    disabled = false,
    customStyle = '',
    icon,
    iconPosition = 'right',
}) => {
    const isIconLeft = iconPosition === 'left';

    return (
            <div className={`flex items-center relative ${isIconLeft ? 'flex-row-reverse' : ''}`}>
                {icon && (
                    <Icon
                        width={24}
                        height={24}
                        color='#1C1C1E'
                        icon={icon}
                        className={`mr-2 absolute ${isIconLeft ? 'left-5' : 'right-5'}`}
                    />
                )}
                <input
                    type={type}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={`${customStyle} appearance-none border rounded-[10px] w-full py-[14px] pr-[27px] text-gray-700 border-[#757575] leading-tight focus:outline-none focus:shadow-outline pl-[27px] ${isIconLeft ? 'pl-[50px]' : 'pl-[27px]'} ${disabled ? 'bg-gray-300 cursor-not-allowed' : ''} 
                    `}
                />
            </div>
    );
};

export default InputComponent;
