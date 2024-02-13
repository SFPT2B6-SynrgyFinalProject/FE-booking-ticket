/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { IOrders } from "../orders.types";
import { fetchInstance } from "../../../../lib/services/core";

export default function useList(status: "COMPLETED" | "ONGOING") {
  const [orders, setOrders] = useState<IOrders[]>([]);

  // misal data from api
  // const data = [
  //   {
  //     orderId: "1214325",
  //     kotaAsal: "Jakarta",
  //     kotaTujuan: "Denpasar",
  //     status: "E-ticket sudah terbit",
  //   },
  //   {
  //     orderId: "23452353",
  //     kotaAsal: "Solo",
  //     kotaTujuan: "Denpasar",
  //     status: "E-ticket sudah terbit",
  //   },
  // ];

  const fetchOrders = async () => {
    try {
      const response = await fetchInstance({
        method: "GET",
        endpoint: `/api/orders?status=${status}`,
        authToken: localStorage.getItem("user_access_token") ?? "",
      });
      console.log(response);
      setOrders(response.data.orders);
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
