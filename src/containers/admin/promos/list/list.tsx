// Contoh penggunaan komponen Tablev2 di halaman lain
import Tablev2 from "../../../../components/Tablev2";
import Button from "../../../../components/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import InputComponent from "../../../../components/Input";
import { IPromos } from "./../promos.types";
import useAction from "./list.hooks";

interface TableColumn {
  name: string;
  width?: string;
  selector?: (row: IPromos) => string;
  sortable?: boolean;
}

interface TableProps {
  columns?: TableColumn[];
  data?: IPromos[];
}

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
  const { records, handleEdit, handleDelete, handleFilter } = useAction();

  const columns = [
    {
      name: "Promo",
      selector: (row: IPromos) => row.promo,
      sortable: true,
    },
    {
      name: "Kode Promo",
      selector: (row: IPromos) => row.kode,
      sortable: true,
    },
    {
      name: "Deskripsi",
      selector: (row: IPromos) => row.deskripsi,
      sortable: true,
    },
    {
      name: "Mulai",
      selector: (row: IPromos) => row.tanggalMulai,
      sortable: true,
    },
    {
      name: "Akhir",
      selector: (row: IPromos) => row.tanggalSelesai,
      sortable: true,
    },
    {
      name: "Aksi",
      center: "true",
      width: "18rem",
      cell: (row: IPromos) => (
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
            Hapus <Icon icon="ci:trash-empty" width={19} />
          </Button>
        </div>
      ),
    },
  ];

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
