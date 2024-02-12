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
    name: "",
    nohp: "",
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
  // data from api


  const fetchUsers = async () => {
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

  const clickOpen = (): void => {
    setJudul("Tambah Data User");
    setOpen(true);
    setShowAddForm(false);
  };

  const clickClose = (): void => {
    setShowAddForm(false);
    setFormValues({ ...formValues, id: 0, name: "", nohp: "", email: "", role: "" });
    setOpen(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    const newData = originalRecords.filter((row: { name?: string; nohp?: string; email?: string; role?: string;}) => {
      return (
        (row.name && row.name.toLowerCase().includes(searchValue)) ||
        (row.nohp && row.nohp.toLowerCase().includes(searchValue)) ||
        (row.email && row.email.toLowerCase().includes(searchValue))
      );
    });

    setRecords(newData);
};

  const handleEdit = (id: number): void => {
    setJudul("Ubah Data User");
    const users = records.find((users) => users.id === id);
    if (users) {
      const { id, name, nohp, email, role } = users;
      setFormValues({ ...formValues, id, name, nohp, email, role });
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
      const payload: IUsers = { ...formValues };

      const response = await fetchInstance({
        endpoint: "/api/admin/users",
        method: "POST",
        authToken: useUserToken(),
        data: payload,
      });

      // definisikan message
      console.log(response.message);
      setAlert({
        type: "success",
        message: "Data user berhasil ditambahkan!",
      });
      setFormValues({ ...formValues, id: 0, name: "", nohp: "", email: "", role: "" });
      
      fetchUsers();
    } catch (error) {
      console.log("Error menambahkan data:", error);
      setAlert({
        type: "fail",
        message: "Data user gagal ditambahkan!",
      });
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  const editData = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
  
    try {
      const payload: IUsers = { ...formValues };
  
      const response = await fetchInstance({
        endpoint: `/api/admin/users/${formValues.id}`, // Include the id in the endpoint
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
      setFormValues({ ...formValues, id: 0, name: "", nohp: "", email: "", role: "" });
  
      fetchUsers();
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
  

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: number): Promise<void> => {
    try {
      await fetchInstance({
        endpoint: `/api/admin/users/${id}`,
        method: "DELETE",
        authToken: useUserToken(),
      });

      setAlert({
        type: "success",
        message: "Data user berhasil dihapus!",
      });

      fetchUsers();
    } catch (error) {
      console.log("Error menghapus data:", error);
      setAlert({
        type: "fail",
        message: "Data user gagal dihapus!",
      });
    }
  };

  return {
    alert,
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
    handleDelete,
    handleSearch,
    handleChange,
    formValues,
  };
}
