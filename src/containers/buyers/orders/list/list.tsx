import { Icon } from "@iconify/react/dist/iconify.js";
import { ContainerPage } from "../../../../components/common-page/ContainerPage";
import { Link } from "react-router-dom";
import { Card } from "../../../../components/Card";
import useAction from "./list.hooks";

export default function Order() {
  const { orders } = useAction();
  console.log(orders);

  return (
    <>
      <ContainerPage>
        <Card customStyle="sm:px-0">
          <div className="border-b-2 w-full border-gray-500/70 pb-8 mt-2 mb-10">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              <h3 className="pl-10 font-bold text-2xl">Pesanan Anda</h3>
              <h3 className="pl-10 font-bold text-2xl text-primary-bright">Riwayat Pesanan</h3>
            </div>
          </div>
          <div className="bg-[#F5F5F5] flex flex-col lg:flex-row items-center border rounded-3xl shadow-xl p-5 mb-5 w-4/5 mx-auto gap-6 lg:gap-14">
            <figure className="ml-5 mb-14">
              <Icon icon="tabler:plane" width={24} color="#3355cc" />
            </figure>
            <section className="font-semibold text-sm flex flex-col gap-6 lg:gap-6 grow">
              <p>Order id : 12345678</p>
              <div className="flex flex-col lg:flex-row">
                <p>Jakarta</p>
                <p className="mx-5">
                  <Icon icon="icons8:arrows-long-right" width={20} />
                </p>
                <p>Denpasar</p>
              </div>
              <div className="flex flex-col lg:flex-row justify-between">
                <p className="p-1 rounded-xl bg-primary-light cursor-pointer w-fit self-end lg:self-start text-gray-500">
                  E-ticket sudah terbit
                </p>
                <Link to="/pesanan/riwayat" className="text-primary-bright">
                  Lihat Disini
                </Link>
              </div>
            </section>
          </div>
          <div className="bg-[#F5F5F5] flex flex-col lg:flex-row items-center border rounded-3xl shadow-xl p-5 mb-5 w-4/5 mx-auto gap-6 lg:gap-14">
            <figure className="ml-5 mb-14">
              <Icon icon="tabler:plane" width={24} color="#3355cc" />
            </figure>
            <section className="font-semibold text-sm flex flex-col gap-6 lg:gap-6 grow">
              <p>Order id : 12345678</p>
              <div className="flex flex-col lg:flex-row">
                <p>Jakarta</p>
                <p className="mx-5">
                  <Icon icon="icons8:arrows-long-right" width={20} />
                </p>
                <p>Denpasar</p>
              </div>
              <div className="flex flex-col lg:flex-row justify-between">
                <p className="p-1 rounded-xl bg-primary-light cursor-pointer w-fit self-end lg:self-start text-gray-500">
                  E-ticket sudah terbit
                </p>
                <Link to="/pesanan/riwayat" className="text-primary-bright">
                  Lihat Disini
                </Link>
              </div>
            </section>
          </div>
        </Card>
      </ContainerPage>
    </>
  );
}
