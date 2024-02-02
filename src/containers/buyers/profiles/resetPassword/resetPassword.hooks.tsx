import React, { useEffect, useState } from "react";
import { ResetPassword, IResetPassword} from "../profiles.types";
export default function useResetPassword() {
  const [newPassword, setNewPassword] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [status, setStatus] = useState<string>("");
  const [showPassword2, setShowPassword2] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case "confirmPassword":
      
        setConfirmPassword(value);
        break;
      case "newPassword":
       setNewPassword(value);
      
        break;
      case "currentPassword":
        setCurrentPassword(value);
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
    const data:IResetPassword ={newPassword,currentPassword,confirmPassword}
    const fetch = await ResetPassword(data)
    if(fetch.status=="fail"){
    setStatus("password tidak sama atau password baru kurang dari 8 digits");
    }
    else{
    setStatus("password sukses diubah"); 
    }
   }
  return {
    currentPassword,
    newPassword,
    confirmPassword,
    showPassword,
    showPassword2,
    showConfirmPassword,
    togglePasswordVisibility,
    togglePasswordVisibility2,
    toggleConfirmPasswordVisibility,
    handleChange,
 
    status,
    handleSubmit,
  };
}
