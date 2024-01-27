// Contoh penggunaan komponen Tablev2 di halaman lain
import Tablev2 from "../../components/Tablev2";
import Button from "../../components/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import InputComponent from "../../components/Input";

interface Row {
  no: number;
  orderId: string;
  total: string;
  metode: string;
  tanggal: string;
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



function handleDelete(id: number): void {
  console.log(`Deleting record with ID ${id}`);
}

const columns = [
  {
    name: "No",
    selector: (row: Row) => row.no,
    sortable: true,
  },
  {
    name: "ID Order",
    selector: (row: Row) => row.orderId,
    sortable: true,
  },
  {
    name: "Total",
    selector: (row: Row) => row.total,
    sortable: true,
  },
  {
    name: "Metode",
    selector: (row: Row) => row.metode,
    sortable: true,
  },
  {
    name: "Tanggal",
    selector: (row: Row) => row.tanggal,
    sortable: true,
  },
  {
    name: "Status",
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
    width: "18rem",
    cell: (row: Row) => (
      <div className="flex items-center gap-x-3 py-2">
        
        <Button
          onClick={() => handleDelete(row.no)}
          className={`text-white !bg-green-600 !px-4`}
          size="xs"
        >
          Detail <Icon icon="mdi:eye-outline" width={19}/>
        </Button>
      </div>
    ),
  },
];

const data = [
  {
    no:1,
    orderId:"AJG123",
    total: "1200000",
    metode: "COD",
    tanggal: "12-21-2024",
    status: "Selesai",
  },
  {
    no:1,
    orderId:"AJG123",
    total: "1200000",
    metode: "COD",
    tanggal: "12-21-2024",
    status: "Selesai",
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
    case "selesai":
      return "bg-green-50";
    case "pending":
      return "bg-yelllow-50";
    case "canceled":
      return "bg-red-50";
    default:
      return "bg-default"; // Add a default class or handle unknown statuses
  }
}


const Transaction: React.FC<TableProps> = () => {
  const [records, setRecords] = useState(data);

  function handleFilter(e: React.ChangeEvent<HTMLInputElement>) {
    const newData = data.filter((row: { orderId: string; status: string; }) => {
      return (
        row.orderId.toLowerCase().includes(e.target.value.toLowerCase()) ||
        row.status.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
    setRecords(newData);
  }

  return (
    <div className="flex-1 px-8 mt-14">
      <div className="flex flex-col lg:flex-row justify-between items-center">
        <Button className={`!bg-green-600 py-[10px] text-white`} size="xs">
          Eksport Data Transaksi <Icon icon="prime:file-import" width={20} />
        </Button>
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

export default Transaction;

