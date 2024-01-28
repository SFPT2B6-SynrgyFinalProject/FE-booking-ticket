import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from 'react';

function ResultCard() {
    const [isExpanded, setExpanded] = useState(false);

    const handleExpandToggle = () => {
        setExpanded(!isExpanded);
    };
    return (
        <>
            <div className="result-card rounded-[30px]">
                <div className={`result-card_summary lg:h-[200px] grid lg:grid-cols-4 max-sm:gap-8 ${isExpanded ? 'shadow-md' : ''}`}>
                    <div className="lg:col-span-3 h-full px-6 py-4">
                        <div className="h-1/2 grid grid-cols-5 gap-7">
                            <div className="col-span-1"></div>
                            <div className="col-span-2">
                                <img src="https://ik.imagekit.io/1ishtw6qg/Logo-Garuda-Indonesia-removebg%201.png?updatedAt=1705937478614" className="mx-auto" alt="garuda" />
                            </div>
                            <div className="col-span-1"></div>
                            <div className="col-span-1"></div>
                        </div>
                        <div className="h-1/2 grid grid-cols-5 gap-7">
                            <div className="col-span-1 text-center">
                                <h2 className="time text-[22px] text-neutral-800 font-outfit leading-7">19 : 40</h2>
                                <p className="mt-3 text-neutral-800 font-outfit font-semibold">CGK</p>
                            </div>
                            <div className="col-span-2 text-center">
                                <p className="text-sm text-neutral-900 font-outfit leading-[26px] tracking-[-0.15px]">1j 45m</p>
                                <div className="relative border-t-2 border-dotted border-[#222] my-[4px]">
                                    <div className="absolute right-0 -top-1 w-[6px] aspect-square rounded-full bg-[#222]"></div>
                                </div>
                                <p className="text-sm text-neutral-900 font-outfit leading-[26px] tracking-[-0.15px]">Langsung</p>
                            </div>
                            <div className="col-span-1 text-center">
                                <h2 className="time text-[22px] text-neutral-800 font-outfit leading-7">22 : 25</h2>
                                <p className="mt-3 text-neutral-800 font-outfit font-semibold">DPS</p>
                            </div>
                            <div className="col-span-1">
                                <div className="rounded py-[4px] px-[2px] shadow-sm flex gap-1 items-center w-fit bg-gray-100">
                                    <Icon icon="ri:luggage-cart-line" /><p className="text-sm font-outfit text-neutral-800">20</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-1 h-full max-md:border-t-2 lg:border-l-2 border-[#222] border-dotted flex flex-col max-sm:gap-4 justify-between items-center py-5">
                        <h6 className="text-base text-neutral-800 font-outfit">Total Harga</h6>
                        <div className="text-end">
                            <span className="text-sm text-neutral-800 font-outfit font-semibold line-through">IDR 720.346</span>
                            <p className="font-medium text-xl text-secondary-danger font-outfit">IDR 700.346 <span className="text-base text-neutral-800">/ pax</span></p>
                        </div>
                        <p onClick={handleExpandToggle} className="text-base text-primary-normal font-outfit cursor-pointer">Lihat Detail</p>
                    </div>
                </div>
                {isExpanded && (
                    <div className="result-card_detail px-10 py-8 grid grid-cols-1 lg:grid-cols-2 md:gap-x-20 gap-y-16 md:gap-y-6">
                        <div className="flight-detail col-span-1">
                            <h2 className="font-sans text-neutral-800 font-semibold">Detail Penerbangan</h2>
                            <div className="mt-10">
                                <div className="flex items-center gap-3">
                                    <div className="flex-shrink-0">
                                        <p className="text-sm font-normal text-neutral-800 font-outfit">1j 45m</p>
                                    </div>
                                    <div className="flex flex-col gap-9 pl-3 border-l-2 border-[#444] border-dotted relative">
                                        <div className="absolute w-3 h-3 rounded-full bg-[#444] -left-[7px] -bottom-1"></div>
                                        <div>
                                            <h6 className="font-sans font-semibold text-neutral-800">Sen, 15 Jan 19 : 40</h6>
                                            <p className="text-xs text-neutral-900 font-sans">Soekarno Hatta International Airport</p>
                                        </div>
                                        <div className="flex gap-2 items-center">
                                            <Icon icon="fa6-solid:cart-flatbed-suitcase" />
                                            <div>
                                                <p className="text-xs text-neutral-900 font-sans font-semibold">Bagasi 20 kg</p>
                                                <p className="text-xs text-neutral-900 font-sans font-semibold">Bagasi Kabin 7 kg</p>
                                            </div>
                                        </div>
                                        <div>
                                            <h6 className="font-sans font-semibold text-neutral-800">Sen, 15 Jan22 : 25</h6>
                                            <p className="text-xs text-neutral-900 font-sans">Ngurah Rai International Airport</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="price-detail col-span-1">
                            <h2 className="font-sans text-neutral-800 font-semibold">Detail Harga</h2>
                            <div className="mt-10 flex flex-col gap-4">
                                <div className="flex justify-between w-full text-sm text-neutral-700 text-sans">
                                    <p>Harga Dewasa (x1)</p><p>IDR 720.346</p>
                                </div>
                                <div className="flex justify-between w-full text-sm text-neutral-700 text-sans">
                                    <p>Diskon</p><p>-IDR 20.000</p>
                                </div>
                                <div className="flex justify-between w-full text-sm text-neutral-700 text-sans">
                                    <p>Pajak</p><p>Termasuk</p>
                                </div>
                                <div className="flex justify-between w-full text-sm text-neutral-700 text-sans">
                                    <p>Total</p><p>IDR 700.346 </p>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-2 w-full flex justify-end">
                            <a href="" className="block py-2 px-4 rounded-[10px] bg-primary-normal font-outfit text-white font-medium">
                                Pilih Tiket
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default function SearchResult() {
    return (
        <>
            <div className="search-result-container flex flex-col gap-5 lg:col-span-2">
                <ResultCard />
                <ResultCard />
                <ResultCard />
                <ResultCard />
            </div>
        </>
    )
}