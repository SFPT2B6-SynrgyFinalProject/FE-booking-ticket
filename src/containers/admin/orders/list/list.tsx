// Contoh penggunaan komponen Tablev2 di halaman lain
import Tablev2 from "../../../../components/Tablev2";
import Button from "../../../../components/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { IOrders } from "./../orders.types";
import useAction from "./list.hooks";

interface TableColumn {
  name: string;
  width?: string;
  selector?: (row: IOrders) => string;
  sortable?: boolean;
}

interface TableProps {
  columns?: TableColumn[];
  data?: IOrders[];
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

const Order: React.FC<TableProps> = () => {
  const { records, handleEdit, handleDelete } = useAction();

  const columns = [
    {
      name: "Order",
      selector: (row: IOrders) => row.order_id,
      width: "10rem",
      sortable: true,
    },
    {
      name: "Nama Pengguna",
      selector: (row: IOrders) => row.username,
      width: "13rem",
      sortable: true,
    },
    {
      name: "Maskapai",
      selector: (row: IOrders) => row.airline,
      width: "13rem",
      sortable: true,
    },
    {
      name: "Tujuan Penerbangan",
      width: "13rem",
      selector: (row: IOrders) => row.destination,
      sortable: true,
    },
    {
      name: "Total Harga",
      width: "13rem",
      selector: (row: IOrders) => row.price,
      sortable: true,
    },
    {
      name: "Status",
      width: "8rem",
      selector: (row: IOrders) => row.status,
      sortable: true,
    },
    {
      name: "Aksi",
      center: "true",
      width: "18rem",
      cell: (row: IOrders) => (
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
          Export Data Pemesanan <Icon icon="prime:file-import" width={20} />
        </Button>
      </div>
      <Tablev2 columns={columns} data={records} customStyles={customStyles} />
    </div>
  );
};

export default Order;
