// Contoh penggunaan komponen Tablev2 di halaman lain
import Tablev2 from "../../components/Tablev2";
import Button from "../../components/Button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import InputComponent from "../../components/Input";
import { FormModal } from "../../components/FormModal";

interface Row {
  id: number;
  bandara_asal: string;
  bandara_tujuan: string;
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

const Route: React.FC<TableProps> = () => {
  const[judul,setJudul]=useState("Tambah Data Rute")
  function handleEdit(id: number): void {
    setJudul("Ubah Data Rute")
    setBandaraAsal(data[id-1]["bandara_asal"])
    setBandaraTujuan(data[id-1]["bandara_tujuan"])
    setOpen(true)
  }
  
  function handleDelete(id: number): void {
    setJudul("Hapus Data Rute")
    setOpen(true)
  }
  
  const columns = [
    {
      name: "Bandara Asal",
      selector: (row: Row) => row.bandara_asal,
      width: "35rem",
      sortable: true,
    },
    {
      name: "Bandara Tujuan",
      selector: (row: Row) => row.bandara_tujuan,
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
       bandara_asal: "Soekarno-Hatta International Airport (CGK)",
       bandara_tujuan: "Ngurah Rai International Airport (DPS)"
      },
      {
        id: 2,
       bandara_asal: "Ngurah Rai International Airport (DPS)",
       bandara_tujuan: "Juanda International Airport (SUB)"
      },
      {
        id: 3,
       bandara_asal: "Juanda International Airport (SUB)",
       bandara_tujuan: "Soekarno-Hatta International Airport (CGK)"
      },
      {
        id: 4,
       bandara_asal: "Soekarno-Hatta International Airport (CGK)",
       bandara_tujuan: "Adisutjipto International Airport (JOG)"
      },
      {
        id: 5,
       bandara_asal: "Adisutjipto International Airport (JOG)",
       bandara_tujuan: "Ngurah Rai International Airport (DPS)"
      },
      {
        id: 6,
       bandara_asal: "Ngurah Rai International Airport (DPS)",
       bandara_tujuan: "Juanda International Airport (SUB)"
      },
      {
        id: 7,
       bandara_asal: "Juanda International Airport (SUB)",
       bandara_tujuan: "Adisutjipto International Airport (JOG)"
      },
      {
        id: 8,
       bandara_asal: "Adisutjipto International Airport (JOG)",
       bandara_tujuan: "Soekarno-Hatta International Airport (CGK)"
      },
      {
        id: 9,
       bandara_asal: "Soekarno-Hatta International Airport (CGK)",
       bandara_tujuan: "Ngurah Rai International Airport (DPS)"
      },
      {
        id: 10,
       bandara_asal: "Ngurah Rai International Airport (DPS)",
       bandara_tujuan: "Juanda International Airport (SUB)"
      },
      {
        id: 11,
       bandara_asal: "Juanda International Airport (SUB)",
       bandara_tujuan: "Soekarno-Hatta International Airport (CGK)"
      },
      {
        id: 12,
       bandara_asal: "Soekarno-Hatta International Airport (CGK)",
       bandara_tujuan: "Adisutjipto International Airport (JOG)"
      },
      {
        id: 13,
       bandara_asal: "Adisutjipto International Airport (JOG)",
       bandara_tujuan: "Ngurah Rai International Airport (DPS)"
      },
      {
        id: 14,
       bandara_asal: "Ngurah Rai International Airport (DPS)",
       bandara_tujuan: "Juanda International Airport (SUB)"
      },
      {
        id: 15,
       bandara_asal: "Juanda International Airport (SUB)",
       bandara_tujuan: "Adisutjipto International Airport (JOG)"
      },
      {
        id: 16,
       bandara_asal: "Adisutjipto International Airport (JOG)",
       bandara_tujuan: "Soekarno-Hatta International Airport (CGK)"
      },
      {
        id: 17,
       bandara_asal: "Soekarno-Hatta International Airport (CGK)",
       bandara_tujuan: "Ngurah Rai International Airport (DPS)"
      },
      {
        id: 18,
       bandara_asal: "Ngurah Rai International Airport (DPS)",
       bandara_tujuan: "Juanda International Airport (SUB)"
      },
      {
        id: 19,
       bandara_asal: "Juanda International Airport (SUB)",
       bandara_tujuan: "Soekarno-Hatta International Airport (CGK)"
      },
      {
        id: 20,
       bandara_asal: "Soekarno-Hatta International Airport (CGK)",
       bandara_tujuan: "Adisutjipto International Airport (JOG)"
      }
    ];
  const [open,setOpen]=useState<boolean>(false)
  const [records, setRecords] = useState(data);

  function handleFilter(e: React.ChangeEvent<HTMLInputElement>) {
    const newData = data.filter((row: { bandara_asal: string; bandara_tujuan: string; }) => {
      return (
        row.bandara_asal.toLowerCase().includes(e.target.value.toLowerCase()) ||
        row.bandara_tujuan.toLowerCase().includes(e.target.value.toLowerCase())
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
  const[bandara_asal, setBandaraAsal] = useState("")
  const [bandara_tujuan, setBandaraTujuan] = useState("")
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
        {judul === "Ubah Data Rute" || judul === "Tambah Data Rute" ? (
          <div className="mt-2">
            <div className="mb-3">
              <InputComponent
                placeholder="bandara asal "
                type="text"
                id="bandara-asal"
                name="bandara-asal"
                value={bandara_asal}
                onChange={handleChange}
              />
            </div>
            <div>
              <InputComponent
                placeholder="bandara tujuan"
                type="text"
                id="bandara-tujuan"
                name="bandara-tujuan"
                value={bandara_tujuan}
                onChange={handleChange}
              />
            </div>
          </div>
        ) : (
          <p>Anda Yakin Menghapus Data Ini?</p>
        )}

        <div className="mt-4 flex gap-x-4 justify-center">
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
      <div className="flex flex-col md:flex-row md:justify-between items-center">
        <Button className={`!bg-green-600 py-[11px] text-white px-[14px] sm:px-[35px] md:px-[24px]`} size="xs" onClick={clickOpen} >
          tambah rute  <Icon icon="prime:file-import"  width={20}  />
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

export default Route;

