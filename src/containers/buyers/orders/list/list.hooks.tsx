/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { IOrders } from "../orders.types";

export default function useList() {
  const [orders, setOrders] = useState<IOrders[]>([]);

  // misal data from api
  const data = [
    {
      orderId: "1214325",
      kotaAsal: "Jakarta",
      kotaTujuan: "Denpasar",
      status: "E-ticket sudah terbit",
    },
    {
      orderId: "23452353",
      kotaAsal: "Solo",
      kotaTujuan: "Denpasar",
      status: "E-ticket sudah terbit",
    },
  ];

  const fetchOrders = async () => {
    try {
      // logic fetch data
      setOrders(data);
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    orders,
  };
}
