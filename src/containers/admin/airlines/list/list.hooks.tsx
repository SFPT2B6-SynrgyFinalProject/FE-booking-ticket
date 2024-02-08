import { useState, useEffect } from "react";
import { IAirLines } from "../airlines.types";
import { fetchInstance } from "../../../../lib/services/core";
import { useUserToken } from "../../../../lib/services/auth";

export default function useList() {
  const [open, setOpen] = useState<boolean>(false);
  const [records, setRecords] = useState<IAirLines[]>([]);
  const [judul, setJudul] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [originalRecords, setOriginalRecords] = useState<IAirLines[]>([]);

  const [formValues, setFormValues] = useState<IAirLines>({
    id: 0,
    name: "",
    code: "",
  });

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetchInstance({
        authToken: useUserToken(),
        endpoint: "/api/admin/airlines?dataPerPage=50&page=1",
        method: "GET",
      });

      const airlines = response.data.airlines;
      const sortedAirlines = airlines.sort((a: IAirLines, b: IAirLines) => b.id - a.id);

      setRecords(sortedAirlines);
      setOriginalRecords(airlines);
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
    setFormValues({ ...formValues, id: 0, name: "", code: "" });
    setOpen(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLocaleLowerCase();
    const newData = originalRecords.filter((row: { name: string; code: string }) => {
      return (
        row.name.toLowerCase().includes(searchValue) || row.code.toLowerCase().includes(searchValue)
      );
    });

    setRecords(newData);
  };

  const handleEdit = (id: number): void => {
    setJudul("Ubah Data maskapai");
    const airline = records.find((airline) => airline.id === id);
    if (airline) {
      const { id, name, code } = airline;
      setFormValues({ ...formValues, id, name, code });
    }

    setOpen(true);
    setShowAddForm(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const postData = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const payload: IAirLines = { ...formValues };

      const response = await fetchInstance({
        endpoint: "/api/admin/airlines",
        method: "POST",
        authToken: useUserToken(),
        data: payload,
      });

      // definisikan message
      console.log(response.message);

      fetchData();
    } catch (error) {
      console.log("Error menambahkan data:", error);
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  const editData = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const payload: IAirLines = { ...formValues };

      const response = await fetchInstance({
        endpoint: "/api/admin/airlines",
        method: "PUT",
        authToken: useUserToken(),
        data: payload,
      });

      // definisikan message
      console.log(response.message);

      fetchData();
    } catch (error) {
      console.log("Error edit data:", error);
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  // const handleDelete = (id: any): void => {
  //   setDeleteId(id);
  //   setJudul("Hapus Data maskapai");
  //   setOpen(true);
  //   setShowAddForm(false);
  // };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    postData,
    editData,
    showAddForm,
    isLoading,
    records,
    open,
    clickOpen,
    clickClose,
    judul,
    handleEdit,
    // handleDelete,
    handleSearch,
    handleChange,
    formValues,
  };
}
