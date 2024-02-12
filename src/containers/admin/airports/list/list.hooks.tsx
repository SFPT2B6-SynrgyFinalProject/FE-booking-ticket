/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import {IAirports,editAirport,getAirports,addAirport } from "../airports.types";
import { useSelector } from "react-redux";
import { RootState } from "../../../../config/redux/store";
import { AlertProps } from "../../../../components/Alert";
export default function useList() {
  const [open, setOpen] = useState<boolean>(false);
  const [records, setRecords] = useState<IAirports[]>([]);
  const [cityName,setCityName]=useState<number | string>("");
  const [airportName,setAirportName]=useState<string>("");
  const [judul, setJudul] = useState("Tambah Data Bandara");
  const [id , setID ] = useState<number>(0)
  const [code, setcode] = useState("");
  const [alert, setAlert] = useState<AlertProps | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const tambah = async ()=>{
    setIsLoading(true);
    
    const id = records.length++;
    const data : IAirports={id,cityName,airportName,code};
    try {
      const fetch = await addAirport(data);
      if (fetch.status == "fail") {
  
        setOpen(false)
        setAlert({
          type: "fail",
          message: "Data bandara gagal ditambah!",
        });
      
      } else {
        setOpen(false)
        setAlert({
          type: "success",
          message: "Data bandara berhasil ditambah!",
        });
        
      }
    } catch (error) {
      console.log("error");
    }finally{
      setIsLoading(false);
      setOpen(false);
      setTimeout(() => {
        setAlert(null)
      }, 2000);
      fetchAirport();
    }
  }
  const kirim = async () => {
    setIsLoading(true);
    const data : IAirports={id,cityName,airportName,code};
    try {
      const fetch = await editAirport(data);
      if (fetch.status == "fail") {
        setAlert({
          type: "fail",
          message: "Data bandara gagal diubah!",
        });

      } else {
        setAlert({
          type: "success",
          message: "Data bandara berhasil diubah!",
        });

      }
    } catch (error) {
      console.log("error");
    }finally{
      setIsLoading(false); 
      setOpen(false);
      setTimeout(() => {
        setAlert(null)
      }, 2000);
      fetchAirport();
    }
  };
  const fetchAirport = async () => {
    setIsLoading(true);
    const data = await getAirports()
    try {
      setRecords(data.data.airports);
    } catch (error) {
      console.log("error");
    } finally {
      setIsLoading(false);
    }
  };
  const optionAirport = useSelector((state: RootState) => state.airportReducer);

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newData = records.filter((row: { airportName: string; code: string }) => {
      return (
        row.airportName.toLowerCase().includes(e.target.value.toLowerCase()) ||
        row.code.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
    setRecords(newData);
  };

  const clickOpen = (): void => {
    setAirportName("");
    setcode("");
    setCityName("");
    setJudul("Tambah Data Bandara")
    setOpen(true);
  };

  const clickClose = (): void => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
    case "airportName":
        setAirportName(value);
    break;
    case "code":
        setcode(value);
    break;
    case "cityName":
        setCityName(value);
    break;
    }
  };
  const handleEdit = (id: number): void => {
      setID(id);
      setJudul("Ubah Data Bandara");
      const record: IAirports | undefined = records.find((rec) => rec.id === id);
      if (record!=undefined) {
        setAirportName(record.airportName);
        setcode(record.code);
        setCityName(record.cityName);
        setOpen(true);
      } else {
        console.error("Record dengan ID yang diberikan tidak ditemukan.");
      }
      
  };

  
  useEffect(() => {
    fetchAirport();
  }, []);

  return {
    records,
    open,
    clickOpen,
    clickClose,
    airportName,
    cityName,
    code,
    judul,
    optionAirport,
    handleEdit,
    handleFilter,
    handleChange,
    alert,
    kirim,
    tambah,
    isLoading
  };
}
