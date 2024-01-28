// Contoh penggunaan komponen Tablev2 di halaman lain
import Tablev2 from "../../components/Tablev2";
import Button from "../../components/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import InputComponent from "../../components/Input";

interface Row {
  no: number;
  promo: string;
  kode: string;
  deskripsi: string;
  tanggalMulai: string;
  tanggalSelesai: string;
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
    sortable: true,
  },
  {
    name: "Promo",
    selector: (row: Row) => row.promo,
    sortable: true,
  },
  {
    name: "Kode Promo",
    selector: (row: Row) => row.kode,
    sortable: true,
  },
  {
    name: "Deskripsi",
    selector: (row: Row) => row.deskripsi,
    sortable: true,
  },
  {
    name: "Mulai",
    selector: (row: Row) => row.tanggalMulai,
    sortable: true,
  },
  {
    name: "Akhir",
    selector: (row: Row) => row.tanggalSelesai,
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
          onClick={() => handleEdit(row.no)}
          className={`text-white !px-4`}
          size="xs"
        >
          Edit <Icon icon="bx:edit" width={18} />
        </Button>
        <Button
          onClick={() => handleDelete(row.no)}
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
    no:1,
    promo:"Awal Tahun",
    kode: "NEWYEAR",
    deskripsi: "New Year",
    tanggalMulai: "12-21-2024",
    tanggalSelesai: "12-21-2024",
  },
  {
    no:2,
    promo:"Awal Tahun",
    kode: "NEWYEAR",
    deskripsi: "New Year",
    tanggalMulai: "12-21-2024",
    tanggalSelesai: "12-21-2024",
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



const Promo: React.FC<TableProps> = () => {
  const [records, setRecords] = useState(data);

  function handleFilter(e: React.ChangeEvent<HTMLInputElement>) {
    const newData = data.filter((row: { promo: string; kode: string; }) => {
      return (
        row.promo.toLowerCase().includes(e.target.value.toLowerCase()) ||
        row.kode.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
    setRecords(newData);
  }

  return (
    <div className="flex-1 px-8 mt-14">
      <div className="flex flex-col lg:flex-row justify-between items-center">
        <Button className={`!bg-green-600 py-[10px] text-white mb-4`} size="xs">
          Tambah Promo <Icon icon="prime:file-import" width={20} />
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

export default Promo;

