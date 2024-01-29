// Contoh penggunaan komponen Tablev2 di halaman lain
import Tablev2 from "../../../../components/Tablev2";
import Button from "../../../../components/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { IUsers } from "../users.types";
import InputComponent from "../../../../components/Input";
import useAction from "./list.hooks";

interface TableColumn {
  name: string;
  width?: string;
  selector?: (row: IUsers) => string;
  sortable?: boolean;
}

interface TableProps {
  columns?: TableColumn[];
  data?: IUsers[];
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

const List: React.FC<TableProps> = () => {
  const { records, handleEdit, handleDelete, handleFilter } = useAction();

  const columns = [
    {
      name: "Name",
      selector: (row: IUsers) => row.name,
      width: "15rem",
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: IUsers) => row.email,
      width: "19rem",
      sortable: true,
    },
    {
      name: "Nomor Telepon",
      selector: (row: IUsers) => row.nohp,
      sortable: true,
    },
    {
      name: "Peran",
      selector: (row: IUsers) => row.role,
      sortable: true,
    },
    {
      name: "Aksi",
      center: "true",
      width: "18rem",
      cell: (row: IUsers) => (
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
    <div className="flex-1 px-4 mt-8 md:px-8 md:mt-14">
      <div className="flex flex-col md:flex-row md:justify-between items-center">
        <Button
          className={`!bg-green-600 py-[11px] text-white px-[14px] sm:px-[35px] md:px-[24px]`}
          size="xs"
        >
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

export default List;
