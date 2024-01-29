/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { IOrderHistory } from "../orders.types";

export default function useOrderHistory() {
  const [orderHistory, setOrderHistory] = useState<IOrderHistory[]>([]);

  // misal data from api
  const data = [
    {
      orderId: "1214325",
    },
    {
      orderId: "23452353",
    },
  ];

  const fetchOrderHistory = async () => {
    try {
      // logic fetch data
      setOrderHistory(data);
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  return {
    orderHistory,
  };
}
