

import { Icon } from "@iconify/react/dist/iconify.js";
import gambar1 from "../assets/images/famous-borobudur-temple-mungkid-indonesia.png"
import gambar2 from "../assets/images/kelingking-beach-sunset-nusa-penida-island-bali-indonesia.png"
import gambar3 from "../assets/images/temple-gates-lempuyang-luhur-temple-bali-indonesia.png"
import React, { useState } from 'react';
import Select from 'react-select';
import HeaderSearchItem from "../components/addPerson";



const options = [
  { value: 'jakarta', label: 'jakarta',  },
  { value: 'Bali', label: 'Bali' },
  { value: 'Jogjakarta', label: 'Jogjakarta' },
];
const options2 = [
  { value: 'ekonomi', label: 'ekonomi',  },
  { value: 'bussines', label: 'bussines' },
  { value: 'executive', label: 'executive' },
];


export default function DumyHome() {
    const [selectedOption] = useState(null);
   

    return (
        <div>
            <header className="">
                <div
                    className="w-full h-[400px] bg-center bg-cover"
                    style={{
                        backgroundImage:
                            'url(https://res.cloudinary.com/de7e1strs/image/upload/v1705758232/samples/dguegrbq5erys6i7ets8.png)',
                    }}
                >
                    <div className="flex  justify-center w-full h-full bg-gray-900 bg-opacity-50 py-12">
                        <div className="text-center">
                            <div className="container px-4 mx-auto">
                                <div className=" mx-auto text-center">
                                    <p className="mt-8 text-white text-center heroText">
                                        Let's Start Booking Your Tickets and Soar to Your Dream Destinations!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div
                className="block w-[80%] mx-auto mt-[-100px] rounded-lg bg-white text-left shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] ">
                <div className="p-6">
                    <div className="flex">
                        <button className="flex items-center text-sm bg-primary-normal px-8 py-2 rounded font-medium text-white ml-auto ">
                            <Icon icon="akar-icons:search" width={16} className="mr-2" />
                            Search
                        </button>

                    </div>

                    <div className="flex grid md:grid-cols-3 sm:grid-cols-1 md:gap-10 sm:gap-5 mt-5 ">
                        <Select
                            placeholder="from"
                            defaultValue={selectedOption}
                            options={options}
                        />
                        <Select
                            placeholder="to"
                            defaultValue={selectedOption}
                            options={options}
                        />
                        <HeaderSearchItem />
                        
                        
                       
                    </div>
                    <div className="flex grid md:grid-cols-3 sm:grid-cols-1 md:gap-10 sm:gap-5 mt-5 ">
                        <input
                            placeholder="Departure Date"
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            type="text"
                            onFocus={(e) => (e.target.type = 'date')}
                            onBlur={(e) => (e.target.type = 'text')}
                            id="date"
                        />
                        <input
                            placeholder="Return Date"
                            className="bg-white border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            type="text"
                            onFocus={(e) => (e.target.type = 'date')}
                            onBlur={(e) => (e.target.type = 'text')}
                            id="date"
                        />
                        <Select
                            placeholder="class"
                            defaultValue={selectedOption}
                            options={options2}
                        />
                        

                       
                    </div>
                </div>
            </div>
         
            <div className="container mx-auto mt-20 mb-20 ">
                <div className="flex justify-center font-Outfit text-2xl font-semibold leading-10 tracking-wide text-left">
                    Top Destinations
                </div>

                <div className="flex mt-10 justify-center">
                    <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-20">
                        <div className=" overflow-hidden">
                            <img
                                src={gambar1}
                                alt="Gambar 1"
                                className="object-cover rounded"
                                style={{
                                    width: '277px',
                                    height: '277px',
                                    top: '928px',
                                    left: '162px',
                                    borderRadius: '20px',
                                }}
                            />

                        </div>
                        <div className=" overflow-hidden">
                            <img
                                src={gambar2}
                                alt={gambar2}
                                className="object-cover rounded"
                                style={{
                                    width: '277px',
                                    height: '277px',
                                    top: '928px',
                                    left: '162px',
                                    borderRadius: '20px',
                                }}
                            />
                        </div>
                        <div className="w-277 h-277 overflow-hidden">
                            <img
                                src={gambar3}
                                alt="Gambar 1"
                                className="object-cover rounded"
                                style={{
                                    width: '277px',
                                    height: '277px',
                                    top: '928px',
                                    left: '162px',
                                    borderRadius: '20px',
                                }}
                            />
                        </div>
                    </div>
                </div>


            </div>
           
        </div>
    );
}
