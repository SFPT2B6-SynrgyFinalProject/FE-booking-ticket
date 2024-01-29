/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { IOrders } from "../orders.types";

export default function useList() {
  const [records, setRecords] = useState<IOrders[]>([]);

  // ibarat data from api
  const data = [
    {
      id: 1,
      order_id: "GI34567",
      username: "Pengguna",
      airline: "Garuda Indonesia",
      destination: "Jakarta - Bali",
      price: "Rp. 1.000.000",
      status: "SELESAI",
    },
    {
      id: 2,
      order_id: "GI34567",
      username: "Pengguna",
      airline: "Garuda Indonesia",
      destination: "Jakarta - Bali",
      price: "Rp. 1.000.000",
      status: "SELESAI",
    },
    {
      id: 3,
      order_id: "GI34567",
      username: "Pengguna",
      airline: "Garuda Indonesia",
      destination: "Jakarta - Bali",
      price: "Rp. 1.000.000",
      status: "SELESAI",
    },
    {
      id: 4,
      order_id: "GI34567",
      username: "Pengguna",
      airline: "Garuda Indonesia",
      destination: "Jakarta - Bali",
      price: "Rp. 1.000.000",
      status: "SELESAI",
    },
    {
      id: 5,
      order_id: "GI34567",
      username: "Pengguna",
      airline: "Garuda Indonesia",
      destination: "Jakarta - Bali",
      price: "Rp. 1.000.000",
      status: "DIBATALKAN",
    },
  ];

  const fetchOrders = async () => {
    try {
      // logic fetch data
      setRecords(data);
    } catch (error) {
      console.log("error");
    }
  };

  const handleEdit = (id: number): void => {
    console.log(`Editing record with ID ${id}`);
  };

  const handleDelete = (id: number): void => {
    console.log(`Deleting record with ID ${id}`);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    records,
    handleEdit,
    handleDelete,
  };
}
