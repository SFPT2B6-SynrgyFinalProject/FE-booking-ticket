import { Icon } from "@iconify/react/dist/iconify.js";
import { ContainerPage } from "../../components/common-page/ContainerPage";
import { Card } from "../../components/Card";

export default function Notification() {
  return (
    <>
      <ContainerPage>
        <Card customStyle="sm:px-0">
          <div className="border-b-2 w-full border-gray-500/70 pb-8 mt-2 mb-10">
            <h3 className="pl-10 font-bold text-2xl">Notifikasi</h3>
          </div>
          <div className="bg-[#F5F5F5] flex flex-col lg:flex-row items-center border rounded-3xl shadow-xl p-10 mb-10 w-4/5 mx-auto gap-6 lg:gap-14">
            <figure className="p-2 bg-blue-700 rounded-full">
              <Icon
                icon="iconamoon:discount-light"
                width={70}
                className="text-white"
              />
            </figure>
            <section className="font-semibold text-sm flex flex-col gap-6 lg:gap-10 grow">
              <p>
                Nikmati potongan hingga 80% untuk pembelian tiket pesawat dengan
                rute berikut!
              </p>
              <p className="text-[#7698ff] cursor-pointer w-fit self-end lg:self-start">
                Lihat Detail
              </p>
            </section>
          </div>
          <div className="bg-[#F5F5F5] flex flex-col lg:flex-row items-center border rounded-3xl shadow-xl p-10 mb-10 w-4/5 mx-auto gap-6 lg:gap-14">
            <figure className="p-2 bg-blue-700 rounded-full">
              <Icon
                icon="iconamoon:discount-light"
                width={70}
                className="text-white"
              />
            </figure>
            <section className="font-semibold text-sm flex flex-col gap-6 lg:gap-10 grow">
              <p>
                Nikmati potongan hingga 80% untuk pembelian tiket pesawat dengan
                rute berikut!
              </p>
              <p className="text-[#7698ff] cursor-pointer w-fit self-end lg:self-start">
                Lihat Detail
              </p>
            </section>
          </div>
          <div className="bg-[#F5F5F5] flex flex-col lg:flex-row items-center border rounded-3xl shadow-xl p-10 mb-10 w-4/5 mx-auto gap-6 lg:gap-14">
            <figure className="p-2 bg-blue-700 rounded-full">
              <Icon
                icon="iconamoon:discount-light"
                width={70}
                className="text-white"
              />
            </figure>
            <section className="font-semibold text-sm flex flex-col gap-6 lg:gap-10 grow">
              <p>
                Nikmati potongan hingga 80% untuk pembelian tiket pesawat dengan
                rute berikut!
              </p>
              <p className="text-[#7698ff] cursor-pointer w-fit self-end lg:self-start">
                Lihat Detail
              </p>
            </section>
          </div>
          <div className="bg-[#F5F5F5] flex flex-col lg:flex-row items-center border rounded-3xl shadow-xl p-10 mb-10 w-4/5 mx-auto gap-6 lg:gap-14">
            <figure className="p-2 bg-blue-700 rounded-full">
              <Icon
                icon="iconamoon:discount-light"
                width={70}
                className="text-white"
              />
            </figure>
            <section className="font-semibold text-sm flex flex-col gap-6 lg:gap-10 grow">
              <p>
                Nikmati potongan hingga 80% untuk pembelian tiket pesawat dengan
                rute berikut!
              </p>
              <p className="text-[#7698ff] cursor-pointer w-fit self-end lg:self-start">
                Lihat Detail
              </p>
            </section>
          </div>
        </Card>
      </ContainerPage>
    </>
  );
}
