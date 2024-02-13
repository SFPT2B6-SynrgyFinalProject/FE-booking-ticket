import { Icon } from "@iconify/react/dist/iconify.js";
import { ContainerPage } from "../../../../components/common-page/ContainerPage";
import { Card } from "../../../../components/Card";
import Button from "../../../../components/Button";
import { fetchInstance } from "../../../../lib/services/core";
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { DataHistory } from "../orders.types";
import Alert from "../../../../components/Alert";
import DownloadTicket from "../../../../components/DownloadTicket";

function calculateFlightTime(
  departureDateTime: string,
  arrivalDateTime: string
) {
  const departureTime: any = new Date(departureDateTime);
  const arrivalTime: any = new Date(arrivalDateTime);

  // Menghitung selisih waktu antara kedatangan dan keberangkatan dalam milidetik
  const timeDifference: number = arrivalTime - departureTime;

  // Mengonversi waktu selisih dari milidetik ke jam, menit, dan detik
  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  return { hours, minutes, seconds };
}

export default function History() {
  const { orderId } = useParams();
  console.log(orderId);

  const [riwayat, setRiwayat] = useState<DataHistory>({
    orderId: "",
    orderer: {
      fullName: "",
      phoneNumber: "",
      email: "",
    },
    flightDetails: {
      departure: {
        airportId: 0,
        airportName: "",
        dateTime: "",
        city: "",
        code: "",
      },
      arrival: {
        airportId: 0,
        airportName: "",
        dateTime: "",
        city: "",
        code: "",
      },
      airline: {
        name: "",
        iconUrl: "",
        airlineId: 0,
      },
      flightCode: "",
    },
    passengerDetails: {
      adult: [],
      child: [],
      infant: [],
      passengerTotal: 0,
    },
    priceDetails: {
      basePriceBreakdown: {
        adult: { passengerCount: 0, price: 0 },
        child: { passengerCount: 0, price: 0 },
        infant: { passengerCount: 0, price: 0 },
      },
      totalDicount: 0,
      tax: 0,
      total: 0,
    },
    paymentStatus: "",
    facility: [],
    luggage: 0,
    paymentTime: "",
    flightClass: "",
  });
  const [ticket, setTicket] = useState<{
    data: DataHistory;
    message: string;
    status: string;
  }>({
    data: {
      orderId: "",
      orderer: {
        fullName: "",
        phoneNumber: "",
        email: "",
      },
      flightDetails: {
        departure: {
          airportId: 0,
          airportName: "",
          dateTime: "",
          city: "",
          code: "",
        },
        arrival: {
          airportId: 0,
          airportName: "",
          dateTime: "",
          city: "",
          code: "",
        },
        airline: {
          name: "",
          iconUrl: "",
          airlineId: 0,
        },
        flightCode: "",
      },
      passengerDetails: {
        adult: [],
        child: [],
        infant: [],
        passengerTotal: 0,
      },
      priceDetails: {
        basePriceBreakdown: {
          adult: { passengerCount: 0, price: 0 },
          child: { passengerCount: 0, price: 0 },
          infant: { passengerCount: 0, price: 0 },
        },
        totalDicount: 0,
        tax: 0,
        total: 0,
      },
      paymentStatus: "",
      facility: [],
      luggage: 0,
      paymentTime: "",
      flightClass: "",
    },
    message: "",
    status: "",
  });
  const [isLoading, setLoading] = useState<boolean>(true);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);

  async function get() {
    setLoading(true);
    const response = await fetchInstance({
      method: "GET",
      endpoint: `/api/orders/details?orderId=${orderId}`,
      authToken: localStorage.getItem("user_access_token") ?? "",
    });
    console.log(response.data);

    const { hours, minutes } = calculateFlightTime(
      response.data.flightDetails.departure.dateTime,
      response.data.flightDetails.arrival.dateTime
    );
    console.log(hours, minutes);
    setHours(hours);
    setMinutes(minutes);
    setTicket(response);
    setRiwayat(response.data);
    setLoading(false);
  }

  useEffect(() => {
    get();
  }, [orderId]);

  return (
    <>
      <ContainerPage>
        {isLoading ? (
          <>
            <Alert message="Memuat data" type="process" />
          </>
        ) : (
          <Card customStyle="sm:px-0">
            <div className="border-b-2 w-full border-gray-500/70 pb-8 mt-2 mb-10">
              <div className="flex flex-col lg:flex-row items-center">
                <Link to="/pesanan">
                  <h3 className="pl-2 font-bold text-2xl">
                    <Icon
                      icon="material-symbols-light:chevron-left"
                      width={30}
                    />
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
                      <p className="font-semibold text-sm">
                        {hours}j {minutes}m
                      </p>
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
                          {new Date(
                            riwayat?.flightDetails?.departure?.dateTime
                          ).toDateString()}
                        </p>
                        <p className="text-sm">
                          {riwayat?.flightDetails?.departure?.airportName ??
                            "Kosong"}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <p className="text-sm py-8">
                          {hours}j {minutes}m
                        </p>
                      </div>
                      <div className="flex flex-col">
                        <p className="font-semibold text-lg">
                          {new Date(
                            riwayat?.flightDetails?.arrival?.dateTime
                          ).toDateString()}
                        </p>
                        <p className="text-sm">
                          {riwayat?.flightDetails?.arrival?.airportName ??
                            "Kosong"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {[
                  ...riwayat.passengerDetails.adult,
                  ...riwayat.passengerDetails.child,
                  ...riwayat.passengerDetails.infant,
                ].map((name, index) => (
                  <p className="font-bold text-sm mt-4 pt-4">
                    {index + 1}. {name}
                  </p>
                ))}
                {/* <p className="font-bold text-sm mt-4 pt-4">1.</p> */}
              </div>
              <div className="ml-12 lg:w-1/2">
                <h3 className="mb-5 pb-5 font-bold text-xl">
                  Detail Pembayaran
                </h3>
                <div className="grid grid-cols-2 gap-x-20 mr-5">
                  <div className="grid grid-flow-row gap-y-3 sm:gap-y-8">
                    <span className="font-semibold text-sm">
                      Harga Dewasa ({riwayat.passengerDetails.adult.length}x)
                    </span>
                    <span className="font-semibold text-sm">Diskon</span>
                    <span className="font-semibold text-sm">Pajak</span>
                    <span className="font-semibold text-sm">Total</span>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <span className="font-semibold text-sm">
                      Rp. {riwayat.priceDetails.basePriceBreakdown.adult.price}{" "}
                    </span>
                    <span className="font-semibold text-sm">
                      -Rp. {riwayat.priceDetails.totalDicount}{" "}
                    </span>
                    <span className="font-semibold text-sm">Termasuk</span>
                    <span className="font-semibold text-sm">
                      Rp. {riwayat.priceDetails.total}{" "}
                    </span>
                  </div>
                </div>
                <Button
                  id="unduh-bukti-pembayaran"
                  className="mx-auto my-4 bg-primary-bright"
                >
                  Unduh Bukti Pembayaran
                </Button>
                <div className="flex flex-col gap-3">
                  {<DownloadTicket dataFlightOrder={ticket} />}
                </div>
              </div>
            </div>
          </Card>
        )}
      </ContainerPage>
    </>
  );
}
