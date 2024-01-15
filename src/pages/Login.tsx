import React, { useState } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import Button from "../components/Button";
import InputComponent from "../components/Input";
import Logo from "./../assets/images/logo.png";
import Airplane from "./../assets/images/airplane-and-packages-1.png";
import { Icon } from "@iconify/react/dist/iconify.js";
import { LoginRequestBody, LoginResponseBody, loginGoogleUser, loginUser } from "../lib/services/auth";
// import InputComponent from "../components/Input";
const timeOutMessage: number = 2000;
const CLIENT_ID: string = import.meta.env.VITE_CLIENT_ID;

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [failMessage, setFailMessage] = useState<string>("");
  const navigate: NavigateFunction = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);

    console.log(showPassword);
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
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();
    try {
      const payload: LoginRequestBody = {
        email,
        password,
      };
      const response: LoginResponseBody = await loginUser(payload);
      if (
        response.data.email?.includes("email") ||
        response.data.password?.includes("size") ||
        response.data.authentication?.includes("Wrong")
      ) {
        throw new Error(
          response.data.email ||
            response.data.password ||
            response.data.authentication
        );
      }
      setSuccessMessage("Login berhasil");
      localStorage.setItem("user_access_token", response.data.token);
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/");
      }, timeOutMessage);
    } catch (error) {
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
      const tokenGoogle = credentialResponse.credential as string;
      const response: LoginResponseBody = await loginGoogleUser( {
        token: tokenGoogle
      })
      setSuccessMessage("Login berhasil");
      localStorage.setItem("user_access_token", response.data.token);
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
    console.log("Login gagal!");
  };

  return (
    <div className="flex justify-center items-center lg:h-screen lg:bg-blue-300">
      <div className="flex justify-center items-center bg-white rounded-lg p-10 lg:w-9/12 relative">
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
            <div className="flex flex-col items-center mb-3">
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
                <h1 className="font-bold text-xl">Log In into your account</h1>
              </div>
            </div>
            <form
              onSubmit={handleSubmit}
              className="mt-10 md:pt-0 md:px-0 lg:px-12"
            >
              <>
                <div className="flex flex-col mb-7">
                  <InputComponent
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    placeholder="Email Address"
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
                        ? "mingcute:eye-line"
                        : "mingcute:eye-close-line"
                    }
                    onIconClick={togglePasswordVisibility}
                    iconPosition="right"
                  />
                </div>
                <p>
                  <span></span>
                  <span className="text-right" style={{ display: "flex" }}>
                    <a
                      className="pl-0 text-red-400 hover:underline hover:text-red-900"
                      style={{ marginLeft: "auto" }}
                      href="/forget-password"
                    >
                      Forgot Password?
                    </a>
                  </span>
                </p>

                <Button
                  type="primary-dark"
                  width="full"
                  color="primary-dark"
                  className={`mt-5`}
                  disabled={!email || !password || isLoading}
                >
                  {isLoading ? "Loading ..." : "Log in"}
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

            <p className="mt-5 text-center">
              Need an account?{" "}
              <Link
                to={"/register"}
                className="text-indigo-600 hover:text-indigo-500"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
