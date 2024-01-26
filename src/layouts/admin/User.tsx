// Contoh penggunaan komponen Tablev2 di halaman lain
import Tablev2 from "../../components/Tablev2";
import Button from "../../components/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

interface Row {
  id: number;
  name: string;
  email: string;
  nohp: string;
  role: string;
}

interface TableColumn {
  name: any;
  width?: any;
  selector?: (row: Row) => string;
  sortable?: any;
}

interface TableProps {
  columns?: TableColumn[];
  data?: any;
}

function handleEdit(id: number): void {
  console.log(`Editing record with ID ${id}`);
}

function handleDelete(id: number): void {
  console.log(`Deleting record with ID ${id}`);
}

const columns = [
  {
    name: "Name",
    selector: (row: any) => row.name,
    sortable: true,
  },
  {
    name: "Email",
    selector: (row: any) => row.email,
    sortable: true,
  },
  {
    name: "Nomor Telepon",
    selector: (row: any) => row.nohp,
    sortable: true,
  },
  {
    name: "Role",
    selector: (row: any) => row.role,
    sortable: true,
  },
  {
    name: "Action",
    center: true,
    width: "20rem",
    cell: (row: any) => (
      <div className="flex items-center py-2">
        <Button
          onClick={() => handleEdit(row.id)}
          className={`mr-2 text-sm font-bold bg-blue-900 text-white rounded-lg`}
          size="xs"
        >
          Edit
        </Button>
        <Button
          onClick={() => handleDelete(row.id)}
          className={`text-sm font-bold bg-red-600 text-white rounded-lg`}
          size="xs"
        >
          Hapus
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
    },
  },
  headRow: {
    style: {
      fontSize: "16px",
      background: "#F0F0F0",
    },
  },
};



const User: React.FC<TableProps> = () => {
  const [records, setRecords] = useState(data);

  function handleFilter(e: React.ChangeEvent<HTMLInputElement>) {
    const newData = data.filter((row: { name: string; role: string; }) => {
      return (
        row.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        row.role.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
    setRecords(newData);
  }

  return (
    <div className="w-full ">
      <div className="lg:flex mx-4 justify-between items-center mt-3 mb-10">
        <Button className={`bg-green-700 text-white rounded-lg`} size="sm">
          Tambah Pengguna <Icon icon="prime:file-import" width={20} className="text-white" />
        </Button>
        <div>
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-400 px-4 py-2 mt-2 rounded-xl"
            onChange={handleFilter}
          />
        </div>
      </div>
      <Tablev2 columns={columns} data={records} customStyles={customStyles} />
    </div>
  );
};

export default User;

