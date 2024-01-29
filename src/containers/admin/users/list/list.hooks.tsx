/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { IUsers } from "../users.types";

export default function useList() {
  const [records, setRecords] = useState<IUsers[]>([]);

  // data from api
  const data = [
    {
      id: 1,
      name: "John Doe",
      nohp: "1234567890",
      email: "john.doe@example.com",
      role: "Admin",
    },
    {
      id: 2,
      name: "Jane Michel",
      nohp: "9876543210",
      email: "jane.mi@example.com",
      role: "Buyer",
    },
    {
      id: 3,
      name: "Alice Smith",
      nohp: "5551234567",
      email: "alice.smith@example.com",
      role: "Buyer",
    },
    {
      id: 4,
      name: "Bob Johnson",
      nohp: "8885551234",
      email: "bob.johnson@example.com",
      role: "Buyer",
    },
    {
      id: 5,
      name: "Eve Wilson",
      nohp: "7778889999",
      email: "eve.wilson@example.com",
      role: "Buyer",
    },
    {
      id: 6,
      name: "Charlie Brown",
      nohp: "5554443333",
      email: "charlie.brown@example.com",
      role: "Admin",
    },
    {
      id: 7,
      name: "David Smith",
      nohp: "1112223333",
      email: "david.smith@example.com",
      role: "Buyer",
    },
    {
      id: 8,
      name: "Grace Davis",
      nohp: "4445556666",
      email: "grace.davis@example.com",
      role: "Buyer",
    },
    {
      id: 9,
      name: "Frank Johnson",
      nohp: "9998887777",
      email: "frank.johnson@example.com",
      role: "Admin",
    },
    {
      id: 10,
      name: "Helen Brown",
      nohp: "7776665555",
      email: "helen.brown@example.com",
      role: "Buyer",
    },
    {
      id: 11,
      name: "Ivy Wilson",
      nohp: "3332221111",
      email: "ivy.wilson@example.com",
      role: "Admin",
    },
    {
      id: 12,
      name: "Jack Smith",
      nohp: "6667778888",
      email: "jack.smith@example.com",
      role: "Buyer",
    },
    {
      id: 13,
      name: "Karen Davis",
      nohp: "2223334444",
      email: "karen.davis@example.com",
      role: "Buyer",
    },
    {
      id: 14,
      name: "Leo Johnson",
      nohp: "7779998888",
      email: "leo.johnson@example.com",
      role: "Admin",
    },
    {
      id: 15,
      name: "Mia Brown",
      nohp: "8887776666",
      email: "mia.brown@example.com",
      role: "Buyer",
    },
  ];

  const fetchUsers = async () => {
    try {
      // logic fetch data
      setRecords(data);
    } catch (error) {
      console.log("error");
    }
  };

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newData = data.filter((row: { name: string; role: string }) => {
      return (
        row.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        row.role.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
    setRecords(newData);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (id: number): void => {
    console.log(`Editing record with ID ${id}`);
  };

  const handleDelete = (id: number): void => {
    console.log(`Deleting record with ID ${id}`);
  };

  return { records, handleEdit, handleDelete, handleFilter };
}
