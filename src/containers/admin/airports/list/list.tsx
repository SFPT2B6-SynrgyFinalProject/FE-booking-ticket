import Tablev2 from "../../../../components/Tablev2";
import Button from "../../../../components/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import InputComponent from "../../../../components/Input";
import { FormModal } from "../../../../components/FormModal";
import { IAirports } from "../airports.types";
import useAction from "./list.hooks";
import Alert from "../../../../components/Alert";
interface TableColumn {
  name: string;
  width?: string;
  selector?: (row: IAirports) => string;
  sortable?: boolean;
}

interface TableProps {
  columns?: TableColumn[];
  data?: IAirports[];
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

const Airport: React.FC<TableProps> = () => {
  const {
    alert,
    records,
    open,
    clickOpen,
    clickClose,
    airportName,
    tambah,
    cityName,
    code,
    judul,
    kirim,
    handleEdit,
    handleFilter,
    handleChange,
    isLoading,
  } = useAction();

  const columns = [
    {
      name: "Nama Bandara",
      selector: (row: IAirports) => row.airportName,
      width: "35rem",
      sortable: true,
    },
    {
      name: "Kode Iata",
      selector: (row: IAirports) => row.code,
      sortable: true,
    },

    {
      name: "Aksi",
      center: "true",
      width: "18rem",
      cell: (row: IAirports) => (
        <div className="flex items-center py-2 gap-x-3">
          <Button
            type="primary-dark"
            color="primary-dark"
            onClick={() => handleEdit(row.id)}
            className={`text-white !px-4`}
            size="xs"
          >
            Edit <Icon icon="bx:edit" width={18} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex-1 px-4 mt-8 md:px-8 md:mt-14">
      {alert && (
        <Alert type={alert.type} message={alert.message} /> // Display the alert if it exists
      )}
      <FormModal isOpen={open} title={judul}>
        {judul === "Ubah Data Bandara" || judul === "Tambah Data Bandara" ? (
          <div className="mt-2">
            <div className="mb-3">
              <label htmlFor="">Bandara</label>
              <input
                id="airportName"
                name="airportName"
                value={airportName}
                onChange={handleChange}
                type="text"
                className="w-full h-[40px] mt-1 border border-[#ddd] rounded-md outline-none px-4 text-sm shadow"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="">Kode</label>
              <input
                id="code"
                name="code"
                value={code}
                onChange={handleChange}
                type="text"
                className="w-full h-[40px] mt-1 border border-[#ddd] rounded-md outline-none px-4 text-sm shadow"
              />
            </div>
            <div>
              <label htmlFor="">Kota</label>
              <input
                id="cityName"
                name="cityName"
                value={cityName}
                onChange={handleChange}
                type="text"
                className="w-full h-[40px] mt-1 border border-[#ddd] rounded-md outline-none px-4 text-sm shadow"
              />
            </div>
          </div>
        ) : (
          <p>Anda Yakin Menghapus Data Ini?</p>
        )}
        <div className="flex justify-center mt-4 gap-x-4">
          <Button
            type="secondary"
            className="border border-gray-300 hover:bg-gray-100 rounded-xl"
            color="secondary-normal"
            size="sm"
            onClick={clickClose}
          >
            Close
          </Button>

          <Button
            type="primary-dark"
            className=" rounded-xl"
            onClick={judul === "Tambah Data Bandara" ? tambah : kirim}
            color="primary-dark"
            size="sm"
          >
            {judul === "Ubah Data Bandara" ? "Ubah" : "Simpan"}
          </Button>
        </div>
      </FormModal>

      <div className="flex flex-col md:flex-row md:justify-between items-center border-t border-b border-[#000] border-opacity-25 py-[15px] px-3">
        <Button
          className={`!bg-green-600 py-[0.61rem] text-white px-[14px] sm:px-[35px] md:px-[24px]`}
          size="xs"
          onClick={clickOpen}
        >
          Tambah Bandara <Icon icon="gg:add" width={20} />
        </Button>
        <div className="w-full sm:w-fit mt-3 md:mt-0">
          <InputComponent
            type="text"
            placeholder="Cari..."
            customStyle="border border-gray-400/80 px-4 py-[10px] rounded-xl text-base"
            onChange={handleFilter}
          />
        </div>
      </div>
      <Tablev2 isPending={isLoading} columns={columns} data={records} customStyles={customStyles} />
    </div>
  );
};

export default Airport;
