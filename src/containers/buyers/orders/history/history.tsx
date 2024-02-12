import { Icon } from "@iconify/react/dist/iconify.js";
import { ContainerPage } from "../../../../components/common-page/ContainerPage";
import { Card } from "../../../../components/Card";
import Button from "../../../../components/Button";
import { fetchInstance } from "../../../../lib/services/core";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { IOrders } from "../orders.types";
import DownloadTicket from "../../../../components/DownloadTicket";

export default function History() {
  const { orderId } = useParams();
  console.log(orderId);

  const [riwayat, setRiwayat] = useState<IOrders>({});
  const [isLoading, setLoading] = useState<boolean>(true);

  async function get() {
    setLoading(true);
    const response = await fetchInstance({
      method: "GET",
      endpoint: `/api/orders/details?orderId=${orderId}`,
      authToken: localStorage.getItem("user_access_token") ?? "",
    });
    console.log(response.data);
    setRiwayat(response);
    setLoading(false);
  }

  useEffect(() => {
    get();
  }, [orderId]);

  return (
    <>
      <ContainerPage>
        <Card customStyle="sm:px-0">
          <div className="border-b-2 w-full border-gray-500/70 pb-8 mt-2 mb-10">
            <div className="flex flex-col lg:flex-row items-center">
              <Link to="/pesanan">
                <h3 className="pl-2 font-bold text-2xl">
                  <Icon icon="material-symbols-light:chevron-left" width={30} />
                </h3>
              </Link>
              <h3 className="p-3 font-bold text-2xl">Detail Pesanan Anda</h3>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row items-center justify-center">
            <div className="ml-12 lg:w-1/2">
              <h4 className="mb-5 pb-5 font-bold text-xl">
                Keberangkatan & Penumpang
              </h4>
              <div className="">
                <p className="font-bold text-sm py-4">
                  Order id: {riwayat?.orderId ?? "Kosong"}
                </p>
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
                      <p className="font-semibold text-lg">
                        Sen, 15 Jan 19 : 40
                      </p>
                      <p className="text-sm">
                        Soekarno Hatta International Airport
                      </p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-sm py-8">1j 45m</p>
                    </div>
                    <div className="flex flex-col">
                      <p className="font-semibold text-lg">
                        Sen, 15 Jan22 : 25
                      </p>
                      <p className="text-sm">
                        Ngurah Rai International Airport
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="font-bold text-sm mt-4 pt-4">
                1. Mr. Nama Penumpang
              </p>
            </div>
            <div className="ml-12 lg:w-1/2">
              <h3 className="mb-5 pb-5 font-bold text-xl">Detail Pembayaran</h3>
              <div className="grid grid-cols-2 gap-x-20 mr-5">
                <div className="grid grid-flow-row gap-y-3 sm:gap-y-8">
                  <span className="font-semibold text-sm">
                    Harga Dewasa (x1)
                  </span>
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
              <div className="flex flex-col gap-3">
                <Button
                  className="mx-auto"
                  type="primary-dark"
                  color="primary-dark"
                >
                  Unduh Bukti Pembayaran
                </Button>
                {!isLoading && <DownloadTicket dataFlightOrder={riwayat} />}
              </div>
            </div>
          </div>
        </Card>
      </ContainerPage>
    </>
  );
}
