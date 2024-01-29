/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { IRoutes } from "../routes.types";

export default function useList() {
  const [open, setOpen] = useState<boolean>(false);
  const [records, setRecords] = useState<IRoutes[]>([]);

  // data from api
  const data = [
    {
      id: 1,
      bandara_asal: "Soekarno-Hatta International Airport (CGK)",
      bandara_tujuan: "Ngurah Rai International Airport (DPS)",
    },
    {
      id: 2,
      bandara_asal: "Ngurah Rai International Airport (DPS)",
      bandara_tujuan: "Juanda International Airport (SUB)",
    },
    {
      id: 3,
      bandara_asal: "Juanda International Airport (SUB)",
      bandara_tujuan: "Soekarno-Hatta International Airport (CGK)",
    },
    {
      id: 4,
      bandara_asal: "Soekarno-Hatta International Airport (CGK)",
      bandara_tujuan: "Adisutjipto International Airport (JOG)",
    },
    {
      id: 5,
      bandara_asal: "Adisutjipto International Airport (JOG)",
      bandara_tujuan: "Ngurah Rai International Airport (DPS)",
    },
    {
      id: 6,
      bandara_asal: "Ngurah Rai International Airport (DPS)",
      bandara_tujuan: "Juanda International Airport (SUB)",
    },
    {
      id: 7,
      bandara_asal: "Juanda International Airport (SUB)",
      bandara_tujuan: "Adisutjipto International Airport (JOG)",
    },
    {
      id: 8,
      bandara_asal: "Adisutjipto International Airport (JOG)",
      bandara_tujuan: "Soekarno-Hatta International Airport (CGK)",
    },
    {
      id: 9,
      bandara_asal: "Soekarno-Hatta International Airport (CGK)",
      bandara_tujuan: "Ngurah Rai International Airport (DPS)",
    },
    {
      id: 10,
      bandara_asal: "Ngurah Rai International Airport (DPS)",
      bandara_tujuan: "Juanda International Airport (SUB)",
    },
    {
      id: 11,
      bandara_asal: "Juanda International Airport (SUB)",
      bandara_tujuan: "Soekarno-Hatta International Airport (CGK)",
    },
    {
      id: 12,
      bandara_asal: "Soekarno-Hatta International Airport (CGK)",
      bandara_tujuan: "Adisutjipto International Airport (JOG)",
    },
    {
      id: 13,
      bandara_asal: "Adisutjipto International Airport (JOG)",
      bandara_tujuan: "Ngurah Rai International Airport (DPS)",
    },
    {
      id: 14,
      bandara_asal: "Ngurah Rai International Airport (DPS)",
      bandara_tujuan: "Juanda International Airport (SUB)",
    },
    {
      id: 15,
      bandara_asal: "Juanda International Airport (SUB)",
      bandara_tujuan: "Adisutjipto International Airport (JOG)",
    },
    {
      id: 16,
      bandara_asal: "Adisutjipto International Airport (JOG)",
      bandara_tujuan: "Soekarno-Hatta International Airport (CGK)",
    },
    {
      id: 17,
      bandara_asal: "Soekarno-Hatta International Airport (CGK)",
      bandara_tujuan: "Ngurah Rai International Airport (DPS)",
    },
    {
      id: 18,
      bandara_asal: "Ngurah Rai International Airport (DPS)",
      bandara_tujuan: "Juanda International Airport (SUB)",
    },
    {
      id: 19,
      bandara_asal: "Juanda International Airport (SUB)",
      bandara_tujuan: "Soekarno-Hatta International Airport (CGK)",
    },
    {
      id: 20,
      bandara_asal: "Soekarno-Hatta International Airport (CGK)",
      bandara_tujuan: "Adisutjipto International Airport (JOG)",
    },
  ];

  const fetchRoutes = async () => {
    try {
      // logic fetch data
      setRecords(data);
    } catch (error) {
      console.log("error");
    }
  };

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newData = data.filter((row: { bandara_asal: string; bandara_tujuan: string }) => {
      return (
        row.bandara_asal.toLowerCase().includes(e.target.value.toLowerCase()) ||
        row.bandara_tujuan.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
    setRecords(newData);
  };

  const clickOpen = (): void => {
    setOpen(true);
  };

  const clickClose = (): void => {
    setOpen(false);
  };

  const [bandara_asal, setBandaraAsal] = useState("");
  const [bandara_tujuan, setBandaraTujuan] = useState("");

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

  const [judul, setJudul] = useState("Tambah Data Rute");
  const [deleteId, setDeleteId] = useState("");

  const handleEdit = (id: number): void => {
    setJudul("Ubah Data Rute");
    setBandaraAsal(data[id - 1]["bandara_asal"]);
    setBandaraTujuan(data[id - 1]["bandara_tujuan"]);
    setOpen(true);
  };

  const handleDelete = (id: any): void => {
    setDeleteId(id);
    setJudul("Hapus Data Rute");
    setOpen(true);
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  return {
    records,
    open,
    clickOpen,
    clickClose,
    bandara_asal,
    bandara_tujuan,
    judul,
    deleteId,
    handleEdit,
    handleDelete,
    handleFilter,
    handleChange,
  };
}
