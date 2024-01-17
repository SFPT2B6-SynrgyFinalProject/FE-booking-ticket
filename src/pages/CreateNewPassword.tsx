import React, { useState } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";

import Button from "../components/Button";
import InputComponent from "../components/Input";
import Logo from "./../assets/images/logo.png";
import Airplane from "./../assets/images/airplane-and-packages-1.png";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ResetNewPassword, ResetPasswordRequestBody } from "../lib/services/sendPassword";
const timeOutMessage: number = 2000;

// import InputComponent from "../components/Input";



export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmpassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [failMessage, setFailMessage] = useState<string>("");
  const navigate: NavigateFunction = useNavigate();
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const otp : string = urlParams.get('otp') || "";


  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
    console.log(showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
    console.log(showConfirmPassword);
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
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();
    try {
      const payload : ResetPasswordRequestBody = {
        otp,
        newPassword
      }
      const response = await ResetNewPassword(payload);
      if (
        response.status?.includes("fail")
      ) {
        throw new Error('Gagal Mengimkan newPassword');
      }
      setSuccessMessage(response.status);
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/login");
      }, timeOutMessage);
    }
    catch (error) {
      if (error instanceof Error) {
        setFailMessage(error.message);
        setTimeout(() => {
          setFailMessage("");
        }, timeOutMessage);
      }
    }
    finally {
      setTimeout(() => {
        setIsLoading(false);
      }, timeOutMessage);
    }
  }
 
  

  


  return (
    <div className="flex justify-center items-center lg:h-screen lg:bg-blue-300">
      <div className="flex justify-center items-center bg-white rounded-lg p-10 sm:w-10/12 lg:w-9/12 relative">
        <div className="w-full lg:w-1/2 lg:block hidden">
          <div className="w-full h-full">
            <img
              src={Airplane}
              alt="bg-login"
              className="object-cover rounded-2xl shadow-xl"
              style={{
                backgroundColor: "#F3F4F6",
                height: "500px",
                margin: "30px",
              }}
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="mt-10 md:pt-0 px-0 md:px-16 lg:px-2">
            {successMessage && (
              <h3 className="text-center bg-green-500 text-white px-5 py-2 absolute top-5 right-5">
                {successMessage}
              </h3>
            )}
            {failMessage && (
              <h3 className="text-center rounded-md bg-red-500 text-white px-5 py-2 absolute top-5 right-5">
                {failMessage}
              </h3>
            )}
            <div className="flex flex-col items-center mb-3 min-w-72">
              
              <img src={Logo} alt="logo" className="object-cover w-50" />
              <div className="flex items-center mt-5">
                <Link to="/">
                  <Icon
                    icon="ic:outline-keyboard-arrow-left"
                    width={30}
                    height={30}
                    color="#1C1C1E"
                  />
                </Link>{" "}
                &nbsp;&nbsp;{" "}
                <h1 className="font-bold text-xl">Reset New Password</h1>
              </div>
              <p className="mt-5 text-sm text-center">Silahkan masukan New Password dengan  kombinasi angka, huruf dan simbol </p>
            </div>
            <form
              onSubmit={handleSubmit}
              className="mt-10 md:pt-0 md:px-0 lg:px-12"
            >
              <>
                <div className="flex flex-col mb-5">
                  <InputComponent
                    type={showPassword ? "text" : "newPassword"}
                    id="newPassword"
                    name="newPassword"
                    value={newPassword}
                    placeholder="New Password"
                    onChange={handleChange}
                    icon={
                      showPassword
                        ? "mingcute:eye-line"
                        : "mingcute:eye-close-line"
                       
                    }
                    onIconClick={togglePasswordVisibility}
                    iconPosition="right"
                  />
                </div>



                <div className="flex flex-col mb-5">
                  <InputComponent
                    type={showConfirmPassword ? "text" : "newPassword"}
                    id="confirmpassword"
                    name="confirmpassword"
                    value={confirmpassword}
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    icon={
                      showConfirmPassword
                        ? "mingcute:eye-line"
                        : "mingcute:eye-close-line"
                       
                    }
                    onIconClick={toggleConfirmPasswordVisibility}
                    iconPosition="right"
                    customStyle={newPassword !== confirmpassword ? "border-red-500" : ""}
                  />
                  {newPassword !== confirmpassword && (
                    <p className="text-red-500">Password tidak sama</p>
                  )}
                </div>

                <Button
                  type="primary-dark"
                  width="full"
                  color="primary-dark"
                  className={`mt-5`}
                  disabled={ !newPassword || !confirmpassword || newPassword !== confirmpassword || isLoading}
                >
                  {"Reset Password"}
                </Button>
              </>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
