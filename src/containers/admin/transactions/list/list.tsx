import Tablev2 from "../../../../components/Tablev2";
import Button from "../../../../components/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import InputComponent from "../../../../components/Input";
import Badge from "../../../../components/Badges";
import { ITransactions } from "./../transactions.types";
import useAction from "./list.hooks";

interface TableColumn {
  name: string;
  width?: string;
  selector?: (row: ITransactions) => string;
  sortable?: boolean;
}

interface TableProps {
  columns?: TableColumn[];
  data?: ITransactions[];
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

const Transaction: React.FC<TableProps> = () => {
  const { records, handleDelete, handleFilter } = useAction();

  const columns = [
    {
      name: "ID Order",
      selector: (row: ITransactions) => row.orderId,
      sortable: true,
    },
    {
      name: "Total",
      selector: (row: ITransactions) => row.total,
      sortable: true,
    },
    {
      name: "Metode",
      selector: (row: ITransactions) => row.metode,
      sortable: true,
    },
    {
      name: "Tanggal",
      selector: (row: ITransactions) => row.tanggal,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row: ITransactions) => row.status,
      sortable: true,
      cell: (row: ITransactions) => <Badge type="success" message={row.status} />,
    },
    {
      name: "Aksi",
      center: "true",
      width: "18rem",
      cell: (row: ITransactions) => (
        <div className="flex items-center gap-x-3 py-2">
          <Button
            onClick={() => handleDelete(row.id)}
            className={`text-white !bg-green-600 !px-4`}
            size="xs"
          >
            Detail <Icon icon="mdi:eye-outline" width={19} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex-1 px-8 mt-14">
      <div className="flex flex-col lg:flex-row justify-between  items-center">
        <Button className={`!bg-green-600 py-[10px] text-white mb-4`} size="xs">
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
