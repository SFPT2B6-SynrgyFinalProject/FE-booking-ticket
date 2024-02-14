import React from "react";
import OrderSuccess from "../../../../../assets/images/order-success.png";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../config/redux/store";
import { IFlightOrderResponseBody } from "../../flights.types";
import DownloadTicket from "../../../../../components/DownloadTicket";

interface EticketProps {}

export const Eticket: React.FC<EticketProps> = () => {
  const resultData: IFlightOrderResponseBody = useSelector(
    (state: RootState) => state.flightOrderReducer
  );

  return (
    <>
      <div className="flex flex-col items-center justify-center bg-white lg:pt-12 lg:pb-0 hide-on-print">
        <img src={OrderSuccess} alt="Order Success" />
        <h1 className="mt-20 text-xl font-bold text-center text-black sm:text-left sm:text-2xl mb-7">
          Selamat, Tiket pesawat Anda sudah terpesan!!
        </h1>
        <h3 className="text-lg font-bold text-center text-black sm:text-leftsm:text-xl">
          Detail tiket telah dikirimkan ke email Anda.
        </h3>
      </div>

      <DownloadTicket dataFlightOrder={resultData} />
    </>
  );
};
