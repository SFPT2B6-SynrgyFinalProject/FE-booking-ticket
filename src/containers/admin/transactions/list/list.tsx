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
  const { records, isLoading, handleDetail, handleFilter } = useAction();

  //convert number to rupiah
  const convertToRupiah = (angka: string) => {
    let rupiah = "";
    const angkarev = angka.toString().split("").reverse().join("");
    for (let i = 0; i < angkarev.length; i++)
      if (i % 3 === 0) rupiah += angkarev.substr(i, 3) + ".";
    return (
      "Rp. " +
      rupiah
        .split("", rupiah.length - 1)
        .reverse()
        .join("")
    );
  };

  //convert date to DD-MM-YYYY only
  const convertDate = (date: string) => {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // create convert orderID to Uppercase


  const columns = [
    {
      name: "Order ID",
      selector: (row: ITransactions) => row.orderId.toUpperCase(),
      sortable: true,
      width: '8rem',
    },
    {
      name: "Total Pembayaran",
      selector: (row: ITransactions) => convertToRupiah(row.paymentTotal),
      sortable: true,
      width: '12rem',
    },
    {
      name: "Metode Pembayaran",
      selector: (row: ITransactions) => row.paymentMethod,
      sortable: true,
      width: '14rem',
    },
    {
      name: "Tanggal Transaksi",
      selector: (row: ITransactions) => convertDate(row.transactionDate),
      sortable: true,
      width: '14rem',
    },
    {
      name: "Status",
      selector: (row: ITransactions) => row.status,
      sortable: true,
      cell: (row: ITransactions) => <Badge type="success" message={row.status} />,
      width: '10rem',
    },
    {
      name: "Aksi",
      center: "true",
      width: "18rem",
      cell: (row: ITransactions) => (
        <div className="flex items-center gap-x-3 py-2">
          <Button
            onClick={() => handleDetail(row.orderId)}
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
      <Tablev2 isPending={isLoading} columns={columns} data={records} customStyles={customStyles} />
    </div>
  );
};

export default Transaction;
