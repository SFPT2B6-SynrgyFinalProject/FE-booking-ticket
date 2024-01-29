/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { ITransactions } from "../transactions.types";

export default function useList() {
  const [records, setRecords] = useState<ITransactions[]>([]);

  // ibarat data dari api
  const data = [
    {
      id: 1,
      orderId: "AJG123",
      total: "1200000",
      metode: "COD",
      tanggal: "12-21-2024",
      status: "success",
    },
    {
      id: 2,
      orderId: "AJG123",
      total: "1200000",
      metode: "COD",
      tanggal: "12-21-2024",
      status: "dibatalkan",
    },
  ];

  const fetchTransactions = async () => {
    try {
      // logic fetch data api
      setRecords(data);
    } catch (error) {
      console.log("error");
    }
  };

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newData = data.filter((row: { orderId: string; status: string }) => {
      return (
        row.orderId.toLowerCase().includes(e.target.value.toLowerCase()) ||
        row.status.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
    setRecords(newData);
  };

  const handleDelete = (id: number): void => {
    console.log(`Deleting record with ID ${id}`);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return {
    records,
    handleDelete,
    handleFilter,
  };
}
