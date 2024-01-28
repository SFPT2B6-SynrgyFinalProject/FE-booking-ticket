import { Icon } from "@iconify/react/dist/iconify.js";

export default function SearchFilter() {
    return (
        <>
            <div className="search-filter-container lg:col-span-1 bg-white py-[45px] px-[51px] rounded-[30px] h-fit">
                <header className="flex justify-between">
                    <div className="flex gap-4">
                        <Icon icon="mingcute:filter-line" className="w-[24px] h-[24px] text-neutral-800" />
                        <h3 className="text-xl font-sans text-neutral-800 font-semibold">Filter</h3>
                    </div>
                    <button className="font-sans text-neutral-800 font-semibold">Reset</button>
                </header>
                <div>
                    <h4 className="font-sans text-neutral-800 font-semibold mt-5">Maskapai</h4>
                    <div className="flex flex-col gap-[18px] p-[10px] pl-[23px]">
                        <div className="flex justify-between"><p className="font-sans text-neutral-800">Garuda Indonesia</p><input type="checkbox" className="w-5 h-5" /></div>
                        <div className="flex justify-between"><p className="font-sans text-neutral-800">Citilink</p><input type="checkbox" className="w-5 h-5" /></div>
                        <div className="flex justify-between"><p className="font-sans text-neutral-800">Batik Air</p><input type="checkbox" className="w-5 h-5" /></div>
                        <div className="flex justify-between"><p className="font-sans text-neutral-800">Air Asia</p><input type="checkbox" className="w-5 h-5" /></div>
                    </div>
                    <h4 className="font-sans text-neutral-800 font-semibold mt-5">Waktu Berangkat</h4>
                    <div className="flex flex-col gap-[18px] p-[10px] pl-[23px]">
                        <div className="flex justify-between"><p className="font-sans text-neutral-800">00:00 - 06:00</p><input type="checkbox" className="w-5 h-5" /></div>
                        <div className="flex justify-between"><p className="font-sans text-neutral-800">06:00 - 12:00</p><input type="checkbox" className="w-5 h-5" /></div>
                        <div className="flex justify-between"><p className="font-sans text-neutral-800">12:00 - 18:00</p><input type="checkbox" className="w-5 h-5" /></div>
                        <div className="flex justify-between"><p className="font-sans text-neutral-800">18:00 - 24:00</p><input type="checkbox" className="w-5 h-5" /></div>
                    </div>
                    <h4 className="font-sans text-neutral-800 font-semibold mt-5">Waktu Tiba</h4>
                    <div className="flex flex-col gap-[18px] p-[10px] pl-[23px]">
                        <div className="flex justify-between"><p className="font-sans text-neutral-800">00:00 - 06:00</p><input type="checkbox" className="w-5 h-5" /></div>
                        <div className="flex justify-between"><p className="font-sans text-neutral-800">06:00 - 12:00</p><input type="checkbox" className="w-5 h-5" /></div>
                        <div className="flex justify-between"><p className="font-sans text-neutral-800">12:00 - 18:00</p><input type="checkbox" className="w-5 h-5" /></div>
                        <div className="flex justify-between"><p className="font-sans text-neutral-800">18:00 - 24:00</p><input type="checkbox" className="w-5 h-5" /></div>
                    </div>
                    <h4 className="font-sans text-neutral-800 font-semibold mt-5">Urutkan Berdasarkan</h4>
                    <div className="flex flex-col gap-[18px] p-[10px] pl-[23px]">
                        <div className="flex justify-between"><p className="font-sans text-neutral-800">Harga Terendah</p><input type="checkbox" className="w-5 h-5" /></div>
                        <div className="flex justify-between"><p className="font-sans text-neutral-800">Durasi Terpendek</p><input type="checkbox" className="w-5 h-5" /></div>
                    </div>
                </div>
            </div>
        </>
    )
}