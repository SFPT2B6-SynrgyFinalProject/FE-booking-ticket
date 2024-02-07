/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { IAirLines } from "../airlines.types";
import { fetchInstance } from "../../../../lib/services/core";
import { useUserToken } from "../../../../lib/services/auth";



export default function useList() {
  const [open, setOpen] = useState<boolean>(false);
  const [records, setRecords] = useState<IAirLines[]>([]);
  const [maskapai, setBandaraAsal] = useState("");
  const [kode, setBandaraTujuan] = useState("");
  const [judul, setJudul] = useState("Tambah Data maskapai");
  const [deleteId, setDeleteId] = useState("");
  const [data, setData] = useState<IAirLines[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetchInstance({
        authToken: useUserToken(),
        endpoint: "/api/admin/airlines?dataPerPage=50&page=1",
        method: "GET",
      });
      setData(response.data["airlines"]);
      setRecords(response.data["airlines"]); // assuming you want to set records with the fetched data
    } catch (error) {
      console.log("error:", error);
    } finally {
      setIsLoading(false);
    }

  };

  const clickOpen = (): void => {
    setJudul("Tambah Data maskapai");
    setOpen(true);
    setShowAddForm(false); 
  };

  const clickClose = (): void => {
    setShowAddForm(false); 
    setBandaraAsal(""); // Reset nilai isian form ke nilai awal
    setBandaraTujuan(""); 
    setOpen(false);
  };

  const postData = async () => {
  try {
    setIsLoading(true);
    const response = await fetchInstance({
      authToken: useUserToken(),
      endpoint: "/api/admin/airlines",
      method: "POST"
    });
    console.log("Data berhasil ditambahkan:", response);
    // Setelah berhasil menambahkan data, Anda mungkin ingin melakukan pengambilan data ulang untuk memperbarui records
    fetchData();
  } catch (error) {
    console.log("Error menambahkan data:", error);
  } finally {
    setIsLoading(false);
    setOpen(false); // Tutup modal setelah menambahkan data
  }
};


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJudul("Tambah Data maskapai");
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
    setBandaraAsal(data[id - 1]["name"]);
    setBandaraTujuan(data[id - 1]["code"]);
    setOpen(true);
    setShowAddForm(false); 
  };

  const handleDelete = (id: any): void => {
    setDeleteId(id);
    setJudul("Hapus Data maskapai");
    setOpen(true);
    setShowAddForm(false);
  };

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newData = data.filter((row: { name: string; code: string }) => {
      return (
        row.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        row.code.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
    setRecords(newData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    postData,
    showAddForm,
    isLoading,
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

