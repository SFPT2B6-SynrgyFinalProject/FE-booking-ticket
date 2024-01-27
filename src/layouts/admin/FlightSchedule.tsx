// Contoh penggunaan komponen Tablev2 di halaman lain
import Tablev2 from "../../components/Tablev2";
import Button from "../../components/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import InputComponent from "../../components/Input";

interface Row {
  no: number;
  id: number;
  maskapai: string;
  keberangkatan: string;
  kedatangan: string;
  harga: number;
  diskon: number;
  jumlahKursi: number;
  kelas: string;
  status: string;
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
    name: "No",
    selector: (row: Row) => row.no,
    width: "7%",
    sortable: true,
  },
  {
    name: "ID",
    selector: (row: Row) => row.id,
    width: '150px',
    sortable: true,
  },
  {
    name: "Maskapai",
    selector: (row: Row) => row.maskapai,
    width: '150px',
    sortable: true,
  },
  {
    name: "Keberangkatan",
    selector: (row: Row) => row.keberangkatan,
    width: '200px',
    sortable: true,
  },
  {
    name: "Kedatangan",
    selector: (row: Row) => row.keberangkatan,
    width: '200px',
    sortable: true,
  },
  {
    name: "Harga",
    selector: (row: Row) => row.harga,
    sortable: true,
  },
  {
    name: "Kursi",
    selector: (row: Row) => row.jumlahKursi,
    width: '100px',
    sortable: true,
  },
  {
    name: "Kelas",
    selector: (row: Row) => row.kelas,
    sortable: true,
  },
   {
     name: "Status",
    width: '100px',
     
    selector: (row: Row) => row.status,
     sortable: true,
      cell: (row: Row) => (
    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ring-gray-500/10 ${getStatusBadgeClass(row.status)}`}>
      {row.status}
    </span>
     ),
  },
  {
    name: "Aksi",
    center: "true",
    width: '400px',
    cell: (row: Row) => (
      <div className="flex items-center gap-x-3 py-2">
        <Button
          type="primary-dark" 
          color="primary-dark"  
          onClick={() => handleEdit(row.id)}
          className={`text-white !px-4`}
          size="xs"
        >
          Edit <Icon icon="bx:edit" width={16} />
        </Button>
        <Button
          onClick={() => handleDelete(row.id)}
          className={`text-white bg-rose-600 !px-4`}
          size="xs"
        >
          Hapus <Icon icon="ci:trash-empty" width={16}/>
        </Button>
      </div>
    ),
  },
];

const data = [
  {
    no: 1,
    id: 123456789,
    maskapai: "Garuda",
    keberangkatan: "01-01-2023(09.00)",
    kedatangan: "01-01-2023(09.00)",
    harga: 12000,
    diskon: 12000,
    jumlahKursi: 12,
    kelas: "Ekonomi",
    status: "Tiba ",
  },
  {
    no: 1,
    id: 123456789,
    maskapai: "City Link",
    keberangkatan: "01-01-2023(09.00)",
    kedatangan: "01-01-2023(09.00)",
    harga: 12000,
    diskon: 12000,
    jumlahKursi: 12,
    kelas: "Ekonomi",
    status: "Tiba ",
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
      background: "#f3f4f6",
    },
  },
  
};

function getStatusBadgeClass(status: string): string {
  switch (status.trim().toLowerCase()) {
    case "tiba":
      return "bg-green-50";
    case "pending":
      return "bg-yelllow-50";
    case "delayed":
      return "bg-red-50";
    default:
      return "bg-default"; // Add a default class or handle unknown statuses
  }
}


const flightSchedule: React.FC<TableProps> = () => {
  const [records, setRecords] = useState(data);
  

  function handleFilter(e: React.ChangeEvent<HTMLInputElement>) {
    const newData = data.filter((row: { maskapai: string; kelas: string; }) => {
      return (
        row.maskapai.toLowerCase().includes(e.target.value.toLowerCase()) ||
        row.kelas.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
    setRecords(newData);
  }

  return (
    <div className="flex-1 px-8 mt-14 w-full">
      <div className="flex flex-col lg:flex-row justify-between items-center">
        <div className="flex flex-col lg:flex-row gap-4">
          <Button className="!bg-green-600 py-[10px] text-white" size="xs">
            Tambah Jadwal <Icon icon="prime:file-import" width={20} />
          </Button>
          <Button className="!bg-green-600 py-[10px] text-white" size="xs">
            Export Jadwal <Icon icon="prime:file-import" width={20} />
          </Button>
        </div>
        <div>
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

export default flightSchedule;

