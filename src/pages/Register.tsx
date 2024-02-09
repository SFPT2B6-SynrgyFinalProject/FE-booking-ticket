import React, { useEffect, useState } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import InputComponent from "../components/Input";
import Logo from "./../assets/images/logo.png";
import Airplane from "./../assets/images/airplane-and-packages-1.png";
import { Icon } from "@iconify/react/dist/iconify.js";
import Alert from "../components/Alert";
import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { registerUser, RegisterRequestBody, IAlert } from "../lib/services/auth";

const CLIENT_ID: string | undefined = process.env.VITE_CLIENT_ID;

export default function Register() {
  const [email, setEmail] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [confirm_password, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [tanggalLahir, setTanggalLahir] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fail, setFail] = useState<boolean>(true);
  const [border, setBorder] = useState<boolean>(true);
  const navigate: NavigateFunction = useNavigate();
  const [alert, setAlert] = useState<IAlert | null>(null);
  const [clickTanggal, setClickTanggal] = useState<boolean>(false);
  const [isValidBirthdate, setIsValidBirthdate] = useState<boolean>(true);

  useEffect(() => {
    if (alert !== null) {
      const timeoutId = setTimeout(() => {
        setAlert(null);
        if (alert?.type === "success") {
          navigate("/");
        }
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [alert, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };


  const togglePasswordVisibility1 = () => {
    setShowConfirmPassword((prev) => !prev);
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

  const isValidBirth = (dateString: string): boolean => {
    const currentDate = new Date();
    const inputDate = new Date(dateString);
    const minValidDate = new Date(
      currentDate.getFullYear() - 17,
      currentDate.getMonth(),
      currentDate.getDate()
    );
    return inputDate < minValidDate;
  };

  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "fullName":
        setFullName(value);
        break;
      case "tanggalLahir":

        setIsValidBirthdate(isValidBirth(value));
        setTanggalLahir(value);
        break;
    }
  };

  const handleOnSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setGender(value);
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

      if (payload.password.length < 8) {
        throw new Error("Password minimal 8 karakter!");
      }

      const fetchResult = await registerUser(payload);

      if (fetchResult.status === "fail" || fetchResult.status === "error") {
        const errorMessages = Object.values(fetchResult.data).map((value) => value);

        throw new Error(errorMessages.join("\n"));
      }

      setAlert({
        type: "success",
        data: {},
        message: "Register berhasil, silahkan cek email Anda",
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

  const handleCredentialResponse = async (credentialResponse: CredentialResponse) => {
    try {
      // console.log(credentialResponse);
      const bearerToken: string = "Bearer";
      const credentialToken = `${bearerToken} ${credentialResponse.credential}` as string;

      if (!credentialToken.startsWith(bearerToken)) {
        throw new Error("Format token salah!");
      }

      localStorage.setItem("user_access_token", credentialResponse.credential as string);

      setAlert({
        type: "success",
        data: {},
        message: "Register berhasil!",
      });
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }  
  const handleCredentialResponseError = async () => {
    console.log("Register gagal!");
  };

  return (
    <div className="flex items-center justify-center lg:h-full lg:bg-blue-300 ">
      <div className="relative flex items-center justify-center p-10 bg-white rounded-md lg:my-16 sm:w-10/12 lg:w-9/12">
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
                </Link>
                &nbsp;&nbsp;
                <h1 className="text-xl font-bold">Register your account</h1>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="mt-10 md:pt-0 md:px-0 lg:px-12">
              <>
                {/* <div className="h-[250px] register-scroll overflow-y-auto"> */}
                <div className="flex flex-col mb-5">
                  <InputComponent
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    customStyle={`py-[18px] pl-[20px] pr-[20px]`}
                    placeholder="Email Address"
                  />
                </div>
                <div className="flex flex-col mb-5">
                  <InputComponent
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={fullName}
                    customStyle="py-[18px] pl-[20px] pr-[20px]"
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
                    customStyle="py-[18px] pl-[20px] pr-[20px]"
                    placeholder="Masukan Password"
                    onChange={handleChange}
                    icon={showPassword ? "mingcute:eye-line" : "mingcute:eye-close-line"}
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
                    customStyle={`py-[18px] pl-[20px] pr-[20px] ${border ? "" : "border-2 border-rose-600"
                      }`}
                    icon={showConfirmPassword ? "mingcute:eye-line" : "mingcute:eye-close-line"}
                    onIconClick={togglePasswordVisibility1}
                    iconPosition="right"
                  />
                  <span className="text-rose-600">{fail ? "" : "password tidak sama"}</span>
                </div>

                <div className="flex flex-col mb-5">

                  <InputComponent
                    type={clickTanggal ? "date" : "text"}
                    id="tanggalLahir"
                    name="tanggalLahir"
                    value={tanggalLahir}
                    customStyle="py-[18px] pl-[20px] pr-[20px]"
                    onChange={handleChange}
                    onFocus={() => setClickTanggal(true)}
                    onBlur={() => setClickTanggal(false)}
                    placeholder="Tanggal Lahir"
                />

                  {!isValidBirthdate && (
                    <p className="text-red-500 text-sm font-medium pt-1">
                      *Minimal usia 17 tahun dari sekarang.
                    </p>
                  )}
                 
                </div>
                <div className="flex flex-col mb-7">
                  <select
                    name="gender"
                    id="gender"
                    value={gender}
                    onChange={handleOnSelect}
                    className="appearance-none bg-white border rounded-[10px] w-full py-[18px] pr-[20px] text-gray-700 border-[#757575] leading-tight focus:outline-none focus:shadow-outline pl-[20px]"
                  >
                    <option disabled={true} value="">
                      -- Choose Gender --
                    </option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
                {/* </div> */}
                <Button
                  type="primary-dark"
                  width="full"
                  color="primary-dark"
                  className={`mt-5`}
                  disabled={
                    !email ||
                    !password ||
                    !fullName ||
                    !tanggalLahir ||
                    password !== confirm_password ||
                    !gender ||
                    !isValidBirthdate ||
                    isLoading
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
                  style={{
                    flex: 1,
                    height: "1px",
                    backgroundColor: "black",
                  }}
                />

                <div>
                  <p
                    style={{
                      width: "20px",
                      textAlign: "center",
                    }}
                  >
                    Or
                  </p>
                </div>

                <div
                  style={{
                    flex: 1,
                    height: "1px",
                    backgroundColor: "black",
                  }}
                />
              </div>
            </form>

            <div className="flex items-center justify-center mt-5">
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

            <p className="mt-5 mb-2 text-center ">
              Already Have an acoount?{" "}
              <Link to={"/login"} className="text-indigo-600 hover:text-indigo-500">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
