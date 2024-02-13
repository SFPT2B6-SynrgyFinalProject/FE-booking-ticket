import React, { useEffect, useState } from "react";
import { ResetPassword, IResetPassword } from "../profiles.types";
import { IAlert } from "../../../../lib/services/auth";
export default function useResetPassword() {
  const [newPassword, setNewPassword] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [alert, setAlert] = useState<IAlert | null>(null);
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
    const data: IResetPassword = { newPassword, currentPassword, confirmPassword };
    const fetch = await ResetPassword(data);
    if (fetch.status == "fail") {
      setAlert({
        type: "process",
        data: {},
        message: "Proses perubahan data",
      });
      setTimeout(() =>{setAlert(null)},3000)
      setTimeout(() => {
        setStatus("Password lama tidak sama atau password baru kurang dari 8 digit");
      }, 3000);
    } else {
      setAlert({
        type: "process",
        data: {},
        message: "Proses perubahan data",
      });
      setTimeout(() =>{setAlert(null)},3000)
      setTimeout(() => {
      setStatus("Password sukses diubah");
      },3000);
      setConfirmPassword("");
      setCurrentPassword("");
      setNewPassword("");
    }
  };
  return {
    currentPassword,
    newPassword,
    confirmPassword,
    showPassword,
    showPassword2,
    alert,
    showConfirmPassword,
    togglePasswordVisibility,
    togglePasswordVisibility2,
    toggleConfirmPasswordVisibility,
    handleChange,
    close,
    status,
    handleSubmit,
  };
}
