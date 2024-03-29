// Contoh penggunaan komponen Tablev2 di halaman lain
import Tablev2 from "../../../../components/Tablev2";
import Button from "../../../../components/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { IUsers } from "../users.types";
import InputComponent from "../../../../components/Input";
import { FormModal } from "../../../../components/FormModal";
import useAction from "./list.hooks";
import Alert from "../../../../components/Alert";

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
  const {
    alert,
    isLoading,
    records,
    open,
    clickClose,
    judul,
    handleEdit,
    handleDelete,
    handleSearch,
    handleChange,
    handleOnSelect,
    deleteData,
    editData,
    formValues,
  } = useAction();

  const columns = [
    {
      name: "Name",
      selector: (row: IUsers) => row.fullName,
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
      selector: (row: IUsers) => row.phoneNumber,
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
      {alert && (
        <Alert type={alert.type} message={alert.message} />// Display the alert if it exists
      )}

      <FormModal isOpen={open} title={judul}>
        {/* Ternary 3 kondisi */}

        {/* <form onSubmit={
              judul === "Tambah Data maskapai"
              ? postData
              : judul === "Edit Data Maskapai"
              ? editData
              : deleteData
          } > */}

        <form onSubmit={judul === "Ubah Data User" ? editData : deleteData}>
          {judul === "Ubah Data User" ? (
            <div className="mt-2">
              <div className="mb-3">
                <label htmlFor="fullName">Nama Lengkap</label>
                <input id="fullName" name="fullName" value={formValues.fullName} onChange={handleChange} type="text" className="w-full h-[40px] mt-1 border border-[#ddd] rounded-md outline-none px-4 text-sm shadow" />
              </div>
              <div className="mb-3">
                <label htmlFor="phoneNumber">No Telepon</label>
                <input id="phoneNumber" name="phoneNumber" value={formValues.phoneNumber} onChange={handleChange} type="text" className="w-full h-[40px] mt-1 border border-[#ddd] rounded-md outline-none px-4 text-sm shadow" />
              </div>
              <div className="mb-3">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" value={formValues.email} onChange={handleChange} type="email" className="w-full h-[40px] mt-1 border border-[#ddd] rounded-md outline-none px-4 text-sm shadow" />
              </div>
              <div className="mb-3">
                <label htmlFor="role">Role</label>
                <select name="role" id="role" onChange={handleOnSelect} className="w-full h-[40px] mt-1 border border-[#ddd] rounded-md outline-none px-4 text-sm shadow" required>
                  <option value="" disabled>Pilih Role</option>
                  <option value="Pembeli">Pembeli</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>
          ) : (
            <p>Anda Yakin Menghapus Data Ini?</p>
          )}

          <div className="mt-4 flex gap-x-4 justify-center">
            <button
              type="button"
              className="bg-white text-primary-normal border border-gray-300 hover:bg-gray-100 rounded-xl text-sm font-medium py-[8px] px-14 w-fit"
              onClick={clickClose}
            >
              Close
            </button>

            <Button type="primary-dark" className=" rounded-xl" color="primary-dark" size="sm">
              {judul === "Hapus Data User" ? "Hapus" : "Simpan"}
            </Button>
          </div>
        </form>
      </FormModal>

      <div className="flex flex-col md:flex-row md:justify-end items-center border-t border-b border-[#000] border-opacity-15 py-[15px] px-3">
        <div className="w-full sm:w-fit">
          <InputComponent
            type="text"
            placeholder="Cari..."
            customStyle="border border-[#000] border-opacity-25 px-4 py-[10px] rounded-[10px] text-base"
            onChange={handleSearch}
          />
        </div>
      </div>
      <Tablev2 isPending={isLoading} columns={columns} data={records} customStyles={customStyles} />
    </div>
  );
};

export default List;
