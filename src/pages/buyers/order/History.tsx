import { Icon } from "@iconify/react/dist/iconify.js";
import { ContainerPage } from "../../../components/common-page/ContainerPage";
import { Card } from "../../../components/Card";
import Button from "../../../components/Button";

export default function History() {
  return (
    <>
      <ContainerPage>
        <Card customStyle="sm:px-0">
          <div className="border-b-2 w-full border-gray-500/70 pb-8 mt-2 mb-10">
            <div className="flex flex-col lg:flex-row items-center justify-center">
              <h3 className="pl-2 font-bold text-2xl">
                <Icon icon="material-symbols-light:chevron-left" width={30} />
              </h3>
              <h3 className="p-3 font-bold text-2xl">Detail Pesanan Anda</h3>
              <Button className="!px-12 bg-red-600 mr-3 sm:mr-5 ml-auto">Hapus Riwayat</Button>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-center">
            <div className="ml-12 lg:w-1/2">
              <h4 className="mb-5 pb-5 font-bold text-xl">Keberangkatan & Penumpang</h4>
              <div className="">
                <p className="font-bold text-sm py-4">Order id: 12345678</p>
                <div className="flex">
                  <div className="flex my-auto">
                    <p className="font-semibold text-sm">1j 45m</p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex  flex-col items-center p-2">
                      <div className="border border-dashed border-gray-800 h-40"></div>
                      <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-col">
                      <p className="font-semibold text-lg">Sen, 15 Jan 19 : 40</p>
                      <p className="text-sm">Soekarno Hatta International Airport</p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-sm py-8">1j 45m</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="font-semibold text-lg">Sen, 15 Jan22 : 25</p>
                      <p className="text-sm">Ngurah Rai International Airport</p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="font-bold text-sm mt-4 pt-4">1. Mr. Nama Penumpang</p>
            </div>
            <div className="ml-12 lg:w-1/2">
              <h3 className="mb-5 pb-5 font-bold text-xl">Detail Pembayaran</h3>
              <div className="grid grid-cols-2 gap-x-20 mr-5">
                <div className="grid grid-flow-row gap-y-3 sm:gap-y-8">
                  <span className="font-semibold text-sm">Harga Dewasa (x1)</span>
                  <span className="font-semibold text-sm">Diskon</span>
                  <span className="font-semibold text-sm">Pajak</span>
                  <span className="font-semibold text-sm">Total</span>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <span className="font-semibold text-sm">Rp. 720.346 </span>
                  <span className="font-semibold text-sm">-Rp. 20.000 </span>
                  <span className="font-semibold text-sm">Termasuk</span>
                  <span className="font-semibold text-sm">Rp. 700.346 </span>
                </div>
              </div>
              <Button className="mx-auto my-4 bg-primary-bright">Unduh Bukti Pembayaran</Button>
              <Button className="mx-auto my-4 bg-primary-bright">Unduh E-tiket</Button>
            </div>
          </div>
        </Card>
      </ContainerPage>
    </>
  );
}
