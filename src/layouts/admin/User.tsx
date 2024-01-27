// Contoh penggunaan komponen Tablev2 di halaman lain
import Tablev2 from "../../components/Tablev2";
import Button from "../../components/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import InputComponent from "../../components/Input";

interface Row {
  id: number;
  name: string;
  email: string;
  nohp: string;
  role: string;
}

interface TableColumn {
  name: string;
  width?: string;
  selector?: (row: Row) => string;
  sortable?: boolean;
}

interface TableProps {
  columns?: TableColumn[];
  data?: Row[];
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
    selector: (row: Row) => row.name,
    width: "15rem",
    sortable: true,
  },
  {
    name: "Email",
    selector: (row: Row) => row.email,
    width: "19rem",
    sortable: true,
  },
  {
    name: "Nomor Telepon",
    selector: (row: Row) => row.nohp,
    sortable: true,
  },
  {
    name: "Peran",
    selector: (row: Row) => row.role,
    sortable: true,
  },
  {
    name: "Aksi",
    center: "true",
    width: "18rem",
    cell: (row: Row) => (
      <div className="flex items-center gap-x-3 py-2">
        <Button
          type="primary-dark" 
          color="primary-dark"  
          onClick={() => handleEdit(row.id)}
          className={`text-white !px-4`}
          size="xs"
        >
          Edit <Icon icon="bx:edit" width={18} />
        </Button>
        <Button
          onClick={() => handleDelete(row.id)}
          className={`text-white bg-rose-600 !px-4`}
          size="xs"
        >
          Hapus <Icon icon="ci:trash-empty" width={19}/>
        </Button>
      </div>
    ),
  },
];

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
  }
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
      background: "#f3f4f6",
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
    <div className="flex-1 px-4 mt-8 md:px-8 md:mt-14">
      <div className="flex flex-col md:flex-row md:justify-between items-center">
        <Button className={`!bg-green-600 py-[11px] text-white px-[14px] sm:px-[35px] md:px-[24px]`} size="xs">
          Tambah Pengguna <Icon icon="prime:file-import" width={20} />
        </Button>
        <div className="mt-4 w-full sm:w-fit">
            <InputComponent
              type="text"
              placeholder="Cari..."
              customStyle="border border-gray-400/80 px-4 py-[10px] rounded-xl"
              onChange={handleFilter}
            />
        </div>
      </div>
      <Tablev2 columns={columns} data={records} customStyles={customStyles} />
    </div>
  );
};

export default User;

