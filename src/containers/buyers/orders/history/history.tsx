import { Icon } from "@iconify/react/dist/iconify.js";
import { ContainerPage } from "../../../../components/common-page/ContainerPage";
import { Card } from "../../../../components/Card";
import Button from "../../../../components/Button";
import useAction from "./history.hooks";

export default function History() {
  const { orderHistory } = useAction();
  console.log(orderHistory);

  return (
    <>
      <ContainerPage>
        <Card customStyle="sm:px-0">
          <div className="w-full pb-8 mt-2 mb-10 border-b-2 border-gray-500/70">
            <div className="flex flex-col items-center justify-center lg:flex-row">
              <h3 className="pl-2 text-2xl font-bold">
                <Icon icon="material-symbols-light:chevron-left" width={30} />
              </h3>
              <h3 className="p-3 text-2xl font-bold">Detail Pesanan Anda</h3>
              <Button className="!px-12 bg-red-600 mr-3 sm:mr-5 ml-auto">Hapus Riwayat</Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center lg:flex-row">
            <div className="ml-12 lg:w-1/2">
              <h4 className="pb-5 mb-5 text-xl font-bold">Keberangkatan & Penumpang</h4>
              <div className="">
                <p className="py-4 text-sm font-bold">Order id: 12345678</p>
                <div className="flex">
                  <div className="flex my-auto">
                    <p className="text-sm font-semibold">1j 45m</p>
                  </div>
                  <div className="flex items-center">
                    <div className="flex flex-col items-center p-2">
                      <div className="h-40 border border-gray-800 border-dashed"></div>
                      <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-col">
                      <p className="text-lg font-semibold">Sen, 15 Jan 19 : 40</p>
                      <p className="text-sm">Soekarno Hatta International Airport</p>
                    </div>
                    <div className="flex items-center">
                      <p className="py-8 text-sm">1j 45m</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="text-lg font-semibold">Sen, 15 Jan22 : 25</p>
                      <p className="text-sm">Ngurah Rai International Airport</p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="pt-4 mt-4 text-sm font-bold">1. Mr. Nama Penumpang</p>
            </div>
            <div className="ml-12 lg:w-1/2">
              <h3 className="pb-5 mb-5 text-xl font-bold">Detail Pembayaran</h3>
              <div className="grid grid-cols-2 mr-5 gap-x-20">
                <div className="grid grid-flow-row gap-y-3 sm:gap-y-8">
                  <span className="text-sm font-semibold">Harga Dewasa (x1)</span>
                  <span className="text-sm font-semibold">Diskon</span>
                  <span className="text-sm font-semibold">Pajak</span>
                  <span className="text-sm font-semibold">Total</span>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <span className="text-sm font-semibold">Rp. 720.346 </span>
                  <span className="text-sm font-semibold">-Rp. 20.000 </span>
                  <span className="text-sm font-semibold">Termasuk</span>
                  <span className="text-sm font-semibold">Rp. 700.346 </span>
                </div>
              </div>
              <Button id="unduh-bukti-pembayaran" className="mx-auto my-4 bg-primary-bright">
                Unduh Bukti Pembayaran
              </Button>
              <Button id="unduh-e-tiket" className="mx-auto my-4 bg-primary-bright">
                Unduh E-tiket
              </Button>
            </div>
          </div>
        </Card>
      </ContainerPage>
    </>
  );
}
