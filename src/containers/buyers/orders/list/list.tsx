import { Icon } from "@iconify/react/dist/iconify.js";
import { ContainerPage } from "../../../../components/common-page/ContainerPage";
import { Link } from "react-router-dom";
import { Card } from "../../../../components/Card";
import useAction from "./list.hooks";
import Skeleton from "react-loading-skeleton";

export default function Order() {
  const { orders, getLoading, loading } = useAction();
  const reversedOrders = [...orders].reverse();

  return (
    <>
      <ContainerPage>
        <Card customStyle="sm:px-0">
          <div className="w-full pb-8 mt-2 mb-10 border-b-2 border-gray-500/70">
            <div className="flex items-center">
              <h3 className="pl-10 text-2xl font-bold">Pesanan Anda</h3>
              {/* <div className="flex flex-row">
                <h3 className="pl-10 text-2xl font-bold text-primary-bright">Riwayat Pesanan</h3>
              </div> */}
            </div>
          </div>
          {loading || getLoading.isLoading ? (
            <>
              <Skeleton className="flex items-center w-4/5 mx-auto mb-3 h-44 rounded-2xl" />
              <Skeleton className="flex items-center w-4/5 mx-auto h-44 rounded-2xl" />
            </>
          ) : (
            <>
              {reversedOrders.map((flight, index) => (
                <div
                  key={index}
                  className="bg-[#F5F5F5] flex flex-col lg:flex-row items-center border rounded-3xl shadow-xl py-6 px-8 mb-10 w-4/5 mx-auto gap-6 lg:gap-14"
                >
                  <div className="ml-0 sm:ml-3">
                    <Icon icon="tabler:plane" width={34} color="#3355cc" />
                  </div>

                  <section className="flex flex-col items-center gap-6 font-semibold lg:items-stretch lg:gap-6 grow">
                    <p className="uppercase">{flight.orderId}</p>
                    <div className="flex flex-col items-center gap-y-2 lg:gap-y-0 lg:flex-row">
                      <p>{flight.departure.city}</p>
                      <p className="mx-5">
                        <Icon icon="icons8:arrows-long-right" width={20} />
                      </p>
                      <p>{flight.arrival.city}</p>
                    </div>
                    <div className="flex flex-col items-center justify-between lg:flex-row">
                      <p className="self-end px-3 py-1 mb-3 text-sm text-gray-600 rounded-xl bg-primary-light w-fit lg:self-start lg:mb-0">
                        {flight.paymentStatus === "paid"
                          ? "E-tiket sudah terbit"
                          : "Tiket belum bayar"}
                      </p>
                      <Link
                        id={flight.orderId}
                        to={`/pesanan/riwayat/${flight.orderId}`}
                        className="text-primary-bright"
                      >
                        Lihat Detail
                      </Link>
                    </div>
                  </section>
                </div>
              ))}
            </>
          )}
        </Card>
      </ContainerPage>
    </>
  );
}
