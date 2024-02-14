/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { IUsers } from "../users.types";
import { fetchInstance } from "../../../../lib/services/core";
import { useUserToken } from "../../../../lib/services/auth";
import { AlertProps } from "../../../../components/Alert";

export default function useList() {
  const [open, setOpen] = useState<boolean>(false);
  const [records, setRecords] = useState<IUsers[]>([]);
  const [judul, setJudul] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [originalRecords, setOriginalRecords] = useState<IUsers[]>([]);
  const [alert, setAlert] = useState<AlertProps | null>(null);

  const [formValues, setFormValues] = useState<IUsers>({
    id: 0,
    fullName: "",
    phoneNumber: "",
    email: "",
    role: "",
  });
  useEffect(() => {
    if (alert !== null) {
      const timeoutId = setTimeout(() => {
        setAlert(null);
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [alert]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetchInstance({
        authToken: useUserToken(),
        endpoint: "/api/admin/users?dataPerPage=50&page=1",
        method: "GET",
      });

      const users = response.data.users;
      const sortedUsers = users.sort((a: IUsers, b: IUsers) => b.id - a.id);

      setRecords(sortedUsers);
      setOriginalRecords(users);
    } catch (error) {
      console.log("error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const clickClose = (): void => {
    setShowAddForm(false);
    setFormValues({ ...formValues, id: 0, fullName: "", phoneNumber: "", email: "", role: ""});
    setOpen(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    const newData = originalRecords.filter((row: { fullName?: string; phoneNumber?: string; email?: string; role?: string; }) => {
      return (
        (row.fullName && row.fullName.toLowerCase().includes(searchValue)) ||
        (row.phoneNumber && row.phoneNumber.toLowerCase().includes(searchValue)) ||
        (row.email && row.email.toLowerCase().includes(searchValue))
      );
    });

    setRecords(newData);
  };

  const handleEdit = (id: number): void => {
    setJudul("Ubah Data User");
    const users = records.find((users) => users.id === id);
    if (users) {
      const { id, fullName, phoneNumber, email, role} = users;
      setFormValues({ ...formValues, id, fullName, phoneNumber, email, role });
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

  const handleOnSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const editData = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const payload: IUsers = { ...formValues };
      
      setOpen(false);
      const response = await fetchInstance({
        endpoint: "/api/admin/users",
        method: "PUT",
        authToken: useUserToken(),
        data: payload,
      });

      // definisikan message
      console.log(response.message);
      setAlert({
        type: "success",
        message: "Data user berhasil diubah!",
      });
      setFormValues({ ...formValues, id: 0, fullName: "", email: "", role: "" });

      fetchData();
    } catch (error) {
      console.log("Error edit data:", error);
      setAlert({
        type: "fail",
        message: "Data user gagal diubah!",
      });
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  const deleteData = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const payload: IUsers = { ...formValues };
      
      setOpen(false);
      const response = await fetchInstance({
        endpoint: `/api/admin/users?id=${payload.id}`,
        method: "DELETE",
        authToken: useUserToken(),
      });

      // definisikan message
      console.log(response.message);
      setAlert({
        type: "success",
        message: "Data user berhasil hapus!",
      });
      setFormValues({ ...formValues, id: 0, fullName: "", email: ""});

      fetchData();
    } catch (error) {
      console.log("Error hapus data:", error);
      setAlert({
        type: "fail",
        message: "Data user gagal dihapus!",
      });
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  const handleDelete = async (id: number): Promise<void> => {
    setJudul("Hapus Data User");
    const users = records.find((users) => users.id === id);
    if (users) {
      const { id } = users;
      setFormValues({ ...formValues, id });
    }

    setOpen(true);
    setShowAddForm(false);
  };


  useEffect(() => {
    fetchData();
    
  }, []);


  return {
    alert,
    editData,
    deleteData,
    showAddForm,
    isLoading,
    records,
    open,
    clickClose,
    judul,
    handleEdit,
    handleDelete,
    handleSearch,
    handleChange,
    handleOnSelect,
    formValues,
  };
}
