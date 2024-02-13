// Contoh penggunaan komponen Tablev2 di halaman lain
import Tablev2 from "../../../../components/Tablev2";
import { IOrders } from "./../orders.types";
import useAction from "./list.hooks";
import InputComponent from "../../../../components/Input";
import { rupiahFormatter } from "../../../../lib";
import Badge from "../../../../components/Badges";

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
  const { records, isLoading, handleSearch } = useAction();

  const columns = [
    {
      name: "Order ID",
      selector: (row: IOrders) => row.orderId.toUpperCase(),
      width: "10rem",
      sortable: true,
    },
    {
      name: "Nama Pengguna",
      selector: (row: IOrders) => row.fullName,
      width: "15rem",
      sortable: true,
    },
    {
      name: "Maskapai",
      selector: (row: IOrders) => row.airline,
      width: "11rem",
      sortable: true,
    },
    {
      name: "Tujuan Penerbangan",
      width: "15rem",
      selector: (row: IOrders) => row.flightDestination,
      sortable: true,
    },
    {
      name: "Total Harga",
      width: "10rem",
      selector: (row: IOrders) => rupiahFormatter(row.priceTotal),
      sortable: true,
    },
    {
      name: "Status",
      width: "8rem",
      selector: (row: IOrders) => <Badge type="success" message={row.status} />,
      sortable: true,
    },
  ];

  return (
    <div className="flex-1 px-4 mt-8 md:px-8 md:mt-14">
      <div className="flex flex-col md:flex-row md:justify-end items-center border-t border-b border-[#000] border-opacity-25 py-[15px] px-3">
        <div className="w-full sm:w-fit">
          <InputComponent
            type="text"
            placeholder="Cari..."
            customStyle="border border-gray-400/80 px-4 py-[10px] rounded-xl text-base"
            onChange={handleSearch}
          />
        </div>
      </div>
      <Tablev2 isPending={isLoading} columns={columns} data={records} customStyles={customStyles} />
    </div>
  );
};

export default Order;
