import React, { useState, useEffect } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import InputComponent from "../components/Input";
import Logo from "./../assets/images/logo.png";
import Airplane from "./../assets/images/airplane-and-packages-1.png";
import { Icon } from "@iconify/react/dist/iconify.js";
import Alert from "../components/Alert";
import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import {
  LoginRequestBody,
  loginGoogleUser,
  loginUser,
  IAlert,
  LoginResponseBody,
} from "../lib/services/auth";

const CLIENT_ID: string = import.meta.env.VITE_CLIENT_ID;

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate();
  const [alert, setAlert] = useState<IAlert | null>(null);

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

      const fetchResult = await loginUser(payload);

      // const response = await fetch(`${API_URL}/api/login`, {
      //     method: "POST",
      //     headers: {
      //         "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({ email, password }),
      // });
      // const result = await response.json();

      if (fetchResult.status === "fail" || fetchResult.status === "error") {
        const errorMessages = Object.values(fetchResult.data).map((value) => value);
        throw new Error(errorMessages.join("\n"));
      }

      localStorage.setItem("user_access_token", fetchResult.data.token);

      setAlert({
        type: "success",
        data: {},
        message: "Login berhasil!",
      });
    } catch (error) {
      if (error instanceof Error) {
        // console.log(error.message);
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
      const token = credentialResponse.credential as string;
      const response: LoginResponseBody = await loginGoogleUser({
        googleToken: token,
      });

      localStorage.setItem("user_access_token", response.data.token);

      setAlert({
        type: "success",
        data: {},
        message: "Login berhasil!",
      });
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
                &nbsp;&nbsp; <h1 className="text-xl font-bold">Log In into your account</h1>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="mt-10 md:pt-0 md:px-0 lg:px-12">
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
                    icon={showPassword ? "mingcute:eye-line" : "mingcute:eye-close-line"}
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

            <p className="mt-5 text-center">
              Need an account?{" "}
              <Link to={"/register"} className="text-indigo-600 hover:text-indigo-500">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
