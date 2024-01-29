import React, { useState } from "react";

export default function useResetPassword() {
  const [newPassword, setNewPassword] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [confirmpassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
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
      case "confirmpassword":
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

  const handleSubmit = () => {
    console.log("Reset Password Oke!");
  };

  return {
    currentPassword,
    newPassword,
    confirmpassword,
    showPassword,
    showPassword2,
    showConfirmPassword,
    togglePasswordVisibility,
    togglePasswordVisibility2,
    toggleConfirmPasswordVisibility,
    handleChange,
    handleSubmit,
  };
}
