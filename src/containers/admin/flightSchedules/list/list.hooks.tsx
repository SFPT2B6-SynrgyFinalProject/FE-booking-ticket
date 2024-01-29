/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { IFlightSchedules } from "../flightSchedules.types";

export default function useList() {
  const [records, setRecords] = useState<IFlightSchedules[]>([]);

  // data from api
  const data = [
    {
      id: 123456789,
      maskapai: "Garuda",
      keberangkatan: "01-01-2023(09.00)",
      kedatangan: "01-01-2023(09.00)",
      harga: 12000,
      diskon: 12000,
      jumlahKursi: 12,
      kelas: "Ekonomi",
      status: "Tertunda",
    },
    {
      id: 12342349,
      maskapai: "City Link",
      keberangkatan: "01-01-2023(09.00)",
      kedatangan: "01-01-2023(09.00)",
      harga: 12000,
      diskon: 12000,
      jumlahKursi: 12,
      kelas: "Ekonomi",
      status: "Tepat Waktu",
    },
  ];

  const fetchFlightSchedules = async () => {
    try {
      // logic fetch data
      setRecords(data);
    } catch (error) {
      console.log("error");
    }
  };

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newData = data.filter((row: { maskapai: string; kelas: string }) => {
      return (
        row.maskapai.toLowerCase().includes(e.target.value.toLowerCase()) ||
        row.kelas.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
    setRecords(newData);
  };

  const handleEdit = (id: number): void => {
    console.log(`Editing record with ID ${id}`);
  };

  const handleDelete = (id: number): void => {
    console.log(`Deleting record with ID ${id}`);
  };

  useEffect(() => {
    fetchFlightSchedules();
  }, []);

  return {
    records,
    handleEdit,
    handleDelete,
    handleFilter,
  };
}
