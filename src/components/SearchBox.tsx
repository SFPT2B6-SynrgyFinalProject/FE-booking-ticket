import React, { useState, FormEvent } from 'react';
import InputComponent from './Input';

interface SearchBoxProps { }

const SearchBox: React.FC<SearchBoxProps> = () => {
    const [selectedOption, setSelectedOption] = useState<string>('round-trip');

    const handleOptionChange = (option: string) => {
        setSelectedOption((prevOption) => (prevOption === option ? '' : option));
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault(); // Prevents the default form submission behavior
        // Your form submission logic goes here
    };

    return (
        <>
            <section className="mt-36">
                <div className="container">
                    <form
                        className="searchbox-container font-outfit rounded-[30px] py-[27px] px-[22px]"
                        onSubmit={handleSubmit}
                    >
                        <div className="search-controller flex flex-col md:flex-row justify-between">
                            <div className="flex gap-8">
                                <button
                                    onClick={() => handleOptionChange('round-trip')}
                                    className={`p-[10px] border rounded-tr-[1px] rounded-br-[15px] rounded-bl-[4px] rounded-tl-[15px] border-[#757575] text-neutral-900 ${selectedOption === 'round-trip' ? 'bg-primary-normal !text-white' : ''
                                        }`}
                                >
                                    Round Trip
                                </button>
                                <button
                                    onClick={() => handleOptionChange('one-way')}
                                    className={`p-[10px] border rounded-tr-[1px] rounded-br-[15px] rounded-bl-[4px] rounded-tl-[15px] border-[#757575] text-neutral-900 ${selectedOption === 'one-way' ? 'bg-primary-normal !text-white' : ''
                                        }`}
                                >
                                    One Way
                                </button>
                            </div>
                            <button type="submit" className="text-white bg-primary-normal max-sm:hidden lg:py-2 px-3 rounded-[10px] mt-4 md:mt-0">
                                Search
                            </button>
                        </div>
                        <div className="search-items grid grid-cols-1 md:grid-cols-11 gap-x-4 md:gap-x-14 gap-y-[13px] mt-6">
                            <div className="form-group lg:col-span-4">
                                <InputComponent type="text" placeholder="From" icon="mingcute:flight-takeoff-line" iconPosition="left" />
                            </div>
                            <div className="form-group lg:col-span-4">
                                <InputComponent type="text" placeholder="To" icon="mingcute:flight-land-line" iconPosition="left" />
                            </div>
                            <div className="form-group lg:col-span-3">
                                <InputComponent type="text" placeholder="Passenger" icon="solar:user-rounded-broken" iconPosition="left" />
                            </div>
                            <div className="form-group lg:col-span-4">
                                <InputComponent type="text" placeholder="Departure Date" icon="lets-icons:date-range" iconPosition="left" />
                            </div>
                            <div className="form-group lg:col-span-4">
                                <InputComponent type="text" placeholder="Returning Date" icon="lets-icons:date-range" iconPosition="left" />
                            </div>
                            <div className="form-group lg:col-span-3">
                                <InputComponent type="text" placeholder="Class" icon="ph:office-chair" iconPosition="left" />
                            </div>
                            <div className="form-group lg:hidden">
                                <button type="submit" className="text-white bg-primary-normal w-full py-3 px-3 rounded-[10px] mt-4 md:mt-0">
                                    Search
                                </button>
                            </div>

                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};

export default SearchBox;
