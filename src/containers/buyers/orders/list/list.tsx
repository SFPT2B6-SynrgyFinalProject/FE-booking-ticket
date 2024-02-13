import { Icon } from "@iconify/react/dist/iconify.js";
import { ContainerPage } from "../../../../components/common-page/ContainerPage";
import { Link } from "react-router-dom";
import { Card } from "../../../../components/Card";
import { fetchInstance } from "../../../../lib/services/core";
import { useState, useEffect } from "react";
import { IOrders } from "../orders.types";
import Alert from "../../../../components/Alert";

function filterOrdersByDateType(
  data: IOrders[],
  type: "ONGOING" | "COMPLETED"
) {
  const currentDate = new Date();

  // Memeriksa apakah pesanan berada dalam rentang waktu yang sesuai dengan jenis yang diberikan
  const filteredOrders = data.filter((order) => {
    const departureTime = new Date(order.departure.dateTime);
    console.log(departureTime, currentDate);
    if (type === "ONGOING") {
      // Memeriksa pesanan yang waktu keberangkatannya setelah tanggal saat ini
      return departureTime > currentDate;
    } else if (type === "COMPLETED") {
      // Memeriksa pesanan yang waktu keberangkatannya sebelum atau sama dengan tanggal saat ini
      return departureTime <= currentDate;
    }
    return false; // Mengembalikan false jika jenis yang diberikan tidak valid
  });

  return filteredOrders;
}

export default function Order() {
  const [status, setStatus] = useState<"COMPLETED" | "ONGOING">("ONGOING");
  const [data, setData] = useState<IOrders[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  async function get() {
    setLoading(true);
    setStatus(status);
    const response = await fetchInstance({
      method: "GET",
      endpoint: `/api/orders?status=COMPLETED`,
      authToken: localStorage.getItem("user_access_token") ?? "",
    });
    console.log(response);
    const showData = filterOrdersByDateType(response.data.orders, status);
    console.log(showData);
    setData(showData);
    setLoading(false);
  }

  useEffect(() => {
    get();
  }, [status]);

  return (
    <>
      <ContainerPage>
        <Card customStyle="sm:px-0">
          <div className="border-b-2 w-full border-gray-500/70 pb-8 mt-2 mb-10">
            <div className="flex flex-col lg:flex-row items-center justify-between">
              {status === "ONGOING" && (
                <h3
                  className="pl-10 font-bold text-2xl"
                  onClick={() => setStatus("ONGOING")}
                >
                  Pesanan Anda
                </h3>
              )}
              <div className="flex flex-row">
                {status === "COMPLETED" ? (
                  <h3
                    className="pl-10 font-bold text-2xl"
                    onClick={() => setStatus("ONGOING")}
                  >
                    <Icon
                      icon="material-symbols-light:chevron-left"
                      width={30}
                    />
                  </h3>
                ) : null}
                <h3
                  className="pl-10 font-bold text-2xl text-primary-bright"
                  onClick={() => setStatus("COMPLETED")}
                >
                  Riwayat Pesanan
                </h3>
              </div>
            </div>
          </div>
          {isLoading ? (
            <>
              <Alert message="Memuat data" type="process" />
            </>
          ) : data.length < 1 ? (
            <>No Data</>
          ) : (
            data.map((riwayat) => {
              return (
                <div className="bg-[#F5F5F5] flex flex-col lg:flex-row items-center border rounded-3xl shadow-xl p-5 mb-5 w-4/5 mx-auto gap-6 lg:gap-14">
                  <figure className="ml-5 mb-14">
                    <Icon icon="tabler:plane" width={24} color="#3355cc" />
                  </figure>
                  <section className="font-semibold text-sm flex flex-col gap-6 lg:gap-6 grow">
                    <p>Order id : {riwayat?.orderId ?? "Kosong"}</p>
                    <div className="flex flex-col lg:flex-row">
                      <p>{riwayat?.departure?.city ?? "Kosong"}</p>
                      <p className="mx-5">
                        <Icon icon="icons8:arrows-long-right" width={20} />
                      </p>
                      <p>{riwayat?.arrival?.city ?? "Kosong"}</p>
                    </div>
                    <div className="flex flex-col lg:flex-row justify-between">
                      <p className="p-1 rounded-xl bg-primary-light cursor-pointer w-fit self-end lg:self-start text-gray-500">
                        {riwayat?.paymentStatus ?? "Kosong"}
                      </p>
                      <Link
                        to={`/pesanan/riwayat/${riwayat?.orderId ?? "ae9f18d"}`}
                        className="text-primary-bright"
                      >
                        Lihat Disini
                      </Link>
                    </div>
                  </section>
                </div>
              );
            })
          )}
        </Card>
      </ContainerPage>
    </>
  );
}
