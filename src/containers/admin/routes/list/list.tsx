// Contoh penggunaan komponen Tablev2 di halaman lain
import Tablev2 from "../../../../components/Tablev2";
import Button from "../../../../components/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import InputComponent from "../../../../components/Input";
import { FormModal } from "../../../../components/FormModal";
import { IRoutes } from "./../routes.types";
import useAction from "./list.hooks";

interface TableColumn {
  name: string;
  width?: string;
  selector?: (row: IRoutes) => string;
  sortable?: boolean;
}

interface TableProps {
  columns?: TableColumn[];
  data?: IRoutes[];
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

const Route: React.FC<TableProps> = () => {
  const {
    records,
    open,
    clickOpen,
    clickClose,
    bandara_asal,
    bandara_tujuan,
    judul,
    deleteId,
    handleEdit,
    handleDelete,
    handleFilter,
    handleChange,
  } = useAction();

  const columns = [
    {
      name: "Bandara Asal",
      selector: (row: IRoutes) => row.bandara_asal,
      width: "35rem",
      sortable: true,
    },
    {
      name: "Bandara Tujuan",
      selector: (row: IRoutes) => row.bandara_tujuan,
      sortable: true,
    },

    {
      name: "Aksi",
      center: "true",
      width: "18rem",
      cell: (row: IRoutes) => (
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
      <FormModal isOpen={open} title={judul}>
        {judul === "Ubah Data Rute" || judul === "Tambah Data Rute" ? (
          <div className="mt-2">
            <div className="mb-3">
              <label htmlFor="">Bandara Asal</label>
              <input id="bandara-asal" name="bandara-asal" value={bandara_asal} onChange={handleChange} type="text" className="w-full h-[40px] mt-1 border border-[#ddd] rounded-md outline-none px-4 text-sm shadow" />
            </div>
            <div>
              <label htmlFor="">Bandara Tujuan</label>
              <input id="bandara-tujuan" name="bandara-tujuan" value={bandara_tujuan} onChange={handleChange} type="text" className="w-full h-[40px] mt-1 border border-[#ddd] rounded-md outline-none px-4 text-sm shadow" />
            </div>
          </div>
        ) : (
          <p>Anda Yakin Menghapus Data Ini?</p>
        )}

        <div className="mt-4 flex gap-x-4 justify-center">
          <input type="hidden" id="hiddenInput" name="hiddenInput" value={deleteId} />
          <Button
            type="secondary"
            className="border border-gray-300 hover:bg-gray-100 rounded-xl"
            color="secondary-normal"
            size="sm"
            onClick={clickClose}
          >
            Close
          </Button>

          <Button type="primary-dark" className=" rounded-xl" color="primary-dark" size="sm">
            {judul === "Hapus Data Rute" ? "Hapus" : "Simpan"}
          </Button>
        </div>
      </FormModal>
      <div className="flex flex-col md:flex-row md:justify-between items-center border-t border-b border-[#000] border-opacity-25 py-[15px] px-3">
        <button className="bg-green-600 py-2 px-3 rounded-[10px] text-white font-outfit flex items-center gap-2" onClick={clickOpen}>
          Tambah Rute <Icon icon="prime:file-import" width={20} />
        </button>
        <div className="w-full sm:w-fit">
          <InputComponent
            type="text"
            placeholder="Cari..."
            customStyle="border border-[#000] border-opacity-25 px-4 py-[10px] rounded-[10px] text-base"
            onChange={handleFilter}
          />
        </div>
      </div>
      <Tablev2 columns={columns} data={records} customStyles={customStyles} />
    </div>
  );
};

export default Route;
