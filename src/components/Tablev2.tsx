import React, { useState } from "react";
import DataTable from "react-data-table-component";

interface Row {
  id: number;
  name: string;
  age: number;
  gender: string;
  email: string;
  role: string;
}

const handleEdit = (id: number) => {
  // Handle edit logic here
  console.log(`Editing record with ID ${id}`);
};

const handleDelete = (id: number) => {
  // Handle delete logic here
  console.log(`Deleting record with ID ${id}`);
};

const columns = [
  {
    name: "Name",
    width: "11rem",
    selector: (row: Row) => row.name,
    sortable: true,
  },
  {
    name: "Email",
    width: "18rem",
    selector: (row: Row) => row.email,
    sortable: true,
  },
  {
    name: "Age",
    selector: (row: Row) => row.age,
    sortable: true,
  },
  {
    name: "Gender",
    selector: (row: Row) => row.gender,
    sortable: true,
  },
  {
    name: "Role",
    selector: (row: Row) => row.role,
    sortable: true,
  },
  {
    name: "Action",
    width: "18rem",
    center: true,
    cell: (row: Row) => (
      <div className="grid grid-cols-2 gap-x-1">
        <button
          onClick={() => handleEdit(row.id)} // Assuming you have a delete function
          className="bg-blue-500 px-3 py-1 text-sm rounded-xl text-white hover:underline"
        >
          Edit
        </button>

        <button
          onClick={() => handleDelete(row.id)} // Assuming you have a delete function
          className="bg-red-500 px-3 py-1 text-sm rounded-xl text-white hover:underline"
        >
          Delete
        </button>
      </div>
    ),
  },
];

const data = [
  {
    id: 1,
    name: "John Doe",
    age: 30,
    gender: "Male",
    email: "john.doe@example.com",
    role: "admin",
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 25,
    gender: "Female",
    email: "jane.smith@example.com",
    role: "buyer",
  },
  {
    id: 3,
    name: "Michael Johnson",
    age: 35,
    gender: "Male",
    email: "michael.johnson@example.com",
    role: "buyer",
  },
  {
    id: 4,
    name: "Emily Davis",
    age: 28,
    gender: "Female",
    email: "emily.davis@example.com",
    role: "admin",
  },
  {
    id: 5,
    name: "Christopher Brown",
    age: 32,
    gender: "Male",
    email: "christopher.brown@example.com",
    role: "buyer",
  },
  {
    id: 6,
    name: "Olivia Wilson",
    age: 26,
    gender: "Female",
    email: "olivia.wilson@example.com",
    role: "admin",
  },
  {
    id: 7,
    name: "Daniel Miller",
    age: 31,
    gender: "Male",
    email: "daniel.miller@example.com",
    role: "buyer",
  },
  {
    id: 8,
    name: "Sophia Moore",
    age: 29,
    gender: "Female",
    email: "sophia.moore@example.com",
    role: "admin",
  },
  {
    id: 9,
    name: "Matthew Taylor",
    age: 34,
    gender: "Male",
    email: "matthew.taylor@example.com",
    role: "buyer",
  },
  {
    id: 10,
    name: "Emma Anderson",
    age: 27,
    gender: "Female",
    email: "emma.anderson@example.com",
    role: "admin",
  },
  {
    id: 11,
    name: "Christopher Lee",
    age: 33,
    gender: "Male",
    email: "christopher.lee@example.com",
    role: "buyer",
  },
  {
    id: 12,
    name: "Ava Garcia",
    age: 28,
    gender: "Female",
    email: "ava.garcia@example.com",
    role: "admin",
  },
  {
    id: 13,
    name: "Ethan Hernandez",
    age: 30,
    gender: "Male",
    email: "ethan.hernandez@example.com",
    role: "buyer",
  },
  {
    id: 14,
    name: "Mia Martinez",
    age: 25,
    gender: "Female",
    email: "mia.martinez@example.com",
    role: "admin",
  },
  {
    id: 15,
    name: "William Brown",
    age: 29,
    gender: "Male",
    email: "william.brown@example.com",
    role: "buyer",
  },
  {
    id: 16,
    name: "William Brown",
    age: 26,
    gender: "Male",
    email: "william.brown@example.com",
    role: "buyer",
  },
];

const customStyles = {
  rows: {
    style: {
      fontSize: "16px",
      // minWidth: "99px",
    },
  },
  headRow: {
    style: {
      fontSize: "16px",
      background: "#F0F0F0",
    },
  },
  headCells: {
    style: {},
  },
  cells: {
    style: {},
  },
};

export const Tablev2: React.FC = () => {
  const [records, setRecords] = useState(data);

  function handleFilter(e: React.ChangeEvent<HTMLInputElement>) {
    const newData = data.filter((row) => {
      return (
        row.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        row.role.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
    setRecords(newData);
  }

  return (
    <div className="w-4/6 mx-auto my-6">
      <div className="border border-gray-300 p-4 rounded-xl">
        <div className="flex justify-between items-center mt-3 mb-10">
          <button className="px-4 text-sm py-2.5 font-bold bg-blue-600 text-white rounded-lg">
            Add Account
          </button>
          <div>
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-400 px-4 py-2 rounded-xl"
              onChange={handleFilter}
            />
          </div>
        </div>
        <DataTable
          columns={columns}
          data={records}
          customStyles={customStyles}
          highlightOnHover
          // fixedHeader
          pointerOnHover
          pagination
        ></DataTable>
      </div>
    </div>
  );
};
