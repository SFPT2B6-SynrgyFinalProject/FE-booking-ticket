import React, { useEffect, useState } from "react";
import { Link, NavigateFunction, useNavigate, useSearchParams } from "react-router-dom";
import Button from "../components/Button";
import InputComponent from "../components/Input";
import Logo from "./../assets/images/logo.png";
import Airplane from "./../assets/images/airplane-and-packages-1.png";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ResetNewPassword, ResetPasswordRequestBody } from "../lib/services/sendPassword";
import { IAlert } from "../lib/services/auth";
import Alert from "../components/Alert";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmpassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate();
  const [alert, setAlert] = useState<IAlert | null>(null);
  const [searchParams] = useSearchParams("");
  const otp: string | null = searchParams.get("otp");

  useEffect(() => {
    if (alert !== null) {
      const timeoutId = setTimeout(() => {
        setAlert(null);
        if (alert?.type === "success") {
          navigate("/login");
        }
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [alert, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
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
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();

    try {
      const payload: ResetPasswordRequestBody = {
        otp,
        newPassword,
      };

      if (payload.newPassword.length < 8) {
        throw new Error("Password minimal 8 karakter!");
      }

      const fetchResult = await ResetNewPassword(payload);

      if (fetchResult.status === "fail" || fetchResult.status === "error") {
        const errorMessages = Object.values(fetchResult.data).map((value) => value);
        throw new Error(errorMessages.join("\n"));
      }

      setAlert({
        type: "success",
        data: {},
        message: "Reset password berhasil, silahkan login!",
      });
    } catch (error) {
      if (error instanceof Error) {
        setAlert({
          type: "fail",
          data: { errorResponse: error.message },
        });
      }
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 0);
    }
  };

  return (
    <div className="flex items-center justify-center lg:h-screen lg:bg-blue-300">
      <div className="relative flex items-center justify-center p-10 bg-white rounded-lg sm:w-10/12 lg:w-9/12">
        <div className="hidden w-full lg:w-1/2 lg:block">
          <div className="w-full h-full">
            <img
              src={Airplane}
              alt="bg-login"
              className="object-cover shadow-xl rounded-2xl"
              style={{
                backgroundColor: "#F3F4F6",
                height: "500px",
                margin: "30px",
              }}
            />
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="px-0 mt-10 md:pt-0 md:px-16 lg:px-2">
            {alert && (
              <div>
                {alert.type === "success" && <Alert message={alert.message} type="success" />}
                {alert.type === "fail" && (
                  <Alert message={Object.values(alert.data).join("\n")} type="fail" />
                )}
              </div>
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
                &nbsp;&nbsp; <h1 className="text-xl font-bold">Reset New Password</h1>
              </div>
              <p className="mt-5 text-sm text-center">
                Silahkan masukan New Password dengan kombinasi angka, huruf dan simbol{" "}
              </p>
            </div>
            <form onSubmit={handleSubmit} className="mt-10 md:pt-0 md:px-0 lg:px-12">
              <>
                <div className="flex flex-col mb-5">
                  <InputComponent
                    type={showPassword ? "text" : "password"}
                    id="newPassword"
                    name="newPassword"
                    value={newPassword}
                    placeholder="New Password"
                    onChange={handleChange}
                    icon={showPassword ? "mingcute:eye-line" : "mingcute:eye-close-line"}
                    onIconClick={togglePasswordVisibility}
                    iconPosition="right"
                  />
                </div>

                <div className="flex flex-col mb-5">
                  <InputComponent
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmpassword"
                    name="confirmpassword"
                    value={confirmpassword}
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    icon={showConfirmPassword ? "mingcute:eye-line" : "mingcute:eye-close-line"}
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
                  disabled={
                    !newPassword || !confirmpassword || newPassword !== confirmpassword || isLoading
                  }
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
