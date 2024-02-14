import React, { useState } from "react";
import Button from "./Button";
import Logo from "./../assets/images/logo.png";
import { Icon } from "@iconify/react/dist/iconify.js";
import { IFlightOrderResponseBody } from "../containers/buyers/flights/flights.types";
import { formatTimeHoursMinute, formatDateString } from "../lib";
const API_URL: string = import.meta.env.VITE_API_URL;

interface DownloadTicketProps {
  dataFlightOrder: IFlightOrderResponseBody;
}

const DownloadTicket: React.FC<DownloadTicketProps> = ({ dataFlightOrder }) => {
  const [isPrint, setIsPrint] = useState(true);
  const data = dataFlightOrder.data;

  // console.log(dataFlightOrder);

  const {
    orderId,
    facility,
    flightDetails: {
      airline: { iconUrl, name: airlineName },
      flightCode,
      departure: {
        dateTime: departureDate,
        city: departureCity,
        code: departureCode,
        airportName: departureAirport,
      },
      arrival: {
        dateTime: arrivalDate,
        city: arrivalCity,
        code: arrivalCode,
        airportName: arrivalAirport,
      },
    },
    flightClass: className,
    passengerDetails: { adult, child, infant },
  } = data;

  const formattedDepartureDate = formatDateString(departureDate);
  const formattedArrivalDate = formatDateString(arrivalDate);
  const facility1 =
    (facility?.find((item: { id: number }) => item.id === 1 || item.id === 4) || {}).name || "-";

  const handlePrintButtonClick = () => {
    setIsPrint(true);
    document.title = `E-ticket-${new Date().getTime()}`;
    window.print();
    document.title = "Wings On";
  };

  return (
    <div>
      {/* <div> */}
      <div className={`${isPrint ? "print-ticket" : ""} hidden`}>
        <div className="fixed top-0 left-14 right-14 pt-9">
          <div className="flex items-start justify-between">
            <div>
              <img src={Logo} alt="logo-image" width={230} />
            </div>

            <div className="font-semibold">
              <h1 className="text-3xl text-gray-600">E-tiket</h1>
              <h4 className="text-blue-700">
                Booking ID <span className="uppercase">{orderId}</span>
              </h4>
            </div>
          </div>
        </div>

        <div className="border-2 border-gray-400/90 mt-36">
          <div className="grid grid-cols-3 p-1 text-xs text-black gap-x-2">
            <div className="flex items-center">
              <Icon
                icon={"fluent-emoji-high-contrast:ticket"}
                width={40}
                className="mr-1 text-black -rotate-90"
              />
              <p>Perlihatkan e-tiket dan identitas diri saat check-in</p>
            </div>

            <div className="flex items-center pl-5">
              <Icon icon={"lucide:clock"} width={40} className="mr-2 text-black" />
              <p>Check-in paling lambat 90 menit sebelum keberangkatan</p>
            </div>

            <div className="flex items-center pl-10 mr-2">
              <Icon icon={"octicon:info-16"} width={35} className="mr-2 text-black" />
              <p>Waktu tertera adalah waktu bandara setempat</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-9 text-xs mt-9 gap-x-5">
          <div className="flex items-center col-span-2">
            <img src={`${API_URL}${iconUrl}`} className="w-40" alt="Airline Icon" />
          </div>

          <div className="relative flex flex-col justify-between col-span-2 pl-3 pr-4 border-r-2 border-gray-500 border-dotted">
            <div className="absolute -right-[26px] -top-6">
              <Icon icon={"mdi:dot"} width={50} className="text-gray-500" />
            </div>
            <div className="absolute -right-[26px] -bottom-6">
              <Icon icon={"mdi:dot"} width={50} className="text-gray-500" />
            </div>
            <div className="mb-3 font-semibold text-black">
              <h6>{airlineName}</h6>
              <h6>{flightCode}</h6>
            </div>
            <div>
              <p className="font-medium text-gray-500 ">{className}</p>
            </div>
          </div>

          <div className="flex flex-col justify-between col-span-2 pl-6">
            {/* <div className="absolute w-[9px] aspect-square rounded-full bg-gray-500 -left-[5px] -top-1"></div>
            <div className="absolute w-[9px] aspect-square rounded-full bg-gray-500 -left-[5px] -bottom-1"></div> */}

            <div>
              <h6 className="font-semibold text-black">{formatTimeHoursMinute(departureDate)}</h6>
              <p className="font-medium text-gray-500">{formattedDepartureDate}</p>
            </div>

            <div>
              <h6 className="font-semibold text-black">{formatTimeHoursMinute(arrivalDate)}</h6>
              <p className="font-medium text-gray-500">{formattedArrivalDate}</p>
            </div>
          </div>

          <div className="flex flex-col justify-between col-span-3 space-y-5">
            <div>
              <h6 className="font-semibold text-black">
                {departureCity} ({departureCode})
              </h6>
              <p className="font-medium text-gray-500">{departureAirport}</p>
            </div>

            <div>
              <h6 className="font-semibold text-black">
                {arrivalCity} ({arrivalCode})
              </h6>
              <p className="font-medium text-gray-500">{arrivalAirport}</p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <table className="rounded-2xl bg-[#3598F3]/10 w-full text-left rtl:text-right text-gray-600 font-medium text-xs">
            <thead className="text-center text-gray-700">
              <tr>
                <th scope="col" className="w-5 px-6 py-4">
                  No
                </th>
                <th scope="col" className="w-64 px-6 py-4 text-left">
                  Penumpang
                </th>
                <th scope="col" className="px-6 py-4 w-36">
                  Rute
                </th>
                <th scope="col" className="px-6 py-4">
                  Fasilitas
                </th>
              </tr>
            </thead>
            <tbody className="text-xs text-center">
              {Array.isArray(adult) && adult?.length > 0 && (
                <>
                  {adult.map((passenger, index) => (
                    <tr key={index} className="bg-white border-t border-b-slate-200">
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4 text-left">{passenger} (Dewasa)</td>
                      <td className="px-6 py-4">{`${departureCode} - ${arrivalCode}`}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center">
                          <Icon icon={"ri:luggage-cart-line"} width={20} className="mr-5" />
                          {facility1}
                        </div>
                      </td>
                    </tr>
                  ))}
                </>
              )}

              {Array.isArray(child) && child?.length > 0 && (
                <>
                  {child.map((passenger, index) => (
                    <tr key={index} className="bg-white border-t border-b-slate-200">
                      <td className="px-6 py-4">{(adult?.length || 0) + index + 1}</td>
                      <td className="px-6 py-4 text-left">{passenger} (Anak)</td>
                      <td className="px-6 py-4">{`${departureCode} - ${arrivalCode}`}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center">
                          <Icon icon={"ri:luggage-cart-line"} width={20} className="mr-5" />
                          {facility1}
                        </div>
                      </td>
                    </tr>
                  ))}
                </>
              )}

              {Array.isArray(infant) && infant?.length > 0 && (
                <>
                  {infant.map((passenger, index) => (
                    <tr key={index} className="bg-white border-t border-b-slate-200">
                      <td className="px-6 py-4">
                        {(adult?.length || 0) + (child?.length || 0) + index + 1}
                      </td>
                      <td className="px-6 py-4 text-left">{passenger} (Bayi)</td>
                      <td className="px-6 py-4">{`${departureCode} - ${arrivalCode}`}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center">
                          <Icon icon={"ri:luggage-cart-line"} width={20} className="mr-5" />
                          {facility1}
                        </div>
                      </td>
                    </tr>
                  ))}
                </>
              )}
            </tbody>
          </table>
        </div>

        <div className="fixed bottom-0 text-sm left-14 right-14">
          <div className="flex items-center justify-between py-8 font-medium text-gray-400 border-t border-slate-300">
            <div>
              <h6>www.wingson.com</h6>
            </div>

            <div className="flex items-center gap-x-6">
              <h6>+6281234567890</h6>
              <h6>WingsOn@email.com</h6>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col pb-10 mx-auto mt-16 md:w-3/6 lg:w-3/12 md:mt-28 gap-y-4">
        <Button
          id="btnUnduhTiket"
          type="primary-dark"
          width="full"
          color="primary-dark"
          className="hide-on-print"
          onClick={handlePrintButtonClick}
        >
          Unduh E-tiket
        </Button>
      </div>
    </div>
  );
};

export default DownloadTicket;
