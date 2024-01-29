/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { IAirLines } from "../airlines.types";

export default function useList() {
  const [open, setOpen] = useState<boolean>(false);
  const [records, setRecords] = useState<IAirLines[]>([]);
  const [maskapai, setBandaraAsal] = useState("");
  const [kode, setBandaraTujuan] = useState("");
  const [judul, setJudul] = useState("Tambah Data maskapai");
  const [deleteId, setDeleteId] = useState("");

  const data = [
    {
      id: 1,
      maskapai: "Garuda Indonesia",
      kode: "CGK-DPS",
    },
    {
      id: 2,
      maskapai: "Lion Air",
      kode: "DPS-SUB",
    },
    {
      id: 3,
      maskapai: "Citilink",
      kode: "SUB-CGK",
    },
    {
      id: 4,
      maskapai: "Batik Air",
      kode: "CGK-JOG",
    },
    {
      id: 5,
      maskapai: "Sriwijaya Air",
      kode: "JOG-DPS",
    },
    {
      id: 6,
      maskapai: "AirAsia",
      kode: "DPS-SUB",
    },
    {
      id: 7,
      maskapai: "Wings Air",
      kode: "SUB-JOG",
    },
    {
      id: 8,
      maskapai: "Nam Air",
      kode: "JOG-CGK",
    },
    {
      id: 9,
      maskapai: "TransNusa",
      kode: "CGK-DPS",
    },
    {
      id: 10,
      maskapai: "Kalstar Aviation",
      kode: "DPS-SUB",
    },
  ];

  const fetchAirLines = async () => {
    try {
      // logic fetch data
      setRecords(data);
    } catch (error) {
      console.log("error");
    }
  };

  const clickOpen = (): void => {
    setOpen(true);
  };

  const clickClose = (): void => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case "bandara-asal":
        setBandaraAsal(value);
        break;
      case "bandara-tujuan":
        setBandaraTujuan(value);
        break;
    }
  };

  const handleEdit = (id: number): void => {
    setJudul("Ubah Data maskapai");
    setBandaraAsal(data[id - 1]["maskapai"]);
    setBandaraTujuan(data[id - 1]["kode"]);
    setOpen(true);
  };

  const handleDelete = (id: any): void => {
    setDeleteId(id);
    setJudul("Hapus Data maskapai");
    setOpen(true);
  };

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newData = data.filter((row: { maskapai: string; kode: string }) => {
      return (
        row.maskapai.toLowerCase().includes(e.target.value.toLowerCase()) ||
        row.kode.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
    setRecords(newData);
  };

  useEffect(() => {
    fetchAirLines();
  }, []);

  return {
    records,
    open,
    clickOpen,
    clickClose,
    maskapai,
    kode,
    judul,
    deleteId,
    handleEdit,
    handleDelete,
    handleFilter,
    handleChange,
  };
}
