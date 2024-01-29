// Contoh penggunaan komponen Tablev2 di halaman lain
import Tablev2 from "../../../../components/Tablev2";
import Button from "../../../../components/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import InputComponent from "../../../../components/Input";
import Badge from "../../../../components/Badges";
import { IFlightSchedules } from "./../flightSchedules.types";
import useAction from "./list.hooks";

interface TableColumn {
  name: string;
  width?: string;
  selector?: (row: IFlightSchedules) => string;
  sortable?: boolean;
}

interface TableProps {
  columns?: TableColumn[];
  data?: IFlightSchedules[];
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

const flightSchedule: React.FC<TableProps> = () => {
  const { records, handleEdit, handleDelete, handleFilter } = useAction();

  const columns = [
    {
      name: "ID",
      selector: (row: IFlightSchedules) => row.id,
      width: "150px",
      sortable: true,
    },
    {
      name: "Maskapai",
      selector: (row: IFlightSchedules) => row.maskapai,
      width: "150px",
      sortable: true,
    },
    {
      name: "Keberangkatan",
      selector: (row: IFlightSchedules) => row.keberangkatan,
      width: "200px",
      sortable: true,
    },
    {
      name: "Kedatangan",
      selector: (row: IFlightSchedules) => row.keberangkatan,
      width: "200px",
      sortable: true,
    },
    {
      name: "Harga",
      selector: (row: IFlightSchedules) => row.harga,
      sortable: true,
    },
    {
      name: "Kursi",
      selector: (row: IFlightSchedules) => row.jumlahKursi,
      width: "100px",
      sortable: true,
    },
    {
      name: "Kelas",
      selector: (row: IFlightSchedules) => row.kelas,
      sortable: true,
    },
    {
      name: "Status",
      width: "150px",

      selector: (row: IFlightSchedules) => row.status,
      sortable: true,
      cell: (row: IFlightSchedules) => <Badge type="success" message={row.status} />,
    },
    {
      name: "Aksi",
      center: "true",
      width: "400px",
      cell: (row: IFlightSchedules) => (
        <div className="flex items-center gap-x-3  py-2">
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
            Hapus <Icon icon="ci:trash-empty" width={16} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex-1 px-8 mt-14">
      <div className="flex flex-col lg:flex-row justify-between items-center">
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
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
