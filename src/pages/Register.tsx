import React, { useState } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Button";
import InputComponent from "../components/Input";
import Logo from "./../assets/images/logo.png";
import Airplane from "./../assets/images/airplane-and-packages-1.png";
import { registerUser, RegisterRequestBody } from "../lib/services/auth";
const CLIENT_ID: string = import.meta.env.VITE_CLIENT_ID;
const timeOutMessage: number = 2000;

export default function Register() {
  const [email, setEmail] = useState<string>("");
  const [checkEmail, setCheckEmail] = useState<boolean>(true);
  const [fullName, setFullName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [confirm_password, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [tanggalLahir, setTanggalLahir] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [failMessage, setFailMessage] = useState<string>("");
  const [fail, setFail] = useState<boolean>(true);
  const [border, setBorder] = useState<boolean>(true);
  const navigate: NavigateFunction = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);

    console.log(showPassword);
  };
  const check = (value: string) => {
    setCheckEmail(true);
    console.log(value);
  }; //tolong ubah
  const togglePasswordVisibility1 = () => {
    setShowConfirmPassword((prev) => !prev);

    console.log(showPassword);
  };
  const validate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value === password) {
      setFail(true);
      setBorder(true);
    } else {
      setFail(false);
      setBorder(false);
    }
    setConfirmPassword(value);
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case "genderMale":
        setGender(value);
        break;
      case "genderFemale":
        setGender(value);
        break;
      case "email":
        setEmail(value);
        check(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "fullName":
        setFullName(value);
        break;
      case "tanggalLahir":
        setTanggalLahir(value);
        break;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();
    try {
      const payload: RegisterRequestBody = {
        email,
        password,
        fullName,
        gender: gender,
        birthDate: new Date(tanggalLahir).toISOString(),
      };
      if (!payload.email || !payload.password) {
        throw new Error(
          `${!payload.email ? "Email" : "Password"} tidak boleh kosong!`
        );
      }
      if (!payload.email.includes("@")) {
        throw new Error("Format email salah!");
      }
      if (payload.password.length < 8) {
        throw new Error("Password minimal 8 huruf!");
      }

      await registerUser(payload);

      setSuccessMessage("Register berhasil");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/");
      }, timeOutMessage);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setFailMessage(error.message);
        setTimeout(() => {
          setFailMessage("");
        }, timeOutMessage);
      }
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, timeOutMessage);
    }
  };

  const handleCredentialResponse = async (
    credentialResponse: CredentialResponse
  ) => {
    try {
      const bearerToken: string = "Bearer";
      const credentialToken =
        `${bearerToken} ${credentialResponse.credential}` as string;
      if (!credentialToken.startsWith(bearerToken)) {
        throw new Error("Format token salah!");
      }
      setSuccessMessage("Register berhasil");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/");
      }, timeOutMessage);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  const handleCredentialResponseError = async () => {
    console.log("Register gagal!");
  };

  return (
    <div className="flex justify-center items-center lg:h-screen lg:bg-blue-300 ">
      <div className="flex justify-center items-center bg-white rounded-md p-8 lg:w-9/12 relative max-h-[660px]">
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
          <div className="mt-10 md:pt-0 px-8 md:px-16 lg:px-2">
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
            <div className="flex flex-col items-center mb-3 ">
              <img src={Logo} alt="logo" className="object-cover w-50" />
              <div className="flex items-center mt-5 ">
                <Link to="/">
                  {" "}
                  <FontAwesomeIcon icon={faChevronLeft} />{" "}
                </Link>{" "}
                &nbsp;&nbsp;&nbsp;{" "}
                <h1 className="font-bold text-xl">Register Account</h1>
              </div>
            </div>
            <form
              onSubmit={handleSubmit}
              className="mt-10 md:pt-0 md:px-16 lg:px-12  "
            >
              <>
                <div className="h-[250px] overflow-y-auto">
                  <div className="flex flex-col mb-7">
                    <InputComponent
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      customStyle={checkEmail ? "" : "border-2 border-rose-600"}
                      placeholder="Email Address"
                    />
                    <span>{checkEmail ? "" : "email sudah ada"}</span>
                  </div>
                  <div className="flex flex-col mb-7">
                    <InputComponent
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={fullName}
                      onChange={handleChange}
                      placeholder="Full Name"
                    />
                  </div>
                  <div className="flex flex-col mb-5">
                    <InputComponent
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      value={password}
                      placeholder="Password"
                      onChange={handleChange}
                      icon={
                        showPassword
                          ? "mingcute:eye-close-line"
                          : "mingcute:eye-line"
                      }
                      onIconClick={togglePasswordVisibility}
                      iconPosition="right"
                    />
                  </div>
                  <div className="flex flex-col mb-5">
                    <InputComponent
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirm_password"
                      name="confirm_password"
                      value={confirm_password}
                      onChange={validate}
                      placeholder="Confirm Password"
                      customStyle={border ? "" : "border-2 border-rose-600"}
                      icon={
                        showConfirmPassword
                          ? "mingcute:eye-close-line"
                          : "mingcute:eye-line"
                      }
                      onIconClick={togglePasswordVisibility1}
                      iconPosition="right"
                    />
                    <span className="text-rose-600">
                      {fail ? "" : "password tidak sama"}
                    </span>
                  </div>
                  <div className="flex flex-col mb-5">
                    <InputComponent
                      type="date"
                      id="confirm_password"
                      name="confirm_password"
                      value={tanggalLahir}
                      onChange={handleChange}
                      onIconClick={togglePasswordVisibility1}
                      placeholder=""
                    />
                    <label htmlFor="gender" className="mt-2 mb-1">
                      Gender
                    </label>
                    <div className="flex items-center mb-5">
                      <input
                        type="radio"
                        id="genderMale"
                        className="inline-block"
                        name="gender"
                        value="Laki-Laki"
                        onChange={handleChange}
                      />
                      Laki-Laki
                      <input
                        type="radio"
                        id="genderFemale"
                        className="inline-block ml-3"
                        name="gender"
                        value="Perempuan"
                        onChange={handleChange}
                      />
                      Perempuan
                    </div>
                  </div>
                </div>
                <Button
                  type="primary-dark"
                  width="full"
                  color="primary-dark"
                  className={`mt-5`}
                  disabled={
                    !email ||
                    !password ||
                    isLoading ||
                    !confirm_password ||
                    !fail ||
                    !gender
                  }
                >
                  {isLoading ? "Loading ..." : "Register"}
                </Button>
              </>
              <div
                className="mt-5"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <div
                  style={{ flex: 1, height: "1px", backgroundColor: "black" }}
                />

                <div>
                  <p style={{ width: "20px", textAlign: "center" }}>Or</p>
                </div>

                <div
                  style={{ flex: 1, height: "1px", backgroundColor: "black" }}
                />
              </div>
            </form>

            <div className="mt-5 flex justify-center items-center">
              <GoogleOAuthProvider clientId={`${CLIENT_ID}`}>
                <GoogleLogin
                  onSuccess={handleCredentialResponse}
                  onError={handleCredentialResponseError}
                  shape="circle"
                  type="standard"
                  text="signin_with"
                  locale="en_US"
                />
              </GoogleOAuthProvider>
            </div>

            <p className="mt-5 text-center mb-2 ">
              Already Have an acoount?{" "}
              <Link
                to={"/login"}
                className="text-indigo-600 hover:text-indigo-500"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
