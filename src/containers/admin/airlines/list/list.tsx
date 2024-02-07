// Contoh penggunaan komponen Tablev2 di halaman lain
import Tablev2 from "../../../../components/Tablev2";
import Button from "../../../../components/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import InputComponent from "../../../../components/Input";
import { FormModal } from "../../../../components/FormModal";
import { IAirLines } from "./../airlines.types";
import useAction from "./list.hooks";

interface TableColumn {
  name: string;
  width?: string;
  selector?: (row: IAirLines) => string;
  sortable?: boolean;
}

interface TableProps {
  columns?: TableColumn[];
  data?: IAirLines[];
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

const AirLine: React.FC<TableProps> = () => {
  const {
    postData,
    isLoading,
    records,
    open,
    clickOpen,
    clickClose,
    maskapai,
    kode,
    judul,
    deleteId,
    handleEdit,
    handleDelete,
    handleFilter,
    handleChange,
  } = useAction();
  




  const columns = [
    {
      name: "Maskapai",
      selector: (row: IAirLines) => row.name,
      width: "35rem",
      sortable: true,
    },
    {
      name: "Kode",
      selector: (row: IAirLines) => row.code,
      sortable: true,
    },

    {
      name: "Aksi",
      center: "true",
      width: "18rem",
      cell: (row: IAirLines) => (
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
        {judul === "Ubah Data maskapai" || judul === "Tambah Data maskapai" ? (
          <div className="mt-2">
            <div className="mb-3">
              <InputComponent
                placeholder="Maskapai "
                type="text"
                id="bandara-asal"
                name="bandara-asal"
                value={maskapai}
                onChange={handleChange}
              />
            </div>
            <div>
              <InputComponent
                placeholder="Kode"
                type="text"
                id="bandara-tujuan"
                name="bandara-tujuan"
                value={kode}
                onChange={handleChange}
              />
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
            {judul === "Hapus Data maskapai" ? "Hapus" : "Simpan"}
          </Button>
        </div>
      </FormModal>
      <div className="flex flex-col md:flex-row md:justify-between items-center">
        <Button
          className={`!bg-green-600 py-[11px] text-white px-[14px] sm:px-[35px] md:px-[24px]`}
          size="xs"
          onClick={clickOpen}
        >
          Tambah Maskapai <Icon icon="prime:file-import" width={20} />
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
      <Tablev2 isPending={isLoading} columns={columns} data={records} customStyles={customStyles} />

    </div>
  );
};

export default AirLine;
