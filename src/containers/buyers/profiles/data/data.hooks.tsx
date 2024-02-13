import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../config/redux/store";
import { IProfileData, editProfile } from "../profiles.types";
export default function useData() {
  const [disabled, setDisabled] = useState<boolean>(true);
  const profileData = useSelector((state: RootState) => state.userReducer);
  const [fullName, setFullName] = useState<string>(profileData.fullName);
  const [gender, setGender] = useState<string | undefined>(profileData.gender);
  const [email, setEmail] = useState<string>(profileData.email);
  const [noHp, setNoHp] = useState<string | null>(profileData.noHp);
  const [birthDate, setBirthDate] = useState<string>(profileData.birthDate);
  const [status, setStatus] = useState<string>("");
  const [isValidBirthdate, setIsValidBirthdate] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [umurMin, setUmurMin] = useState<boolean>(false);
 
  const off = () => {

    setDisabled(false);
  };
  const on = () => {
    setBirthDate(profileData.birthDate)
    setFullName(profileData.fullName)
    setEmail(profileData.email)
    setGender(profileData.gender)
    setNoHp(profileData.noHp)
    setDisabled(true);
    setIsValidBirthdate(isValidBirth(profileData.birthDate));
    setOpen(false);
  };
  const verifikasi=()=>{
    setOpen(true)
  }
  const isValidBirth = (dateString: string): boolean => {
    const currentDate = new Date();
    const inputDate = new Date(dateString);
    const minValidDate = new Date(
      currentDate.getFullYear() - 17,
      currentDate.getMonth(),
      currentDate.getDate()
    );
    if(inputDate<minValidDate){
      setUmurMin(true)
    }
    else{
      setUmurMin(false)
    }
    return inputDate < minValidDate;
  };

  const handleOnSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedGender = event.target.value; // Retrieve the selected value
    setGender(selectedGender); // Update the state with the selected value
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
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
        setIsValidBirthdate(isValidBirth(value));
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

  const handleSubmit = async () => {
    const isoBirthDate = new Date(birthDate).toISOString();
    const data: IProfileData = { fullName, email, birthDate: isoBirthDate, gender, noHp };

    const fetch = await editProfile(data);
   
    if (fetch.status == "fail") {
      setStatus("Data gagal diubah");
    } else {
      setStatus("Data sukses diubah");
 
    }
    setOpen(false);
    setDisabled(true);
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
    verifikasi,
    open,
    umurMin,
    off,
    close,
    handleSubmit,
    isValidBirthdate,
  };
}
