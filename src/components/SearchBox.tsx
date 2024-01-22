import React, { useState, FormEvent } from 'react';

interface SearchBoxProps {}

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
                        <div className="search-controller flex justify-between">
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
                            <button type="submit" className="text-white bg-primary-normal py-2 px-3 rounded-[10px]">
                                Search
                            </button>
                        </div>
                        <div className="search-items grid grid-cols-11 gap-x-14 gap-y-[13px] mt-6">
                            <div className="form-group col-span-4">
                                <input type="text" className='form-control w-full border border-neutral-600 py-[14px] px-[18px] text-neutral-600 rounded-[10px] outline-none' placeholder='From' />
                            </div>
                            <div className="form-group col-span-4">
                                <input type="text" className='form-control w-full border border-neutral-600 py-[14px] px-[18px] text-neutral-600 rounded-[10px] outline-none' placeholder='To' />
                            </div>
                            <div className="form-group col-span-3">
                                <input type="text" className='form-control w-full border border-neutral-600 py-[14px] px-[18px] text-neutral-600 rounded-[10px] outline-none' placeholder='Passanger' />
                            </div>
                            <div className="form-group col-span-4">
                                <input type="text" className='form-control w-full border border-neutral-600 py-[14px] px-[18px] text-neutral-600 rounded-[10px] outline-none' placeholder='Departure Date' />
                            </div>
                            <div className="form-group col-span-4">
                                <input type="text" className='form-control w-full border border-neutral-600 py-[14px] px-[18px] text-neutral-600 rounded-[10px] outline-none' placeholder='Returning Date' />
                            </div>
                            <div className="form-group col-span-3">
                                <input type="text" className='form-control w-full border border-neutral-600 py-[14px] px-[18px] text-neutral-600 rounded-[10px] outline-none' placeholder='Class' />
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        </>
    );
};

export default SearchBox;
