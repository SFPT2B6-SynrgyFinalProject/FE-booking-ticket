import InputComponent from "../../components/Input";
import { useState } from "react";
import React from "react";
import { Outlet } from "react-router-dom";

const OrderBox = ({ orderId, route, date }) => (
  <div className="bg-white p-4 rounded shadow mb-4">
    <p>{`Order id : ${orderId}`}</p>
    <p>{`${route} ${date}`}</p>
    <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">
      Lihat Detail
    </button>
  </div>
);

const PesananAnda = () => (
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-4">Pesanan Anda</h1>
    <OrderBox
      orderId="12345678"
      route="Jakarta → Denpasar"
      date="Sen, 15 Jan 19:40"
    />
    <OrderBox
      orderId="12345788"
      route="Jakarta → Denpasar"
      date="Sen, 15 Jan 19:40"
    />
  </div>
);

const Profile = () => (
  <div className="flex justify-center items-center min-h-screen bg-white">
    <div className="shadow-xl rounded-xl w-full md:w-1/2 lg:w-1/3 p-6 mb-6">
      <h1 className="text-2xl font-bold mb-4">Pesanan Anda</h1>
      <div className="bg-white p-4 rounded shadow mb-4">
        <Outlet />
      </div>
    </div>
  </div>
);

export { OrderBox, PesananAnda };
export default History;
