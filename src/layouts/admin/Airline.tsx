// Contoh penggunaan komponen Tablev2 di halaman lain
import Tablev2 from "../../components/Tablev2";
import Button from "../../components/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import InputComponent from "../../components/Input";
import { FormModal } from "../../components/FormModal";

interface Row {
  id: number;
  maskapai: string;
  kode: string;
}

interface TableColumn {
  name: string;
  width?: string;
  selector?: (row: Row) => string;
  sortable?: boolean;
}

interface TableProps {
  columns?: TableColumn[];
  data?: Row[];
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

const Airline: React.FC<TableProps> = () => {
  const[judul,setJudul]=useState("Tambah Data maskapai")
  const[deleteId,setDeleteId]=useState("")
  function handleEdit(id: number): void {
    setJudul("Ubah Data maskapai")
    setBandaraAsal(data[id-1]["maskapai"])
    setBandaraTujuan(data[id-1]["kode"])
    setOpen(true)
  }
  
  function handleDelete(id:any): void {
    setDeleteId(id)
    setJudul("Hapus Data maskapai")
    setOpen(true)
  }
  
  const columns = [
    {
      name: "Maskapai",
      selector: (row: Row) => row.maskapai,
      width: "35rem",
      sortable: true,
    },
    {
      name: "Kode",
      selector: (row: Row) => row.kode,
      sortable: true,
    },
  
    {
      name: "Aksi",
      center: "true",
      width: "18rem",
      cell: (row: Row) => (
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
            Hapus <Icon icon="ci:trash-empty" width={19}/>
          </Button>
        </div>
      ),
    },
  ];
  
  const data = [
    {
      id: 1,
      maskapai: "Garuda Indonesia",
      kode: "CGK-DPS"
    },
    {
      id: 2,
      maskapai: "Lion Air",
      kode: "DPS-SUB"
    },
    {
      id: 3,
      maskapai: "Citilink",
      kode: "SUB-CGK"
    },
    {
      id: 4,
      maskapai: "Batik Air",
      kode: "CGK-JOG"
    },
    {
      id: 5,
      maskapai: "Sriwijaya Air",
      kode: "JOG-DPS"
    },
    {
      id: 6,
      maskapai: "AirAsia",
      kode: "DPS-SUB"
    },
    {
      id: 7,
      maskapai: "Wings Air",
      kode: "SUB-JOG"
    },
    {
      id: 8,
      maskapai: "Nam Air",
      kode: "JOG-CGK"
    },
    {
      id: 9,
      maskapai: "TransNusa",
      kode: "CGK-DPS"
    },
    {
      id: 10,
      maskapai: "Kalstar Aviation",
      kode: "DPS-SUB"
    }
  ];
  

  
  const [open,setOpen]=useState<boolean>(false)
  const [records, setRecords] = useState(data);

  function handleFilter(e: React.ChangeEvent<HTMLInputElement>) {
    const newData = data.filter((row: { maskapai: string; kode: string; }) => {
      return (
        row.maskapai.toLowerCase().includes(e.target.value.toLowerCase()) ||
        row.kode.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
    setRecords(newData);
  }
 

  function clickOpen():void{
    setOpen(true)
    
  }
  function clickClose():void{
    setOpen(false)
    
  }
  const[maskapai, setBandaraAsal] = useState("")
  const [kode, setBandaraTujuan] = useState("")
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case "bandara-asal":
        setBandaraAsal(value);
        break;
      case "bandara-tujuan":
        setBandaraTujuan(value);
        break;
    }
  };

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
        <input type="hidden" id="hiddenInput" name="hiddenInput" value={deleteId}/>
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
        <Button className={`!bg-green-600 py-[11px] text-white px-[14px] sm:px-[35px] md:px-[24px]`} size="xs" onClick={clickOpen} >
          tambah maskapai  <Icon icon="prime:file-import"  width={20}  />
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
      <Tablev2 columns={columns} data={records} customStyles={customStyles} />
     
    </div>
    
  );
};

export default Airline;

