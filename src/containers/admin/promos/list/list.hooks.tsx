/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { IPromos } from "../promos.types";

export default function useList() {
  const [records, setRecords] = useState<IPromos[]>([]);

  // ibarat data from api
  const data = [
    {
      id: 1,
      promo: "Awal Tahun",
      kode: "NEWYEAR",
      deskripsi: "New Year",
      tanggalMulai: "12-21-2024",
      tanggalSelesai: "12-21-2024",
    },
    {
      id: 2,
      promo: "Awal Tahun",
      kode: "NEWYEAR",
      deskripsi: "New Year",
      tanggalMulai: "12-21-2024",
      tanggalSelesai: "12-21-2024",
    },
  ];

  const fetchPromos = async () => {
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

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newData = data.filter((row: { promo: string; kode: string }) => {
      return (
        row.promo.toLowerCase().includes(e.target.value.toLowerCase()) ||
        row.kode.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
    setRecords(newData);
  };

  useEffect(() => {
    fetchPromos();
  }, []);

  return {
    records,
    handleEdit,
    handleDelete,
    handleFilter,
  };
}
