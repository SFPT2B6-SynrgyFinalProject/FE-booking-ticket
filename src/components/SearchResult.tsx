import { Icon } from "@iconify/react/dist/iconify.js";

export default function SearchResult() {
    return (
        <>
            <div className="search-result-container flex flex-col gap-5 lg:col-span-2">
                <div className="result-card rounded-[30px] lg:h-[200px] grid lg:grid-cols-4 max-sm:gap-8">
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
                        <a href="" className="text-base text-primary-normal font-outfit">Lihat Detail</a>
                    </div>
                </div>
                <div className="result-card rounded-[30px] lg:h-[200px] grid lg:grid-cols-4 max-sm:gap-8">
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
                        <a href="" className="text-base text-primary-normal font-outfit">Lihat Detail</a>
                    </div>
                </div>
                <div className="result-card rounded-[30px] lg:h-[200px] grid lg:grid-cols-4 max-sm:gap-8">
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
                        <a href="" className="text-base text-primary-normal font-outfit">Lihat Detail</a>
                    </div>
                </div>
            </div>
        </>
    )
}