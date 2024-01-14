// Example usage in another component
import React from 'react';
import Button from './Button';
import { Icon } from '@iconify/react/dist/iconify.js';
import InputComponent from './Input';

const MyComponent: React.FC = () => {
    return (
        <div className='flex justify-start flex-col px-10 py-8'>
            <h1 className="title text-4xl mb-4">Button Components</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 bg-[#222] rounded-[64px] p-10 gap-14">
                <div className='flex flex-col gap-4'>
                    <h4 className='text-xl text-white'>Button Size</h4>
                    <div className="flex flex-col gap-3 items-center">
                        <Button type='primary' size="lg" disabled>Large</Button>
                        <Button type='primary' size="md">Medium</Button>
                        <Button type='primary' size="base">Normal</Button>
                        <Button type='primary' size="sm">Small</Button>
                    </div>
                </div>
                <div className='flex flex-col gap-4'>
                    <h4 className='text-xl text-white'>Button Split - Enable</h4>
                    <div className="flex flex-col gap-3 items-center">
                        <Button type='primary' color="primary-normal">Primary</Button>
                        <Button type='secondary' color="secondary-v">Secondary</Button>
                        <Button type='tertiary' color="tertiary-normal">Tertiary</Button>
                        <Button type='text' color="text">Button Text</Button>
                    </div>
                </div>
                <div className='flex flex-col gap-4'>
                    <h4 className='text-xl text-white'>Split Button - With Icon</h4>
                    <div className="flex flex-col gap-3 items-center">
                        <Button type='primary' color="primary-dark">Primary <Icon icon="tabler:arrow-right" width={24} height={24} /></Button>
                        <Button type='secondary' color="secondary-normal">Secondary<Icon icon="tabler:arrow-right" width={24} height={24} /></Button>
                        <Button type='tertiary'>Tertiary <Icon icon="tabler:arrow-right" width={24} height={24} /></Button>
                        <Button type='text'>Button Text <Icon icon="tabler:arrow-right" width={24} height={24} /></Button>
                    </div>
                </div>
                <div className='flex flex-col gap-4'>
                    <h4 className='text-xl text-white'>Full width button - Enable</h4>
                    <div className="flex flex-col gap-3 items-center">
                        <Button type='primary' width='full' color="primary-normal">Primary</Button>
                        <Button type='secondary' width='full' color="secondary-normal">Secondary</Button>
                        <Button type='tertiary' width='full' color="tertiary-normal">Tertiary</Button>
                        <Button type='text' width='full' color="text">Button Text</Button>
                    </div>
                </div>
                <div className='flex flex-col gap-4'>
                    <h4 className='text-xl text-white'>Full width button - With Icon</h4>
                    <div className="flex flex-col gap-3 items-center">
                        <Button type='primary' width='full' color="primary-normal">Primary <Icon icon="tabler:arrow-right" width={24} height={24} /></Button>
                        <Button type='secondary' width='full' color="secondary-normal">Secondary <Icon icon="tabler:arrow-right" width={24} height={24} /></Button>
                        <Button type='tertiary' width='full' color="tertiary-normal">Tertiary <Icon icon="tabler:arrow-right" width={24} height={24} /></Button>
                        <Button type='text' width='full' color="text">Button Text <Icon icon="tabler:arrow-right" width={24} height={24} /></Button>
                    </div>
                </div>
                <div className='flex flex-col gap-4'>
                    <h4 className='text-xl text-white'>Full width button - Disable</h4>
                    <div className="flex flex-col gap-3 items-center">
                        <Button type='primary' width='full' color="primary-normal" disabled>Primary <Icon icon="tabler:arrow-right" width={24} height={24} /></Button>
                        <Button type='secondary' width='full' color="secondary-normal" disabled>Secondary <Icon icon="tabler:arrow-right" width={24} height={24} /></Button>
                        <Button type='tertiary' width='full' color="tertiary-normal" disabled>Tertiary <Icon icon="tabler:arrow-right" width={24} height={24} /></Button>
                        <Button type='text' width='full' color="text" disabled>Button Text <Icon icon="tabler:arrow-right" width={24} height={24} /></Button>
                    </div>
                </div>
            </div>

            <h1 className="title text-4xl mb-4 mt-20">Input Components</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 bg-[#fff] border border-[#ddd] shadow-xl rounded-[64px] p-10 gap-14">
                <div className='flex flex-col gap-4'>
                    <p>Input with icon - left</p>
                    <InputComponent type="text" placeholder="Username" icon="mingcute:eye-line" iconPosition='left' />
                    <p>Input with icon - right</p>
                    <InputComponent type="email" placeholder="Enter your email" icon="eva:email-outline" iconPosition='right' />
                    <p>Input disabled</p>
                    <InputComponent type="password" placeholder="Enter your password" disabled />
                </div>
                <div className='flex flex-col gap-4'>
                    <p>Input rounded large</p>
                    <InputComponent type="text" placeholder="Username" customStyle='!rounded-[40px]' />
                </div>
                <div className='flex flex-col gap-4'>

                </div>
                <div className='flex flex-col gap-4'>

                </div>
                <div className='flex flex-col gap-4'>

                </div>
                <div className='flex flex-col gap-4'>

                </div>
            </div>

        </div>
    );
};

export default MyComponent;
