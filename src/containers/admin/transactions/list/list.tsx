import Tablev2 from "../../../../components/Tablev2";
import Button from "../../../../components/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import InputComponent from "../../../../components/Input";
import Badge from "../../../../components/Badges";
import { ITransactions, ITransactionsDetail } from "./../transactions.types";
import useAction from "./list.hooks";
import { FormModal } from "../../../../components/FormModal";

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
  const { records, recordsDetail, judul, open, clickOpen, clickClose, isLoading, isLoading2, handleFilter } = useAction();

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

  // function to add the number 0 in front of the value if it is less than 10
  const addZero = (value: number): string => {
    return value < 10 ? `0${value}` : `${value}`;
  }

  // create convert date to [HH:MM] DD-MM-YYYY
  const convertDateWithTime = (date: string) => {
    const newDate = new Date(date);
    const day = addZero(newDate.getDate());
    const month = addZero(newDate.getMonth() + 1);
    const year = newDate.getFullYear();
    const hours = addZero(newDate.getHours());
    const minutes = addZero(newDate.getMinutes());
    return `[${hours}:${minutes}] ${day}-${month}-${year}`;
  }

  // create convert date to DD-MM-YYYY
  const convertDate = (date: string) => {
    const newDate = new Date(date);
    const day = addZero(newDate.getDate());
    const month = addZero(newDate.getMonth() + 1);
    const year = newDate.getFullYear();
    return `${day}-${month}-${year}`;
  }

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
            onClick={() => clickOpen(row.orderId)}
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
    <div className="flex-1 px-4 mt-8 md:px-8 md:mt-14">
      <div className="flex flex-col md:flex-row md:justify-end items-center border-t border-b border-[#000] border-opacity-25 py-[15px] px-3">
        {/* <Button className={`!bg-green-600 py-[10px] text-white mb-4`} size="xs">
          Eksport Data Transaksi <Icon icon="prime:file-import" width={20} />
        </Button> */}
        <div>
        <div className="w-full sm:w-fit">
          <InputComponent
            type="text"
            placeholder="Cari..."
            customStyle="border border-gray-400/80 px-4 py-[10px] rounded-xl text-base"
            onChange={handleFilter}
          />
        </div>
        </div>
      </div>
      
      <FormModal isOpen={open} title={judul} className={`w-full lg:max-w-2xl max-h-full`}>
        {isLoading2 ? (
          <>
            <section className="relative rounded-[30px] z-[1] bg-black w-[27.9rem] lg:w-full h-full opacity-10"></section>
            <div
              role="status"
              className="relative z-[2] text-white mt-30 py-10 lg:my-auto text-center left-[47%] flex items-center"
            >
              <div className="animate-spin rounded-full w-10 h-10 bg-gradient-to-tr from-blue-600 to-blue-300">
                <div className="h-6 w-6 rounded-full bg-gray-100"></div>
              </div>
            </div>
          </>
        ) : (
          <>
            {Array.isArray(recordsDetail) && recordsDetail.map((detail: ITransactionsDetail) => (
              <div className="grid lg:grid-cols-2 grid-cols gap-4 overflow-hidden">
                <div>
                  <h4 className="font-bold">Pemesan:</h4>
                  <p>{detail.orderer.fullName}</p>
                  <p>{detail.orderer.phoneNumber}</p>
                  <p>{detail.orderer.email}</p>
                </div>
                <div>
                  <h4 className="font-bold">Rincian Penerbangan:</h4>
                  <p>({detail.flightDetails.flightCode}) {detail.flightDetails.airline.name} - {detail.flightClass}</p>
                  <p className="font-semibold mt-2">Keberangkatan</p>
                  <p>{convertDateWithTime(detail.flightDetails.departure.dateTime)}</p>
                  <p>{detail.flightDetails.departure.airportName}</p>
                  <p className="font-semibold mt-2">Tujuan</p>
                  <p>{convertDateWithTime(detail.flightDetails.arrival.dateTime)}</p>
                  <p>{detail.flightDetails.arrival.airportName}</p>
                </div>
                <div>
                  <h4 className="font-bold">Rincian Penumpang:</h4>
                  <p className="mb-2">{detail.passengerDetails.passengerTotal} Orang</p>
                  <p className="font-semibold">Dewasa:</p>
                  <p>{detail.passengerDetails.adult.length > 0 ? detail.passengerDetails.adult.join(", ") : "-"}</p>
                  <p className="font-semibold">Anak-anak:</p>
                  <p>{detail.passengerDetails.child.length > 0 ? detail.passengerDetails.child.join(", ") : "-"}</p>
                  <p className="font-semibold">Usia &lt; 3 Tahun:</p>
                  <p>{detail.passengerDetails.infant.length > 0 ? detail.passengerDetails.infant.join(", ") : "-"}</p>
                </div>
                <div>
                  <h4 className="font-bold">Rincian Biaya:</h4>
                  <p>Total Biaya: {convertToRupiah(detail.priceDetails.total.toString())}</p>
                  <p>Pajak: {convertToRupiah(detail.priceDetails.tax.toString())}</p>
                  <p>Diskon: {convertToRupiah(detail.priceDetails.totalDicount.toString())}</p>
                </div>
                <div>
                  <h4 className="font-bold">Status Pembayaran:</h4>
                  {detail.paymentStatus.toUpperCase() === "PAID" ? (
                    <p>{convertDateWithTime(detail.paymentTime)} | <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      LUNAS
                    </span></p>
                  ) : (
                    <p>{detail.paymentStatus.toUpperCase()}</p>
                  )}
                </div>
                <div>
                  <h4 className="font-bold">Fasilitas:</h4>
                  {detail.facility.map((facility: any) => (
                    <p key={facility.id}>{facility.name}</p>
                  ))}
                </div>
                <div>
                  <h4 className="font-bold">Bagasi:</h4>
                  <p>{detail.luggage} kg</p>
                </div>
              </div>

            ))}

          </>
        )}

        <div className="flex justify-end">
          <Button type="primary-dark" className="rounded-xl" color="primary-dark" size="sm" onClick={clickClose}>
            Close
          </Button>
        </div>
      </FormModal>

      <Tablev2 isPending={isLoading} columns={columns} data={records} customStyles={customStyles} />
    </div>
  );
};

export default Transaction;
