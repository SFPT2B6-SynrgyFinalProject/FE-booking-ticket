import React from "react";
import OrderSuccess from "../../../../../assets/images/order-success.png";

interface EticketProps {}

export const Eticket: React.FC<EticketProps> = () => {
  console.log("Cieee oke nihh yehh!");
  return (
    <>
      <div className="flex flex-col items-center justify-center bg-white lg:pt-12 lg:pb-0 ">
        <img src={OrderSuccess} alt="Order Success" />
        <h1 className="mt-20 text-center sm:text-left text-xl sm:text-2xl font-bold text-black mb-7">
          Selamat, Tiket pesawat Anda sudah terpesan!!
        </h1>
        <h3 className="text-lg text-center sm:text-leftsm:text-xl font-bold text-black">
          Detail tiket telah dikirimkan ke email Anda.
        </h3>
      </div>
    </>
  );
};