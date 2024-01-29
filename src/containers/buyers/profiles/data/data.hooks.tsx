import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../config/redux/store";

export default function useData() {
  // const [fullName, setFullName] = useState<string>("");
  //   const [gender, setGender]=useState<string>("")
  //   const [email, setEmail]=useState<string>("")
  //   const [tanggalLahir, setTanggalLahir]=useState<string>("")
  //   const [phone, setPhone]=useState<string>("")
  const [disabled, setDisabled] = useState<boolean>(true);
  const profileData = useSelector((state: RootState) => state.userReducer);

  // const handleOnSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   const { value } = event.target;
  //   setGender(value);
  // };
  const off = () => {
    setDisabled(false);
  };
  const on = () => {
    setDisabled(true);
  };
  //   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     const { name, value } = event.target;
  //     switch (name) {
  //       case "fullName":
  //         setFullName(value);
  //         break;
  //       case "tanggalLahir":
  //         setTanggalLahir(value);
  //         break;
  //       case "gender":
  //         setGender(value);
  //         break;
  //       case "email":
  //         setEmail(value);
  //         break;
  //       case "phone":
  //         setPhone(value);
  //         break;

  //   };
  // }

  const handleSubmit = () => {
    console.log("Profile Updated!");
  };

  return {
    disabled,
    profileData,
    on,
    off,
    handleSubmit,
  };
}
