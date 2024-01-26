import React, { useState } from "react";
import DataTable from "react-data-table-component";
import Button from "./Button";
import { Icon } from "@iconify/react/dist/iconify.js";

interface Row {
  id: number;
  name: string;
  email: string;
  nohp: string;
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
    width: '12rem',
    selector: (row: Row) => row.name,
    sortable: true,
  },
  {
    name: "Email",
    width: '13rem',
    selector: (row: Row) => row.email,
    sortable: true,
  },
  {
    name: "Nomor Telepon",
    width: '10rem',
    selector: (row: Row) => row.nohp,
    sortable: true,
  },
  {
    name: "Role",
    width: '8rem',
    selector: (row: Row) => row.role,
    sortable: true,
  },
  {
    name: "Action",
    width: 'max-content',
    center: true,
    cell: (row: Row) => (
      <div className="flex items-center py-2">
        <Button
          onClick={() => handleEdit(row.id)} // Assuming you have a delete function
          className={`mr-2 text-sm font-bold bg-blue-900 text-white rounded-lg`} size="xs"
        >
          Edit <Icon icon="bx:edit" width={20} className="text-white" />
        </Button>

        <Button
          onClick={() => handleDelete(row.id)} // Assuming you have a delete function
          className={`text-sm font-bold bg-red-600 text-white rounded-lg`} size="xs"
        >
          Hapus <Icon icon="uil:trash" width={20} className="text-white" />
        </Button>
      </div>
    ),
  },
];

const data = [
  {
    id: 1,
    name: "Admin",
    nohp: "081234567890",
    email: "Admin@gmail.com",
    role: "Admin",
  },
  {
    id: 2,
    name: "Pengguna",
    nohp: "081234567890",
    email: "Pengguna@gmail.com",
    role: "Pembeli",
  },
  {
    id: 3,
    name: "Pengguna",
    nohp: "081234567890",
    email: "Pengguna@gmail.com",
    role: "Pembeli",
  },
  {
    id: 4,
    name: "Pengguna",
    nohp: "081234567890",
    email: "Pengguna@gmail.com",
    role: "Pembeli",
  },
  {
    id: 5,
    name: "Pengguna",
    nohp: "081234567890",
    email: "Pengguna@gmail.com",
    role: "Pembeli",
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
          <Button className={`bg-green-700 text-white rounded-lg`} size="sm">
            Tambah Pengguna <Icon icon="prime:file-import" width={20} className="text-white" />
          </Button>
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
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
        ></DataTable>
      </div>
    </div>
  );
};
