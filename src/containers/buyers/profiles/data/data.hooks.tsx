import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../config/redux/store";
import { IProfileData, editProfile } from "../profiles.types";
export default function useData() {
  const [disabled, setDisabled] = useState<boolean>(true);

  const profileData = useSelector((state: RootState) => state.userReducer);
  const [fullName, setFullName] = useState<string>(profileData.fullName);
  const [gender, setGender] =  useState<string | undefined>(profileData.gender); 
  const [email, setEmail] = useState<string>(profileData.email);
  const [noHp, setNoHp] = useState<string|null>(profileData.noHp);
  const [birthDate, setBirthDate] = useState<string>(profileData.birthDate)
  const [status , setStatus]=useState<string>("")
  
  const off = () => {
    setDisabled(false);
  };
  const on = () => {
    setDisabled(true);
  };


  const handleOnSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGender = event.target.value; // Retrieve the selected value
    setGender(selectedGender); // Update the state with the selected value
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const { name, value } = event.target;
    switch (name) {
      case "fullName":
        setFullName(value);
        break;
      case "email":
       setEmail(value);
        break;
      case "gender":
        setGender(value);
        break;
      case "noHp":
         setNoHp(value);
      break;
      case "birthDate":
         setBirthDate(value);
      break;
    }
  };
  useEffect(() => {
    if (status !== "") {
      const timeout = setTimeout(() => {
        setStatus(""); 
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [status]);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data:IProfileData ={fullName,email,birthDate,gender,noHp}
    const fetch = await editProfile(data)
    if(fetch.status=="fail"){
    setStatus("data gagal diubah");
    }
    else{
    setStatus("data sukses diubah"); 
    setDisabled(true)
    }
   ;
  };
  return {
    disabled,
    fullName,
    status,
    handleOnSelect,
    gender,
    email,
    handleChange,
    noHp,
    birthDate,
    on,
    off,
    close,
    handleSubmit,
  };
}